'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type FormData = {
  condominio_nombre: string
  tipo_asamblea: 'ordinaria' | 'extraordinaria'
  fecha: string
  hora_inicio: string
  hora_fin: string
  lugar: string
  quorum_info: string
  agenda: string
  notas: string
}

const EMPTY: FormData = {
  condominio_nombre: '',
  tipo_asamblea: 'ordinaria',
  fecha: '',
  hora_inicio: '',
  hora_fin: '',
  lugar: '',
  quorum_info: '',
  agenda: '',
  notas: '',
}

export default function ActaForm() {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [actaId, setActaId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const { data, error } = await supabase
      .from('actas')
      .insert({
        condominio_nombre: form.condominio_nombre,
        tipo_asamblea: form.tipo_asamblea,
        fecha: form.fecha,
        hora_inicio: form.hora_inicio,
        hora_fin: form.hora_fin || null,
        lugar: form.lugar,
        quorum_info: form.quorum_info || null,
        agenda: form.agenda,
        notas: form.notas,
      })
      .select('id')
      .single()

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
      return
    }

    setActaId(data.id)
    setStatus('success')
    setForm(EMPTY)
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Acta guardada</h2>
          <p className="text-gray-500 text-sm mb-1">ID: <span className="font-mono text-xs">{actaId}</span></p>
          <p className="text-gray-400 text-sm mb-8">El acta fue registrada. Pronto podrás generarla con IA.</p>
          <button
            onClick={() => setStatus('idle')}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Crear otra acta
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-900">Acta Ya</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Nueva acta de asamblea</h1>
          <p className="text-gray-500 text-sm mt-1">Completá los datos y generá el acta con IA en segundos.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos del condominio */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Datos generales</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nombre del condominio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.condominio_nombre}
                onChange={e => set('condominio_nombre', e.target.value)}
                placeholder="Ej: Residencial Los Pinos"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Tipo de asamblea <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                {(['ordinaria', 'extraordinaria'] as const).map(tipo => (
                  <label key={tipo} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="tipo_asamblea"
                      value={tipo}
                      checked={form.tipo_asamblea === tipo}
                      onChange={() => set('tipo_asamblea', tipo)}
                      className="sr-only"
                    />
                    <div className={`border rounded-lg px-4 py-2.5 text-sm text-center capitalize transition-colors ${
                      form.tipo_asamblea === tipo
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}>
                      {tipo}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Lugar <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.lugar}
                onChange={e => set('lugar', e.target.value)}
                placeholder="Ej: Salón de usos múltiples"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </section>

          {/* Fecha y hora */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Fecha y hora</h2>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Fecha <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={form.fecha}
                  onChange={e => set('fecha', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Hora inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={form.hora_inicio}
                  onChange={e => set('hora_inicio', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Hora fin
                </label>
                <input
                  type="time"
                  value={form.hora_fin}
                  onChange={e => set('hora_fin', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Quórum
              </label>
              <input
                type="text"
                value={form.quorum_info}
                onChange={e => set('quorum_info', e.target.value)}
                placeholder="Ej: 12 de 20 propietarios presentes"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </section>

          {/* Contenido */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Contenido</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Orden del día <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={form.agenda}
                onChange={e => set('agenda', e.target.value)}
                placeholder={"1. Lectura del acta anterior\n2. Aprobación del presupuesto\n3. Varios"}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Notas de la reunión <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-2">Escribí lo que se discutió, acordó o votó. La IA lo convertirá en un acta formal.</p>
              <textarea
                required
                rows={6}
                value={form.notas}
                onChange={e => set('notas', e.target.value)}
                placeholder="Se aprobó el presupuesto anual por unanimidad. Se acordó pintar la fachada en marzo. El propietario del depto 4B solicitó..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
          </section>

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              {errorMsg || 'Ocurrió un error. Intentá de nuevo.'}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Guardando...
              </>
            ) : (
              'Generar acta con IA →'
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
