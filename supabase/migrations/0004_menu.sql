-- Phase C: menu schema. restaurant_id is denormalized onto every table (not just
-- the two tables that have it as their "natural" parent) so the app can fetch an
-- entire restaurant's menu with four parallel single-table queries instead of a
-- 3-hop waterfall (groups need item ids, options need group ids). It also keeps
-- RLS uniform: every table's policy is a single check against restaurants.is_active,
-- same shape as the restaurants table's own policy.

create table public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index menu_categories_restaurant_id_idx on public.menu_categories (restaurant_id);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  category_id uuid not null references public.menu_categories (id) on delete cascade,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  image_url text,
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index menu_items_restaurant_id_idx on public.menu_items (restaurant_id);
create index menu_items_category_id_idx on public.menu_items (category_id);
create index menu_items_is_available_idx on public.menu_items (is_available) where is_available;

create table public.item_option_groups (
  id uuid primary key default gen_random_uuid(),
  -- Denormalized (see header comment). Must always match the parent menu_item's
  -- restaurant_id; enforced app-side (seed script + a future admin tool), not by
  -- a DB constraint, since Postgres can't cheaply enforce cross-row consistency
  -- without a trigger — acceptable for a read-optimization column.
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  menu_item_id uuid not null references public.menu_items (id) on delete cascade,
  name text not null,
  selection_type text not null check (selection_type in ('single', 'multiple')),
  is_required boolean not null default false,
  min_select integer not null default 0,
  max_select integer not null default 1,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint item_option_groups_select_range check (min_select >= 0 and max_select >= min_select)
);

create index item_option_groups_restaurant_id_idx on public.item_option_groups (restaurant_id);
create index item_option_groups_menu_item_id_idx on public.item_option_groups (menu_item_id);

create table public.item_options (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  option_group_id uuid not null references public.item_option_groups (id) on delete cascade,
  name text not null,
  price_delta_cents integer not null default 0,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index item_options_restaurant_id_idx on public.item_options (restaurant_id);
create index item_options_option_group_id_idx on public.item_options (option_group_id);

alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.item_option_groups enable row level security;
alter table public.item_options enable row level security;

-- Same shape as "Restaurants are viewable by everyone" (0002) — public read,
-- gated only on the parent restaurant being active. No auth required.
create policy "Menu categories are viewable by everyone"
  on public.menu_categories for select
  using (exists (
    select 1 from public.restaurants r where r.id = menu_categories.restaurant_id and r.is_active
  ));

create policy "Menu items are viewable by everyone"
  on public.menu_items for select
  using (exists (
    select 1 from public.restaurants r where r.id = menu_items.restaurant_id and r.is_active
  ));

create policy "Item option groups are viewable by everyone"
  on public.item_option_groups for select
  using (exists (
    select 1 from public.restaurants r where r.id = item_option_groups.restaurant_id and r.is_active
  ));

create policy "Item options are viewable by everyone"
  on public.item_options for select
  using (exists (
    select 1 from public.restaurants r where r.id = item_options.restaurant_id and r.is_active
  ));
