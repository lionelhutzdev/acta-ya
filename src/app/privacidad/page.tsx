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
            <p>El responsable del tratamiento de los datos es el titular del servicio Acta Ya. Contacto: <a href="mailto:leolink17@gmail.com" className="text-indigo-600 hover:underline">leolink17@gmail.com</a>. El servicio está registrado ante la Dirección Nacional de Protección de Datos Personales conforme a la Ley 25.326 (pendiente de inscripción — ver sección 9).</p>
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
            <p className="mt-2">No recolectamos datos de pago, documentos de identidad ni datos sensibles en los términos del art. 2 de la Ley 25.326.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">3. Para qué usamos los datos</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>Generar el borrador de acta solicitado.</li>
              <li>Almacenar el historial de actas generadas.</li>
              <li>Mejorar el servicio (análisis agregado y anónimo).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">4. Transferencia a terceros — Groq (EE.UU.)</h2>
            <p>Para generar el texto del acta, los datos ingresados en el formulario son enviados a <strong>Groq, Inc.</strong> (empresa con sede en Estados Unidos), que procesa el texto mediante su API de inteligencia artificial. Esta transferencia internacional de datos se realiza de conformidad con las políticas de privacidad de Groq (<a href="https://groq.com/privacy-policy" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">groq.com/privacy-policy</a>). Al usar el servicio, el usuario acepta esta transferencia.</p>
            <p className="mt-2">Los datos también se almacenan en <strong>Supabase</strong> (infraestructura en la nube). Los datos pueden residir en servidores ubicados fuera de Argentina.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">5. Retención de datos</h2>
            <p>Los datos se conservan mientras el servicio esté activo. No tenemos un plazo automático de eliminación. El usuario puede solicitar la eliminación de sus datos en cualquier momento (ver sección 7).</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">6. Datos de terceros ingresados por el usuario</h2>
            <p>Si el usuario ingresa datos de terceros (nombres de propietarios, decisiones personales, etc.), el usuario declara tener autorización o justificación legítima para hacerlo. Acta Ya no asume responsabilidad por el tratamiento de datos de terceros ingresados por el usuario.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">7. Derechos del titular — Ley 25.326</h2>
            <p>De acuerdo con la Ley Nacional de Protección de Datos Personales N° 25.326, el titular de los datos tiene derecho a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li><strong>Acceso:</strong> conocer qué datos tenemos sobre vos.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
              <li><strong>Supresión:</strong> solicitar el borrado de tus datos.</li>
              <li><strong>Confidencialidad:</strong> solicitar que tus datos no sean cedidos a terceros.</li>
            </ul>
            <p className="mt-2">Para ejercer cualquiera de estos derechos, escribí a <a href="mailto:leolink17@gmail.com" className="text-indigo-600 hover:underline">leolink17@gmail.com</a>. Respondemos dentro de los 5 días hábiles. La DNPDP (Dirección Nacional de Protección de Datos Personales) es el organismo de control: <a href="https://www.argentina.gob.ar/aaip/datospersonales" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">argentina.gob.ar/aaip/datospersonales</a>.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">8. Seguridad</h2>
            <p>Implementamos medidas técnicas para proteger los datos almacenados, incluyendo control de acceso a la base de datos. Sin embargo, ningún sistema es 100% seguro y no podemos garantizar la seguridad absoluta de la información.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">9. Registro ante la DNPDP</h2>
            <p className="text-amber-700 bg-amber-50 rounded-lg px-3 py-2">La inscripción de la base de datos ante la Dirección Nacional de Protección de Datos Personales (Ley 25.326, art. 21) está en trámite. El servicio opera en cumplimiento de las obligaciones sustanciales de la ley durante este proceso.</p>
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
