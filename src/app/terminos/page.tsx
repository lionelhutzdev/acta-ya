export const metadata = {
  title: 'Términos de Uso — Acta Ya',
}

export default function Terminos() {
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
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Términos de Uso</h1>
        <p className="text-sm text-gray-400 mb-8">Última actualización: julio de 2026</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">1. Descripción del servicio</h2>
            <p>Acta Ya es una herramienta de asistencia que genera <strong>borradores</strong> de actas de asambleas de consorcios de propietarios a partir de la información provista por el usuario. El texto generado es producido mediante inteligencia artificial y tiene como único propósito servir de punto de partida para la redacción del documento final.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">2. Naturaleza del output — no es asesoría jurídica</h2>
            <p>Los borradores generados por Acta Ya <strong>no constituyen asesoría legal, ni documentos con validez jurídica per se</strong>. El servicio no reemplaza la intervención de un escribano, administrador matriculado o asesor legal. Para que un acta de asamblea tenga validez conforme a la Ley 13.512 y el Código Civil y Comercial de la Nación, debe ser revisada, completada y firmada por los participantes correspondientes según la normativa aplicable.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">3. Responsabilidad del usuario</h2>
            <p>El usuario es el único responsable de:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>Revisar y verificar la exactitud del borrador generado.</li>
              <li>Completar, corregir o adaptar el texto según las particularidades de su consorcio y la normativa vigente.</li>
              <li>Obtener las firmas y aprobaciones requeridas para dar validez al acta.</li>
              <li>Asegurarse de contar con autorización para ingresar datos de terceros (propietarios, inquilinos, administradores).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">4. Limitación de responsabilidad</h2>
            <p>Acta Ya no garantiza que los borradores generados sean jurídicamente válidos, completos o adecuados para ningún propósito legal específico. En ningún caso Acta Ya será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso del servicio, incluyendo —sin limitarse a— decisiones tomadas en base al contenido generado o rechazo de documentación por organismos o terceros.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">5. Disponibilidad del servicio</h2>
            <p>El servicio se presta "tal como está" y "según disponibilidad". No garantizamos disponibilidad ininterrumpida. Nos reservamos el derecho de modificar, suspender o discontinuar el servicio en cualquier momento sin previo aviso.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">6. Uso aceptable</h2>
            <p>El usuario se compromete a no usar el servicio para generar documentos fraudulentos, falsificar actas, ni para ningún fin ilícito. El uso indebido puede resultar en la suspensión del acceso.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">7. Ley aplicable y jurisdicción</h2>
            <p>Estos términos se rigen por las leyes de la República de Costa Rica. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales costarricenses. El contenido generado por el servicio hace referencia a la normativa argentina (Ley 13.512 derogada, Código Civil y Comercial) únicamente como referencia para la redacción de los borradores; Acta Ya no ejerce ni representa la aplicación oficial de dicha normativa.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">8. Modificaciones</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del servicio implica la aceptación de los términos vigentes.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">9. Contacto</h2>
            <p>Para consultas sobre estos términos escribí a <a href="mailto:leolink17@gmail.com" className="text-indigo-600 hover:underline">leolink17@gmail.com</a>.</p>
          </section>

        </div>
      </main>
    </div>
  )
}
