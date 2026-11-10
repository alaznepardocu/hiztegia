-- Ejecuta este script en Supabase: SQL Editor -> New query -> Run

-- ¿El usuario del token es admin? (el rol vive en app_metadata, que el usuario NO puede editar)
create or replace function public.es_admin()
returns boolean
language sql stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- Palabras
create table public.palabras (
  id uuid primary key default gen_random_uuid(),
  eu text not null,
  eu_alt text[] not null default '{}',
  es text[] not null check (cardinality(es) >= 1),
  nota text,
  maila text not null check (maila in ('A1','A2','B1','B2','C1','C2')),
  ikasturtea int not null,
  data date not null default current_date,
  unique (eu, maila, ikasturtea)
);
create index palabras_curso_idx on public.palabras (maila, ikasturtea);

-- Verbos (trinkoak + auxiliarrak en una sola tabla)
create table public.aditzak (
  id uuid primary key default gen_random_uuid(),
  mota text not null check (mota in ('nor','nork','nor-nork')),
  aditza text not null,
  denbora text not null,
  nor text,
  nork text,
  objektu text check (objektu in ('singularra','plurala')),
  konjugaioa text not null
);
create index aditzak_idx on public.aditzak (mota, aditza, denbora);

-- Seguridad (RLS): imprescindible
alter table public.palabras enable row level security;
alter table public.aditzak  enable row level security;

create policy "palabras: lectura publica" on public.palabras
  for select using (true);
create policy "palabras: escritura admin" on public.palabras
  for all using (public.es_admin()) with check (public.es_admin());

create policy "aditzak: lectura publica" on public.aditzak
  for select using (true);
create policy "aditzak: escritura admin" on public.aditzak
  for all using (public.es_admin()) with check (public.es_admin());

-- Permisos (por si tu proyecto no los concede por defecto)
grant select on public.palabras, public.aditzak to anon, authenticated;
grant insert, update, delete on public.palabras, public.aditzak to authenticated;
grant all on public.palabras, public.aditzak to service_role;
