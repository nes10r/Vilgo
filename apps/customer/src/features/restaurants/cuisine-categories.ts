import type { Ionicons } from '@expo/vector-icons';

export type CuisineCategory = {
  slug: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export const CUISINE_CATEGORIES: CuisineCategory[] = [
  { slug: 'milli', label: 'Milli mətbəx', icon: 'restaurant' },
  { slug: 'kebab', label: 'Kabab', icon: 'flame' },
  { slug: 'pizza', label: 'Pizza', icon: 'pizza' },
  { slug: 'burger', label: 'Burger', icon: 'fast-food' },
  { slug: 'sushi', label: 'Sushi', icon: 'fish' },
  { slug: 'fast-food', label: 'Fast Food', icon: 'flash' },
  { slug: 'seafood', label: 'Dəniz məhsulları', icon: 'water' },
  { slug: 'vegan', label: 'Vegan', icon: 'leaf' },
  { slug: 'dessert', label: 'Şirniyyat', icon: 'ice-cream' },
  { slug: 'coffee', label: 'Kofe', icon: 'cafe' },
];

export function getCuisineCategory(slug: string): CuisineCategory | undefined {
  return CUISINE_CATEGORIES.find((category) => category.slug === slug);
}
