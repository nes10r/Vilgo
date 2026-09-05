import { supabase } from '@/lib/supabase';
import type { Restaurant, RestaurantWithDistance } from '@/types/supabase';
import type { RestaurantFilters } from '@/features/restaurants/types';

export async function fetchRestaurantById(id: string): Promise<Restaurant> {
  const { data, error } = await supabase.from('restaurants').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function callNearbyRestaurantsRpc(args: {
  user_lat: number;
  user_lng: number;
  search_query?: string | null;
  cuisine_tag?: string | null;
  min_price?: number | null;
  max_price?: number | null;
  min_rating?: number | null;
}): Promise<RestaurantWithDistance[]> {
  const { data, error } = await supabase.rpc('nearby_restaurants', args);
  if (error) throw error;
  return data ?? [];
}

export function fetchNearbyRestaurants({ lat, lng }: { lat: number; lng: number }) {
  return callNearbyRestaurantsRpc({ user_lat: lat, user_lng: lng });
}

export function searchRestaurants({
  lat,
  lng,
  query,
  filters,
}: {
  lat: number;
  lng: number;
  query: string;
  filters: RestaurantFilters;
}) {
  return callNearbyRestaurantsRpc({
    user_lat: lat,
    user_lng: lng,
    search_query: query || null,
    cuisine_tag: filters.cuisineTag,
    min_price: filters.priceTier,
    max_price: filters.priceTier,
    min_rating: filters.minRating,
  });
}

export function fetchRestaurantsByCategory({
  lat,
  lng,
  slug,
}: {
  lat: number;
  lng: number;
  slug: string;
}) {
  return callNearbyRestaurantsRpc({ user_lat: lat, user_lng: lng, cuisine_tag: slug });
}
