import { useMemo } from 'react';

import { useRestaurantMenu } from '@/features/menu/use-restaurant-menu';

export function useMenuItem(restaurantId: string, itemId: string) {
  const { data: menu, isLoading } = useRestaurantMenu(restaurantId);

  const item = useMemo(
    () => menu?.flatMap((category) => category.items).find((i) => i.id === itemId),
    [menu, itemId],
  );

  return { item, isLoading };
}
