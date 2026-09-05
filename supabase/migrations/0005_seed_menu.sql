-- Phase C: seed menus for 3 of the 12 sample restaurants (kebab/dönər, pizza,
-- burger) so the feature is demoable. The other 9 restaurants intentionally have
-- no menu rows yet (real-world equivalent of a restaurant mid-onboarding) — the
-- restaurant detail screen must render an empty-menu state for those.

-- ============================================================
-- 1. Dönər Ustası (donar-ustasi)
-- ============================================================
do $$
declare
  v_restaurant_id uuid;
  v_cat_id uuid;
  v_item_id uuid;
  v_group_id uuid;
begin
  select id into v_restaurant_id from public.restaurants where slug = 'donar-ustasi';

  insert into public.menu_categories (restaurant_id, name, sort_order)
  values (v_restaurant_id, 'Dönərlər', 1) returning id into v_cat_id;

  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order)
  values (v_restaurant_id, v_cat_id, 'Toyuq Dönər', 'Lavaşda toyuq əti, təzə tərəvəz və sous ilə', 600, 'https://picsum.photos/seed/vilgo-item-donar-1/400/300', 1)
  returning id into v_item_id;

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Ölçü', 'single', true, 1, 1, 1) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'Kiçik', 0, true, 1),
    (v_restaurant_id, v_group_id, 'Orta', 150, false, 2),
    (v_restaurant_id, v_group_id, 'Böyük', 300, false, 3);

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Sous', 'multiple', false, 0, 3, 2) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'Sarımsaq sousu', 0, false, 1),
    (v_restaurant_id, v_group_id, 'Acı sous', 0, false, 2),
    (v_restaurant_id, v_group_id, 'Ketçup', 0, false, 3),
    (v_restaurant_id, v_group_id, 'Mayonez', 0, false, 4);

  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order)
  values (v_restaurant_id, v_cat_id, 'Ət Dönər', 'Lavaşda mal əti, təzə tərəvəz və sous ilə', 750, 'https://picsum.photos/seed/vilgo-item-donar-2/400/300', 2)
  returning id into v_item_id;

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Ölçü', 'single', true, 1, 1, 1) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'Kiçik', 0, true, 1),
    (v_restaurant_id, v_group_id, 'Orta', 150, false, 2),
    (v_restaurant_id, v_group_id, 'Böyük', 300, false, 3);

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Sous', 'multiple', false, 0, 3, 2) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'Sarımsaq sousu', 0, false, 1),
    (v_restaurant_id, v_group_id, 'Acı sous', 0, false, 2),
    (v_restaurant_id, v_group_id, 'Ketçup', 0, false, 3),
    (v_restaurant_id, v_group_id, 'Mayonez', 0, false, 4);

  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order)
  values (v_restaurant_id, v_cat_id, 'Dönər Portsiya (boşqabda)', 'Boşqabda dönər əti, kartof qızartması ilə', 900, 'https://picsum.photos/seed/vilgo-item-donar-3/400/300', 3)
  returning id into v_item_id;

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Əlavələr', 'multiple', false, 0, 3, 1) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'Əlavə pendir', 100, false, 1),
    (v_restaurant_id, v_group_id, 'Əlavə kartof', 150, false, 2),
    (v_restaurant_id, v_group_id, 'Təzə salat', 0, false, 3);

  insert into public.menu_categories (restaurant_id, name, sort_order)
  values (v_restaurant_id, 'Qəlyanaltılar', 2) returning id into v_cat_id;
  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order) values
    (v_restaurant_id, v_cat_id, 'Kartof Qızartması', null, 350, 'https://picsum.photos/seed/vilgo-item-donar-4/400/300', 1),
    (v_restaurant_id, v_cat_id, 'Təzə Salat', null, 300, 'https://picsum.photos/seed/vilgo-item-donar-5/400/300', 2);

  insert into public.menu_categories (restaurant_id, name, sort_order)
  values (v_restaurant_id, 'İçəcəklər', 3) returning id into v_cat_id;
  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order) values
    (v_restaurant_id, v_cat_id, 'Kola 0.5L', null, 200, 'https://picsum.photos/seed/vilgo-item-donar-6/400/300', 1),
    (v_restaurant_id, v_cat_id, 'Ayran', null, 150, 'https://picsum.photos/seed/vilgo-item-donar-7/400/300', 2),
    (v_restaurant_id, v_cat_id, 'Su 0.5L', null, 100, 'https://picsum.photos/seed/vilgo-item-donar-8/400/300', 3);
