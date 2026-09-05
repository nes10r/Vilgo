import { supabase } from '@/lib/supabase';
import type { RestaurantMenu } from '@/features/menu/types';
import type { ItemOption, ItemOptionGroup, MenuCategory, MenuItem } from '@/types/supabase';

function groupBy<T, K extends string>(items: T[], key: (item: T) => K): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of items) {
    const k = key(item);
    (result[k] ??= []).push(item);
  }
  return result;
}

function assembleMenu(
  categories: MenuCategory[],
  items: MenuItem[],
  groups: ItemOptionGroup[],
  options: ItemOption[],
): RestaurantMenu {
  const optionsByGroup = groupBy(options, (o) => o.option_group_id);
  const groupsByItem = groupBy(groups, (g) => g.menu_item_id);
  const itemsByCategory = groupBy(items, (i) => i.category_id);

  return categories
    .map((category) => ({
      ...category,
      items: (itemsByCategory[category.id] ?? []).map((item) => ({
        ...item,
        optionGroups: (groupsByItem[item.id] ?? []).map((group) => ({
          ...group,
          options: optionsByGroup[group.id] ?? [],
        })),
      })),
    }))
    .filter((category) => category.items.length > 0);
}

export async function fetchRestaurantMenu(restaurantId: string): Promise<RestaurantMenu> {
  const [categoriesRes, itemsRes, groupsRes, optionsRes] = await Promise.all([
    supabase
      .from('menu_categories')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('sort_order'),
    supabase.from('menu_items').select('*').eq('restaurant_id', restaurantId).order('sort_order'),
    supabase
      .from('item_option_groups')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('sort_order'),
    supabase
      .from('item_options')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('sort_order'),
  ]);

  for (const res of [categoriesRes, itemsRes, groupsRes, optionsRes]) {
    if (res.error) throw res.error;
  }

  return assembleMenu(
    categoriesRes.data ?? [],
    itemsRes.data ?? [],
    groupsRes.data ?? [],
    optionsRes.data ?? [],
  );
}
