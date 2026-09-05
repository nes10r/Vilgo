import Ionicons from '@expo/vector-icons/build/Ionicons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { RestaurantCard } from '@/components/restaurants/restaurant-card';
import { CategoryChipRow } from '@/components/restaurants/category-chip-row';
import { RestaurantList } from '@/components/restaurants/restaurant-list';
import { Screen } from '@/components/ui/screen';
import { useDefaultAddress } from '@/features/addresses/use-default-address';
import { useNearbyRestaurants } from '@/features/restaurants/use-nearby-restaurants';
import type { RestaurantWithDistance } from '@/types/supabase';

function handlePressRestaurant(restaurant: RestaurantWithDistance) {
  router.push(`/restaurant/${restaurant.id}`);
}

export default function HomeScreen() {
  const { data: address } = useDefaultAddress();
  const { data: restaurants, isLoading, isRefetching, refetch } = useNearbyRestaurants();

  const popular = useMemo(
    () => [...(restaurants ?? [])].sort((a, b) => b.rating - a.rating).slice(0, 10),
    [restaurants],
  );

  return (
    <Screen className="pt-4">
      <RestaurantList
        data={restaurants}
        isLoading={isLoading}
        refreshing={isRefetching}
        onRefresh={refetch}
        onPressRestaurant={handlePressRestaurant}
        emptyLabel="Yaxınlıqda restoran tapılmadı"
        ListHeaderComponent={
          <View className="gap-4 pb-4">
            <Pressable
              onPress={() => router.push('/(onboarding)/location-permission')}
              className="flex-row items-center gap-2"
              accessibilityRole="button">
              <Ionicons name="location" size={18} color="#00C2E8" />
              <Text numberOfLines={1} className="flex-1 text-base font-medium text-ink">
                {address?.line1 ?? 'Ünvan seçilməyib'}
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#9AA0A8" />
            </Pressable>

            <CategoryChipRow />

            {popular.length > 0 && (
              <View className="gap-2">
                <Text className="text-lg font-semibold text-ink">Sizə yaxın məşhurlar</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row gap-3">
                    {popular.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        variant="horizontal"
                        onPress={() => handlePressRestaurant(restaurant)}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

            <Text className="text-lg font-semibold text-ink">Bütün restoranlar</Text>
          </View>
        }
      />
    </Screen>
  );
}
