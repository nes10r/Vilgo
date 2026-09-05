import { useQuery } from '@tanstack/react-query';

import { fetchRestaurantsByCategory } from '@/features/restaurants/api';
import { useDefaultAddress } from '@/features/addresses/use-default-address';

export function useRestaurantsByCategory(slug: string) {
  const { data: address } = useDefaultAddress();

  return useQuery({
    queryKey: ['restaurants', 'category', slug, address?.id ?? null],
    queryFn: () => fetchRestaurantsByCategory({ lat: address!.lat, lng: address!.lng, slug }),
    enabled: !!address,
    staleTime: 5 * 60_000,
  });
}
