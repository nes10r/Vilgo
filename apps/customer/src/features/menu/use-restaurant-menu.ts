import { useQuery } from '@tanstack/react-query';

import { fetchRestaurantMenu } from '@/features/menu/api';

export function useRestaurantMenu(restaurantId: string) {
  return useQuery({
    queryKey: ['menu', restaurantId],
    queryFn: () => fetchRestaurantMenu(restaurantId),
    staleTime: 5 * 60_000,
  });
}
