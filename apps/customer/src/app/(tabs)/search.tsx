import { Ionicons } from '@expo/vector-icons';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';

import { FilterSheet } from '@/components/restaurants/filter-sheet';
import { RestaurantList } from '@/components/restaurants/restaurant-list';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { EMPTY_FILTERS, type RestaurantFilters } from '@/features/restaurants/types';
import { useRestaurantSearch } from '@/features/restaurants/use-restaurant-search';
import type { RestaurantWithDistance } from '@/types/supabase';

function handlePressRestaurant(restaurant: RestaurantWithDistance) {
  Alert.alert(restaurant.name, 'Restoran səhifəsi tezliklə əlavə olunacaq.');
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<RestaurantFilters>(EMPTY_FILTERS);
  const sheetRef = useRef<BottomSheetModal>(null);

  const { data: restaurants, isLoading, isFetching } = useRestaurantSearch(query, filters);
  const hasSearched = query.trim().length >= 2 || !!(filters.cuisineTag || filters.priceTier || filters.minRating);

  return (
    <Screen className="pt-4">
      <View className="flex-row items-end gap-3 pb-4">
        <View className="flex-1">
          <TextField
            label="Axtarış"
            placeholder="Restoran və ya mətbəx axtar"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
        </View>
        <Pressable
          onPress={() => sheetRef.current?.present()}
          className="h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt"
          accessibilityRole="button">
          <Ionicons name="options" size={20} color="#0A0A0A" />
        </Pressable>
      </View>

      <RestaurantList
        data={restaurants}
        isLoading={isLoading || isFetching}
        onPressRestaurant={handlePressRestaurant}
        emptyLabel={hasSearched ? 'Nəticə tapılmadı' : 'Axtarmaq üçün yaz və ya filtr seç'}
      />

      <FilterSheet ref={sheetRef} filters={filters} onApply={setFilters} />
    </Screen>
  );
}
