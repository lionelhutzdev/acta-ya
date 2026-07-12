-- Habilitar RLS en la tabla actas
alter table actas enable row level security;

-- Permitir INSERT anónimo (el formulario guarda el acta)
create policy "anon puede insertar" on actas
  for insert with check (true);

-- Permitir UPDATE anónimo (la API actualiza contenido_generado)
create policy "anon puede actualizar" on actas
  for update using (true);

-- Bloquear SELECT y DELETE para anon (nadie puede leer ni borrar actas ajenas)
-- Sin política de SELECT/DELETE = denegado por defecto con RLS activo
