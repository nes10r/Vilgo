import type { ItemOption, ItemOptionGroup, MenuCategory, MenuItem } from '@/types/supabase';

export type ItemOptionGroupWithOptions = ItemOptionGroup & { options: ItemOption[] };
export type MenuItemWithOptions = MenuItem & { optionGroups: ItemOptionGroupWithOptions[] };
export type MenuCategoryWithItems = MenuCategory & { items: MenuItemWithOptions[] };
export type RestaurantMenu = MenuCategoryWithItems[];
