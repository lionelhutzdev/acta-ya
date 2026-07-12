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

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Límite alcanzado. Podés generar hasta 5 actas por hora.' },
      { status: 429 }
    )
  }

  const { actaId, form } = await request.json()
  try {
    const fechaFormateada = new Date(form.fecha + 'T12:00:00').toLocaleDateString('es-AR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    const prompt = `Sos un escribano público argentino especializado en actas de asambleas de consorcios. Redactá un acta formal y completa con los siguientes datos:

**Datos de la asamblea:**
- Condominio: ${form.condominio_nombre}
- Tipo de asamblea: ${form.tipo_asamblea}
- Fecha: ${fechaFormateada}
- Hora de inicio: ${form.hora_inicio}hs${form.hora_fin ? `\n- Hora de cierre: ${form.hora_fin}hs` : ''}
- Lugar: ${form.lugar}${form.quorum_info ? `\n- Quórum: ${form.quorum_info}` : ''}

**Orden del día:**
${form.agenda}

**Notas de la reunión:**
${form.notas}

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
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error generando el acta'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
