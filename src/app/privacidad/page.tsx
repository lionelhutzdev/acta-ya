export const metadata = {
  title: 'Política de Privacidad — Acta Ya',
}

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">Acta Ya</span>
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Política de Privacidad</h1>
        <p className="text-sm text-gray-400 mb-8">Última actualización: julio de 2026</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">1. Responsable del tratamiento</h2>
            <p>El responsable del tratamiento de los datos es el titular del servicio Acta Ya, con domicilio en Costa Rica. Contacto: <a href="mailto:leolink17@gmail.com" className="text-indigo-600 hover:underline">leolink17@gmail.com</a>. El tratamiento de datos personales se rige por la <strong>Ley N° 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales</strong> de Costa Rica y su reglamento.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">2. Datos que recolectamos</h2>
            <p>Al usar el servicio, el usuario ingresa y nosotros almacenamos:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>Nombre del consorcio o edificio.</li>
              <li>Tipo, fecha, hora y lugar de la asamblea.</li>
              <li>Información de quórum (puede incluir cantidad de propietarios presentes).</li>
              <li>Orden del día y notas de la reunión (pueden incluir nombres de propietarios, decisiones tomadas, montos acordados).</li>
              <li>Texto del acta generado por inteligencia artificial.</li>
            </ul>
            <p className="mt-2">No recolectamos contraseñas, documentos de identidad, datos financieros ni categorías especiales de datos en los términos del art. 9 de la Ley 8968.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">3. Para qué usamos los datos</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>Generar el borrador de acta solicitado.</li>
              <li>Almacenar el historial de actas generadas.</li>
              <li>Mejorar el servicio mediante análisis agregado y anónimo.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">4. Transferencia internacional de datos — Groq (EE.UU.)</h2>
            <p>Para generar el texto del acta, los datos del formulario se envían a <strong>Groq, Inc.</strong>, empresa con sede en Estados Unidos, que los procesa mediante su API de inteligencia artificial. Esta transferencia se realiza conforme al art. 21 de la Ley 8968 de Costa Rica, que permite transferencias internacionales cuando el país destinatario ofrece un nivel adecuado de protección o el titular ha consentido. Al usar el servicio, el usuario acepta expresamente esta transferencia.</p>
            <p className="mt-2">Podés consultar la política de privacidad de Groq en <a href="https://groq.com/privacy-policy" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">groq.com/privacy-policy</a>.</p>
            <p className="mt-2">Los datos también se almacenan en <strong>Supabase</strong> (infraestructura en la nube), cuyos servidores pueden estar ubicados fuera de Costa Rica.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">5. Retención de datos</h2>
            <p>Los datos se conservan mientras el servicio esté activo o hasta que el usuario solicite su eliminación. No aplicamos eliminación automática por vencimiento de plazo.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">6. Datos de terceros ingresados por el usuario</h2>
            <p>Si el usuario ingresa datos de terceros (nombres de propietarios, decisiones personales, etc.), declara tener autorización o justificación legítima para ello. Acta Ya no asume responsabilidad por el tratamiento de datos de terceros ingresados por el usuario.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">7. Derechos del titular — Ley 8968 de Costa Rica</h2>
            <p>Conforme a la Ley N° 8968, el titular de los datos tiene derecho a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li><strong>Acceso:</strong> conocer qué datos tenemos sobre vos.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o desactualizados.</li>
              <li><strong>Supresión:</strong> solicitar el borrado de tus datos cuando ya no sean necesarios.</li>
              <li><strong>Oposición:</strong> oponerte a determinados tratamientos.</li>
            </ul>
            <p className="mt-2">Para ejercer estos derechos, escribí a <a href="mailto:leolink17@gmail.com" className="text-indigo-600 hover:underline">leolink17@gmail.com</a>. Respondemos en un plazo máximo de 5 días hábiles. El organismo de control en Costa Rica es la <strong>Agencia de Protección de Datos de los Habitantes (PRODHAB)</strong>: <a href="https://www.prodhab.go.cr" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">prodhab.go.cr</a>.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">8. Seguridad</h2>
            <p>Aplicamos medidas técnicas de seguridad que incluyen control de acceso a la base de datos y restricción de permisos. Ningún sistema es infalible y no podemos garantizar seguridad absoluta.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">9. Ley aplicable y jurisdicción</h2>
            <p>Esta política se rige por las leyes de la República de Costa Rica. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales costarricenses.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">10. Modificaciones</h2>
            <p>Podemos actualizar esta política en cualquier momento. Los cambios se publican en esta página con la fecha de actualización.</p>
          </section>

        </div>
      </main>
    </div>
  )
}
