-- MiTudi – online párbajszobák (Supabase)
-- Futtatás: Supabase → SQL Editor → New query → ezt a teljes fájlt bemásolni → Run.
-- Előfeltétel: Authentication → Sign In / Providers → „Allow anonymous sign-ins” BEKAPCSOLVA
-- (a játékosok fiók nélkül, névtelen munkamenettel lépnek be; így tudja az adatbázis, kié melyik sor).

create table if not exists public.rooms (
  code        text primary key check (code ~ '^[A-Z0-9]{4,8}$'),
  host_id     uuid not null default auth.uid(),
  title       text not null default 'Párbaj' check (char_length(title) <= 80),
  topic       text check (char_length(topic) <= 200),
  questions   jsonb not null default '[]'::jsonb,           -- a kérdések sorrendje (azonosítók), mindenkinek ugyanaz
  seconds     int  not null default 20 check (seconds between 5 and 120),
  status      text not null default 'lobby' check (status in ('lobby', 'running', 'finished')),
  started_at  timestamptz,
  created_at  timestamptz not null default now()
);

create table if not exists public.players (
  id          uuid primary key default gen_random_uuid(),
  room_code   text not null references public.rooms(code) on delete cascade,
  user_id     uuid not null default auth.uid(),
  nick        text not null check (char_length(nick) between 1 and 24),
  score       int  not null default 0 check (score >= 0),
  answered    int  not null default 0 check (answered >= 0),
  correct     int  not null default 0 check (correct >= 0),
  finished    boolean not null default false,
  joined_at   timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (room_code, user_id)
);
create index if not exists players_room_idx on public.players(room_code);

alter table public.rooms   enable row level security;
alter table public.players enable row level security;

-- Olvasás: aki ismeri a szobakódot, láthatja a szobát és a ranglistát.
drop policy if exists rooms_read on public.rooms;
create policy rooms_read on public.rooms for select to anon, authenticated using (true);
drop policy if exists players_read on public.players;
create policy players_read on public.players for select to anon, authenticated using (true);

-- Szoba létrehozása és vezérlése: csak a saját (névtelenül belépett) munkamenet nevében.
drop policy if exists rooms_insert on public.rooms;
create policy rooms_insert on public.rooms for insert to authenticated with check (host_id = auth.uid());
drop policy if exists rooms_update on public.rooms;
create policy rooms_update on public.rooms for update to authenticated using (host_id = auth.uid()) with check (host_id = auth.uid());

-- Játékos: csak saját magát veheti fel és frissítheti.
drop policy if exists players_insert on public.players;
create policy players_insert on public.players for insert to authenticated with check (user_id = auth.uid());
drop policy if exists players_update on public.players;
create policy players_update on public.players for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select on public.rooms, public.players to anon, authenticated;
grant insert, update on public.rooms, public.players to authenticated;

-- Élő frissítés (ki hol tart) a Realtime-on keresztül.
do $$ begin
  begin alter publication supabase_realtime add table public.rooms;   exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.players; exception when duplicate_object then null; end;
end $$;