end $$;

-- ============================================================
-- 2. Pizza Roma (pizza-roma)
-- ============================================================
do $$
declare
  v_restaurant_id uuid;
  v_cat_id uuid;
  v_item_id uuid;
  v_group_id uuid;
begin
  select id into v_restaurant_id from public.restaurants where slug = 'pizza-roma';

  insert into public.menu_categories (restaurant_id, name, sort_order)
  values (v_restaurant_id, 'Pizzalar', 1) returning id into v_cat_id;

  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order)
  values (v_restaurant_id, v_cat_id, 'Margherita', 'Pomidor sousu, mozzarella, reyhan', 900, 'https://picsum.photos/seed/vilgo-item-pizza-1/400/300', 1)
  returning id into v_item_id;

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Ölçü', 'single', true, 1, 1, 1) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, '25 sm', 0, true, 1),
    (v_restaurant_id, v_group_id, '30 sm', 300, false, 2),
    (v_restaurant_id, v_group_id, '40 sm', 600, false, 3);

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Əlavə toppinglər', 'multiple', false, 0, 5, 2) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'Göbələk', 150, false, 1),
    (v_restaurant_id, v_group_id, 'Zeytun', 100, false, 2),
    (v_restaurant_id, v_group_id, 'Əlavə pendir', 200, false, 3),
    (v_restaurant_id, v_group_id, 'Kolbasa', 250, false, 4),
    (v_restaurant_id, v_group_id, 'Ananas', 150, false, 5);

  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order)
  values (v_restaurant_id, v_cat_id, 'Pepperoni', 'Pomidor sousu, mozzarella, pepperoni kolbasası', 1100, 'https://picsum.photos/seed/vilgo-item-pizza-2/400/300', 2)
  returning id into v_item_id;

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Ölçü', 'single', true, 1, 1, 1) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, '25 sm', 0, true, 1),
    (v_restaurant_id, v_group_id, '30 sm', 300, false, 2),
    (v_restaurant_id, v_group_id, '40 sm', 600, false, 3);

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Əlavə toppinglər', 'multiple', false, 0, 5, 2) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'Göbələk', 150, false, 1),
    (v_restaurant_id, v_group_id, 'Zeytun', 100, false, 2),
    (v_restaurant_id, v_group_id, 'Əlavə pendir', 200, false, 3),
    (v_restaurant_id, v_group_id, 'Kolbasa', 250, false, 4),
    (v_restaurant_id, v_group_id, 'Ananas', 150, false, 5);

  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order)
  values (v_restaurant_id, v_cat_id, 'Dörd Pendir', 'Mozzarella, parmesan, gorgonzola, çedar', 1200, 'https://picsum.photos/seed/vilgo-item-pizza-3/400/300', 3)
  returning id into v_item_id;

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Ölçü', 'single', true, 1, 1, 1) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, '25 sm', 0, true, 1),
    (v_restaurant_id, v_group_id, '30 sm', 300, false, 2),
    (v_restaurant_id, v_group_id, '40 sm', 600, false, 3);

  insert into public.menu_categories (restaurant_id, name, sort_order)
  values (v_restaurant_id, 'Qəlyanaltılar', 2) returning id into v_cat_id;
  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order) values
    (v_restaurant_id, v_cat_id, 'Sarımsaq Çörəyi', null, 400, 'https://picsum.photos/seed/vilgo-item-pizza-4/400/300', 1),
    (v_restaurant_id, v_cat_id, 'Fransız Kartofu', null, 350, 'https://picsum.photos/seed/vilgo-item-pizza-5/400/300', 2);

  insert into public.menu_categories (restaurant_id, name, sort_order)
  values (v_restaurant_id, 'İçəcəklər', 3) returning id into v_cat_id;
  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order) values
    (v_restaurant_id, v_cat_id, 'Kola 0.5L', null, 200, 'https://picsum.photos/seed/vilgo-item-pizza-6/400/300', 1),
    (v_restaurant_id, v_cat_id, 'Fanta 0.5L', null, 200, 'https://picsum.photos/seed/vilgo-item-pizza-7/400/300', 2),
    (v_restaurant_id, v_cat_id, 'Su 0.5L', null, 100, 'https://picsum.photos/seed/vilgo-item-pizza-8/400/300', 3);
end $$;

-- ============================================================
-- 3. Burger House Baku (burger-house)
-- ============================================================
do $$
declare
  v_restaurant_id uuid;
  v_cat_id uuid;
  v_item_id uuid;
  v_group_id uuid;
