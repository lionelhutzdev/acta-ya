# Acta Ya

App Next.js 15 (App Router) que genera borradores de actas de asamblea de consorcio con IA. El usuario completa un formulario, el borrador se genera con Groq (Llama 3.3 70B) y queda persistido en Supabase.

No tiene login: el flujo es anónimo, protegido con rate limiting por IP y RLS estricto en Supabase.

## Stack

- Next.js 15 / React 18 / Tailwind
- Supabase (Postgres + RLS) para persistencia
- Groq SDK para la generación del acta
- Sentry (`@sentry/nextjs`) para reporte de errores — opcional, deshabilitado si no hay DSN configurado
- Playwright para tests E2E de humo

## Getting started

```bash
npm install
cp .env.example .env.local   # completar con tus credenciales
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Ver `.env.example` para la lista completa. Resumen:

| Variable | Requerida | Uso |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Sí | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sí | Key pública, usada por el cliente para el INSERT inicial |
| `SUPABASE_SERVICE_ROLE_KEY` | Sí | Key server-only, usada solo en `/api/generate` para escribir `contenido_generado` sin policy de UPDATE anónimo. **Nunca** exponer con prefijo `NEXT_PUBLIC_` |
| `GROQ_API_KEY` | Sí | Key de [console.groq.com](https://console.groq.com) |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | No | DSN de [sentry.io](https://sentry.io). Sin esto, Sentry queda deshabilitado y no rompe nada |
| `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` | No | Solo para subir source maps durante el build |

## Setup de la base de datos (Supabase)

1. Creá un proyecto en [supabase.com](https://supabase.com).
2. Corré `schema.sql` en el SQL Editor para crear la tabla `actas`.
3. Corré `supabase-rls.sql` para habilitar Row Level Security:
   - `anon` puede hacer INSERT de una acta nueva "virgen" (sin `contenido_generado`, `pagado=false`, sin `lemonsqueezy_order_id`).
   - `anon` **no** tiene policy de SELECT/UPDATE/DELETE — solo la API con la service role key puede leer/escribir después del INSERT inicial. Esto evita que alguien con la anon key pública sobrescriba o lea actas ajenas.
   - Se crea también `rate_limit_log`, usada por `/api/generate` para persistir el rate limiting (5 generaciones por IP por hora) de forma que funcione correctamente en un entorno serverless con múltiples instancias (un contador en memoria no sirve ahí).

## Notas de arquitectura

- **Sin auth**: cada acta se identifica por un UUID generado en el cliente. El cliente hace el INSERT directo a Supabase (con la anon key); el servidor (`/api/generate`) hace el UPDATE con la service role key, y solo si la fila todavía tiene `contenido_generado IS NULL` (evita que un `actaId` conocido sobrescriba contenido ya generado).
- **Pagos**: el schema ya tiene columnas `pagado` y `lemonsqueezy_order_id` reservadas para una futura integración de cobro con Lemon Squeezy, pero **todavía no está implementada** — la generación es gratuita, limitada solo por el rate limit.
- **Legal**: `/terminos` y `/privacidad` cubren jurisdicción Costa Rica (Ley 8968, PRODHAB). El formulario requiere aceptar ambos antes de generar.

## Scripts

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción
npm run start     # levantar el build
npm run lint      # eslint
npm run test:e2e  # Playwright (tests/smoke.spec.ts)
```

## Deploy

Pensado para Vercel. Configurá las variables de entorno de la tabla de arriba en el proyecto de Vercel antes de deployar.
