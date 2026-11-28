-- MiTudi – online párbajszobák, 2. rész: kétlépcsős válasz, „ha az ellenfél már válaszolt” időzítés.
-- A szobak.sql UTÁN kell futtatni (KÖTELEZŐ a js/szobak.js jelenlegi változatához). Többször is futtatható.
-- Futtatás: Supabase → SQL Editor → New query → ezt a teljes fájlt bemásolni → Run.

-- 1) Szobabeállítás: „ha valaki már válaszolt, a többieknek legfeljebb ennyi másodperc marad” (0 = ki).
--    (A meglévő rooms.seconds a gondolkodási idő kérdésenként.)
alter table public.rooms add column if not exists after_first int not null default 20 check (after_first between 0 and 120);

-- 2) Visszavágó-mutató: a gazda a lezárt szobában beállítja az új szoba kódját, a többiek „Belépés →” gombot látnak.
alter table public.rooms add column if not exists next_code text check (next_code is null or next_code ~ '^[A-Z0-9]{4,8}$');

-- 3) Kérdésenkénti beküldések a játékos sorában: [{ "q": kérdés sorszáma, "k": választott opció, "t": szerveridő ms-ban }]
--    Ebből minden kliens ugyanúgy (determinisztikusan) számolja a kérdések kezdetét, határidejét és a pontokat.
alter table public.players add column if not exists answers jsonb not null default '[]'::jsonb;
do $$ begin
  alter table public.players add constraint players_answers_chk check (jsonb_typeof(answers) = 'array' and jsonb_array_length(answers) <= 60);
exception when duplicate_object then null; end $$;

-- 4) Őr-trigger: a korábbi beküldések nem írhatók át / nem törölhetők, az újak „t” mezőjét a SZERVER órája adja
--    (így a kliensek órájának eltérése nem számít, és visszadátumozni sem lehet), updated_at frissül.
create or replace function public.mitudi_players_guard() returns trigger
  language plpgsql set search_path = '' as $$
declare
  n_old int; n_new int; arr jsonb; el jsonb; i int;
begin
  if tg_op = 'INSERT' then
    new.answers := '[]'::jsonb;
    return new;
  end if;
  new.updated_at := now();
  n_old := jsonb_array_length(old.answers);
  n_new := jsonb_array_length(new.answers);
  arr := old.answers;
  if n_new > n_old then
    for i in n_old .. n_new - 1 loop
      el := new.answers -> i;
      if jsonb_typeof(el) = 'object' then
        arr := arr || jsonb_build_array(jsonb_build_object(
          'q', (el ->> 'q')::int,
          'k', (el ->> 'k')::int,
          't', floor(extract(epoch from clock_timestamp()) * 1000)::bigint));
      end if;
    end loop;
  end if;
  new.answers := arr;
  return new;
end $$;
drop trigger if exists players_guard on public.players;
create trigger players_guard before insert or update on public.players for each row execute function public.mitudi_players_guard();

-- 5) A szerver pontos ideje (a kliensek a visszaszámláláshoz ehhez igazítják az órájukat).
create or replace function public.mitudi_now() returns timestamptz
  language sql stable set search_path = '' as $$ select now() $$;
grant execute on function public.mitudi_now() to anon, authenticated;

-- 6) Oszlopszintű írásjog: a játékos ne tudja más szobába áttenni a sorát, a gazda ne cserélhesse le a szoba gazdáját / kódját.
--    (Az RLS továbbra is csak a saját sort engedi.)
revoke update on public.players from authenticated;
grant update (nick, score, answered, correct, finished, answers) on public.players to authenticated;
revoke update on public.rooms from authenticated;
grant update (title, status, started_at, next_code) on public.rooms to authenticated;

-- 7) A PostgREST sémagyorsítótár frissítése, hogy az új oszlopokat azonnal lássa az API.
notify pgrst, 'reload schema';
