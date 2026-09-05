export type RestaurantFilters = {
  cuisineTag: string | null;
  priceTier: number | null;
  minRating: number | null;
};

export const EMPTY_FILTERS: RestaurantFilters = {
  cuisineTag: null,
  priceTier: null,
  minRating: null,
};
