import { useQuery } from '@tanstack/react-query';

import { fetchNearbyRestaurants } from '@/features/restaurants/api';
import { useDefaultAddress } from '@/features/addresses/use-default-address';

export function useNearbyRestaurants() {
  const { data: address } = useDefaultAddress();

  return useQuery({
    queryKey: ['restaurants', 'nearby', address?.id ?? null],
    queryFn: () => fetchNearbyRestaurants({ lat: address!.lat, lng: address!.lng }),
    enabled: !!address,
    staleTime: 5 * 60_000,
  });
}
