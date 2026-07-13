import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Acta Ya — Borradores de actas de asamblea con IA",
  description: "Completá los datos de tu asamblea y obtené un borrador de acta generado con inteligencia artificial para revisar y firmar.",
  openGraph: {
    title: "Acta Ya — Borradores de actas de asamblea con IA",
    description: "Completá los datos de tu asamblea y obtené un borrador de acta generado con inteligencia artificial para revisar y firmar.",
    siteName: "Acta Ya",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary",
    title: "Acta Ya — Borradores de actas de asamblea con IA",
    description: "Completá los datos de tu asamblea y obtené un borrador de acta generado con inteligencia artificial para revisar y firmar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="border-t border-gray-100 bg-white mt-8">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-gray-400">
            <span>© {new Date().getFullYear()} Acta Ya</span>
            <div className="flex gap-4">
              <a href="/terminos" className="hover:text-gray-600">Términos de uso</a>
              <a href="/privacidad" className="hover:text-gray-600">Privacidad</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
