import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// In-memory rate limiter: 5 requests per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) return false

  entry.count++
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

  if (!checkRateLimit(ip)) {
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
    })

    const contenido = completion.choices[0].message.content ?? ''

    await supabase
      .from('actas')
      .update({ contenido_generado: contenido })
      .eq('id', actaId)

    return NextResponse.json({ contenido })
  } catch {
    return NextResponse.json({ error: 'Error generando el acta. Intentá de nuevo.' }, { status: 500 })
  }
}
