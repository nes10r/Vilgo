import { useQuery } from '@tanstack/react-query';

import { fetchRestaurantById } from '@/features/restaurants/api';

export function useRestaurant(id: string) {
  return useQuery({
    queryKey: ['restaurants', 'detail', id],
    queryFn: () => fetchRestaurantById(id),
    staleTime: 5 * 60_000,
  });
}
