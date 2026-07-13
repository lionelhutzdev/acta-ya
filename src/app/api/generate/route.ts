import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'

const REQUIRED_ENV = ['GROQ_API_KEY', 'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'] as const
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`)
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Service role key (server-only, never exposed to the client) bypasses RLS,
// which is required now that anon has no UPDATE policy on `actas`.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Rate limit backed by Supabase (table `rate_limit_log`) instead of an
// in-memory Map: serverless deployments run multiple instances that don't
// share process memory, so an in-memory counter doesn't actually cap
// anything across concurrent/cold-started invocations. This costs one
// extra DB round-trip per request but is the only way the limit holds in
// production.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

async function checkAndLogRateLimit(ip: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_WINDOW_MS).toISOString()

  const { count, error } = await supabase
    .from('rate_limit_log')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('created_at', windowStart)

  if (error) {
    console.error('[rate-limit] Error checking limit:', error.message)
    return false // fail closed: a DB error should not turn into free unlimited generations
  }

  if ((count ?? 0) >= RATE_LIMIT) return false

  // Log the attempt before calling Groq so a failed generation still counts
  // against the limit (otherwise retries on failure would be free to repeat).
  await supabase.from('rate_limit_log').insert({ ip })
  // Best-effort cleanup so the table doesn't grow unbounded.
  await supabase.from('rate_limit_log').delete().lt('created_at', windowStart)
  return true
}

const MAX_LENGTHS = {
  condominio_nombre: 200,
  tipo_asamblea: 20,
  fecha: 10,
  hora_inicio: 5,
  hora_fin: 5,
  lugar: 300,
  quorum_info: 300,
  agenda: 3000,
  notas: 5000,
}

function sanitize(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLen)
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  if (!(await checkAndLogRateLimit(ip))) {
    return NextResponse.json(
      { error: 'Límite alcanzado. Podés generar hasta 5 actas por hora.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const { actaId, form: rawForm } = body
  if (!actaId || typeof rawForm !== 'object' || rawForm === null) {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const form = rawForm as Record<string, unknown>
  const clean = {
    condominio_nombre: sanitize(form.condominio_nombre, MAX_LENGTHS.condominio_nombre),
    tipo_asamblea: sanitize(form.tipo_asamblea, MAX_LENGTHS.tipo_asamblea),
    fecha: sanitize(form.fecha, MAX_LENGTHS.fecha),
    hora_inicio: sanitize(form.hora_inicio, MAX_LENGTHS.hora_inicio),
    hora_fin: sanitize(form.hora_fin, MAX_LENGTHS.hora_fin),
    lugar: sanitize(form.lugar, MAX_LENGTHS.lugar),
    quorum_info: sanitize(form.quorum_info, MAX_LENGTHS.quorum_info),
    agenda: sanitize(form.agenda, MAX_LENGTHS.agenda),
    notas: sanitize(form.notas, MAX_LENGTHS.notas),
  }

  if (!clean.condominio_nombre || !clean.fecha || !clean.hora_inicio || !clean.lugar || !clean.agenda || !clean.notas) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }

  try {
    const fechaFormateada = new Date(clean.fecha + 'T12:00:00').toLocaleDateString('es-AR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    const prompt = `Sos un escribano público argentino especializado en actas de asambleas de consorcios. Redactá un acta formal y completa con los siguientes datos:

**Datos de la asamblea:**
- Condominio: ${clean.condominio_nombre}
- Tipo de asamblea: ${clean.tipo_asamblea}
- Fecha: ${fechaFormateada}
- Hora de inicio: ${clean.hora_inicio}hs${clean.hora_fin ? `\n- Hora de cierre: ${clean.hora_fin}hs` : ''}
- Lugar: ${clean.lugar}${clean.quorum_info ? `\n- Quórum: ${clean.quorum_info}` : ''}

**Orden del día:**
${clean.agenda}

**Notas de la reunión:**
${clean.notas}

Redactá el acta completa en castellano rioplatense con formato legal: encabezado formal, desarrollo de cada punto del orden del día incorporando las notas provistas, resoluciones adoptadas con indicación de votación cuando corresponda, y cierre con firma. Usá párrafos formales, numeración de artículos y lenguaje técnico jurídico apropiado para un consorcio de propietarios.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2048,
    }, { timeout: 30000 })

    const contenido = completion.choices[0].message.content ?? ''

    // Only fill in a still-empty row: this is the one gate (since the
    // endpoint is anonymous and runs with the service role key, bypassing
    // RLS) preventing an arbitrary actaId from overwriting content that
    // was already generated for a different acta.
    const { data: updated, error: updateError } = await supabase
      .from('actas')
      .update({ contenido_generado: contenido })
      .eq('id', actaId)
      .is('contenido_generado', null)
      .select('id')

    if (updateError || !updated || updated.length === 0) {
      console.error('[generate] Failed to persist content:', updateError?.message ?? 'no matching empty row for actaId')
      return NextResponse.json({ error: 'Error generando el acta. Intentá de nuevo.' }, { status: 500 })
    }

    return NextResponse.json({ contenido })
  } catch (err) {
    console.error('[generate] Error:', err instanceof Error ? err.message : err)
    // Clean up orphaned row if generation failed
    if (actaId) {
      await supabase.from('actas').delete().eq('id', actaId).is('contenido_generado', null)
    }
    return NextResponse.json({ error: 'Error generando el acta. Intentá de nuevo.' }, { status: 500 })
  }
}