begin
  select id into v_restaurant_id from public.restaurants where slug = 'burger-house';

  insert into public.menu_categories (restaurant_id, name, sort_order)
  values (v_restaurant_id, 'Burgerlər', 1) returning id into v_cat_id;

  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order)
  values (v_restaurant_id, v_cat_id, 'Klassik Burger', 'Mal əti kotleti, salat, pomidor, soğan', 700, 'https://picsum.photos/seed/vilgo-item-burger-1/400/300', 1)
  returning id into v_item_id;

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Sous seçimi', 'single', true, 1, 1, 1) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'BBQ sous', 0, true, 1),
    (v_restaurant_id, v_group_id, 'Ketçup', 0, false, 2),
    (v_restaurant_id, v_group_id, 'Mayonez', 0, false, 3),
    (v_restaurant_id, v_group_id, 'Acı sous', 0, false, 4);

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Əlavələr', 'multiple', false, 0, 3, 2) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'Bekon', 200, false, 1),
    (v_restaurant_id, v_group_id, 'Əlavə pendir', 150, false, 2),
    (v_restaurant_id, v_group_id, 'Soğan halqası', 150, false, 3);

  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order)
  values (v_restaurant_id, v_cat_id, 'Cheeseburger', 'Mal əti kotleti, çedar pendiri, turşu', 800, 'https://picsum.photos/seed/vilgo-item-burger-2/400/300', 2)
  returning id into v_item_id;

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Sous seçimi', 'single', true, 1, 1, 1) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'BBQ sous', 0, true, 1),
    (v_restaurant_id, v_group_id, 'Ketçup', 0, false, 2),
    (v_restaurant_id, v_group_id, 'Mayonez', 0, false, 3),
    (v_restaurant_id, v_group_id, 'Acı sous', 0, false, 4);

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Əlavələr', 'multiple', false, 0, 3, 2) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'Bekon', 200, false, 1),
    (v_restaurant_id, v_group_id, 'Əlavə pendir', 150, false, 2),
    (v_restaurant_id, v_group_id, 'Soğan halqası', 150, false, 3);

  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order)
  values (v_restaurant_id, v_cat_id, 'Double Burger', 'İki mal əti kotleti, əlavə pendir', 1100, 'https://picsum.photos/seed/vilgo-item-burger-3/400/300', 3)
  returning id into v_item_id;

  insert into public.item_option_groups (restaurant_id, menu_item_id, name, selection_type, is_required, min_select, max_select, sort_order)
  values (v_restaurant_id, v_item_id, 'Sous seçimi', 'single', true, 1, 1, 1) returning id into v_group_id;
  insert into public.item_options (restaurant_id, option_group_id, name, price_delta_cents, is_default, sort_order) values
    (v_restaurant_id, v_group_id, 'BBQ sous', 0, true, 1),
    (v_restaurant_id, v_group_id, 'Ketçup', 0, false, 2),
    (v_restaurant_id, v_group_id, 'Mayonez', 0, false, 3),
    (v_restaurant_id, v_group_id, 'Acı sous', 0, false, 4);

  insert into public.menu_categories (restaurant_id, name, sort_order)
  values (v_restaurant_id, 'Qarnirlər', 2) returning id into v_cat_id;
  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order) values
    (v_restaurant_id, v_cat_id, 'Kartof Qızartması', null, 350, 'https://picsum.photos/seed/vilgo-item-burger-4/400/300', 1),
    (v_restaurant_id, v_cat_id, 'Soğan Halqaları', null, 400, 'https://picsum.photos/seed/vilgo-item-burger-5/400/300', 2);

  insert into public.menu_categories (restaurant_id, name, sort_order)
  values (v_restaurant_id, 'İçəcəklər', 3) returning id into v_cat_id;
  insert into public.menu_items (restaurant_id, category_id, name, description, price_cents, image_url, sort_order) values
    (v_restaurant_id, v_cat_id, 'Kola 0.5L', null, 200, 'https://picsum.photos/seed/vilgo-item-burger-6/400/300', 1),
    (v_restaurant_id, v_cat_id, 'Sprite 0.5L', null, 200, 'https://picsum.photos/seed/vilgo-item-burger-7/400/300', 2),
    (v_restaurant_id, v_cat_id, 'Su 0.5L', null, 100, 'https://picsum.photos/seed/vilgo-item-burger-8/400/300', 3);
end $$;
