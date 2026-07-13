-- Habilitar RLS en la tabla actas
alter table actas enable row level security;

-- Eliminar las policies viejas y demasiado permisivas, si existen
-- (idempotente: hace que este script se pueda re-correr sin error)
drop policy if exists "anon puede insertar" on actas;
drop policy if exists "anon puede actualizar" on actas;

-- Permitir INSERT anónimo, pero solo de filas "vírgenes":
-- nadie puede insertar ya marcado como pagado, con order id, o con contenido
-- pre-generado (eso anularía el futuro cobro con LemonSqueezy).
create policy "anon puede insertar acta nueva" on actas
  for insert with check (
    pagado = false
    and lemonsqueezy_order_id is null
    and contenido_generado is null
  );

-- Sin política de UPDATE para anon: la API usa la service role key
-- (server-only) para setear contenido_generado. Esto evita que cualquiera,
-- con la anon key pública del bundle, pueda hacer UPDATE directo contra la
-- API REST de Supabase y sobrescribir contenido_generado o marcar pagado=true
-- de cualquier fila cuyo UUID conozca.

-- Bloquear SELECT y DELETE para anon (nadie puede leer ni borrar actas ajenas)
-- Sin política de SELECT/DELETE = denegado por defecto con RLS activo

-- Rate limiting persistente para /api/generate (reemplaza el Map en memoria,
-- que no sirve como límite real en serverless con múltiples instancias).
-- Solo la API (con la service role key) lee/escribe esta tabla; RLS activo
-- y sin policies = anon no puede leer ni falsificar su propio conteo.
create table if not exists rate_limit_log (
  id bigserial primary key,
  ip text not null,
  created_at timestamptz default now()
);

create index if not exists rate_limit_log_ip_created_at_idx
  on rate_limit_log (ip, created_at);

alter table rate_limit_log enable row level security;
-- Sin policies = denegado para anon por defecto; la API usa service role.
