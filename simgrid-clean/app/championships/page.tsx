-- ORGANIZERS (perfil organizador)
create table if not exists organizers (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);
alter table organizers enable row level security;

create policy "Organizers manage own profile"
on organizers for all
using (id = auth.uid())
with check (id = auth.uid());

-- CHAMPIONSHIPS
create table if not exists championships (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid references organizers(id) on delete cascade,
  title text not null,
  description text,
  game text not null, -- Forza Motorsport, Gran Turismo, etc.
  format text not null, -- monomarca | multimarca
  is_public boolean default true,
  start_date date,
  created_at timestamptz default now()
);
alter table championships enable row level security;

-- Lectura pública
create policy "Public can read championships"
on championships for select
using (is_public = true);

-- Escritura organizador
create policy "Organizer manages own championships"
on championships for all
using (organizer_id = auth.uid())
with check (organizer_id = auth.uid());

-- AUTOS DEL CAMPEONATO
create table if not exists championship_cars (
  id uuid primary key default gen_random_uuid(),
  championship_id uuid references championships(id) on delete cascade,
  car_name text not null,
  restrictions text, -- ej: PI cap, fixed tune, stock engine
  created_at timestamptz default now()
);
alter table championship_cars enable row level security;

create policy "Public can read championship cars"
on championship_cars for select
using (true);

create policy "Organizer manages championship cars"
on championship_cars for all
using (
  exists (
    select 1 from championships c
    where c.id = championship_cars.championship_id
      and c.organizer_id = auth.uid()
  )
)
with check (true);
