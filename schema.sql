create table actas (
  id uuid primary key default gen_random_uuid(),
  condominio_nombre text not null,
  tipo_asamblea text not null, -- 'ordinaria' | 'extraordinaria'
  fecha date not null,
  hora_inicio time not null,
  hora_fin time,
  lugar text not null,
  quorum_info text,
  agenda text not null,        -- puntos del orden del día
  notas text not null,          -- lo que pasó/discutieron/acordaron, texto libre
  contenido_generado text,      -- output generado por IA
  pagado boolean default false,
  lemonsqueezy_order_id text,
  created_at timestamptz default now()
);

-- Ver supabase-rls.sql para la tabla rate_limit_log (rate limiting de /api/generate)
