-- Phase A: profiles + addresses only.
-- Later phases add restaurants, menu_*, orders, order_items, order_status_history,
-- courier_locations, promotions, reviews, favorites.

create extension if not exists postgis;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null default 'Home',
  line1 text not null,
  line2 text,
  city text,
  postal_code text,
  country text,
  lat double precision not null,
  lng double precision not null,
  geog geography(point, 4326) generated always as (
    st_setsrid(st_makepoint(lng, lat), 4326)::geography
  ) stored,
  delivery_instructions text,
  is_default boolean not null default true,
  created_at timestamptz not null default now()
);

create index addresses_geog_idx on public.addresses using gist (geog);
create index addresses_user_id_idx on public.addresses (user_id);

alter table public.addresses enable row level security;

create policy "Addresses are viewable by owner"
  on public.addresses for select
  using (auth.uid() = user_id);

create policy "Addresses are insertable by owner"
  on public.addresses for insert
  with check (auth.uid() = user_id);

create policy "Addresses are updatable by owner"
  on public.addresses for update
  using (auth.uid() = user_id);

create policy "Addresses are deletable by owner"
  on public.addresses for delete
  using (auth.uid() = user_id);
