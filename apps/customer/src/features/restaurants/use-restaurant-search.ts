import { useQuery } from '@tanstack/react-query';

import { searchRestaurants } from '@/features/restaurants/api';
import { useDefaultAddress } from '@/features/addresses/use-default-address';
import type { RestaurantFilters } from '@/features/restaurants/types';
import { useDebouncedValue } from '@/lib/use-debounced-value';

export function useRestaurantSearch(query: string, filters: RestaurantFilters) {
  const { data: address } = useDefaultAddress();
  const debouncedQuery = useDebouncedValue(query.trim());

  const hasQuery = debouncedQuery.length >= 2;
  const hasFilters = !!(filters.cuisineTag || filters.priceTier || filters.minRating);

  return useQuery({
    queryKey: ['restaurants', 'search', debouncedQuery, filters, address?.id ?? null],
    queryFn: () =>
      searchRestaurants({ lat: address!.lat, lng: address!.lng, query: debouncedQuery, filters }),
    enabled: !!address && (hasQuery || hasFilters),
  });
}
