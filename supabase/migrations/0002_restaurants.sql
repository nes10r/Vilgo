-- Phase B: restaurants + a single RPC that serves nearby/search/category browsing.

create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  cover_image_url text,
  logo_url text,
  cuisine_tags text[] not null default '{}',
  rating numeric(2,1) not null default 0 check (rating between 0 and 5),
  rating_count integer not null default 0,
  price_range smallint not null default 2 check (price_range between 1 and 4),
  lat double precision not null,
  lng double precision not null,
  geog geography(point, 4326) generated always as (
    st_setsrid(st_makepoint(lng, lat), 4326)::geography
  ) stored,
  address_line text not null,
  delivery_fee_cents integer not null default 0,
  min_order_cents integer not null default 0,
  avg_prep_time_minutes integer not null default 25,
  opening_hours jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index restaurants_geog_idx on public.restaurants using gist (geog);
create index restaurants_cuisine_tags_idx on public.restaurants using gin (cuisine_tags);
create index restaurants_is_active_idx on public.restaurants (is_active) where is_active;

alter table public.restaurants enable row level security;

create policy "Restaurants are viewable by everyone"
  on public.restaurants for select
  using (is_active);

-- Serves Home (nearby only), Search (text + filters) and Category (cuisine
-- tag only) through one query shape: every discriminating parameter is
-- optional with a SQL default, and every result row carries distance_meters.
create or replace function public.nearby_restaurants(
  user_lat double precision,
  user_lng double precision,
  radius_meters integer default 15000,
  search_query text default null,
  cuisine_tag text default null,
  min_price smallint default null,
  max_price smallint default null,
  min_rating numeric default null,
  limit_count integer default 30,
  offset_count integer default 0
)
returns table (
  id uuid,
  slug text,
  name text,
  description text,
  cover_image_url text,
  logo_url text,
  cuisine_tags text[],
  rating numeric,
  rating_count integer,
  price_range smallint,
  lat double precision,
  lng double precision,
  address_line text,
  delivery_fee_cents integer,
  min_order_cents integer,
  avg_prep_time_minutes integer,
  opening_hours jsonb,
  is_active boolean,
  created_at timestamptz,
  distance_meters double precision
)
language sql
stable
as $$
  select
    r.id, r.slug, r.name, r.description, r.cover_image_url, r.logo_url,
    r.cuisine_tags, r.rating, r.rating_count, r.price_range, r.lat, r.lng,
    r.address_line, r.delivery_fee_cents, r.min_order_cents, r.avg_prep_time_minutes,
    r.opening_hours, r.is_active, r.created_at,
    st_distance(
      r.geog,
      st_setsrid(st_makepoint(user_lng, user_lat), 4326)::geography
    ) as distance_meters
  from public.restaurants r
  where r.is_active
    and st_dwithin(
      r.geog,
      st_setsrid(st_makepoint(user_lng, user_lat), 4326)::geography,
      radius_meters
    )
    and (
      search_query is null
      or r.name ilike '%' || search_query || '%'
      or exists (
        select 1 from unnest(r.cuisine_tags) t where t ilike '%' || search_query || '%'
      )
    )
    and (cuisine_tag is null or cuisine_tag = any (r.cuisine_tags))
    and (min_price is null or r.price_range >= min_price)
    and (max_price is null or r.price_range <= max_price)
    and (min_rating is null or r.rating >= min_rating)
  order by distance_meters asc
  limit limit_count
  offset offset_count;
$$;

-- New functions don't inherit the project's default table grants.
grant execute on function public.nearby_restaurants(
  double precision, double precision, integer, text, text, smallint, smallint, numeric, integer, integer
) to anon, authenticated;
