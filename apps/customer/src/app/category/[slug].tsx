import Ionicons from '@expo/vector-icons/build/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { RestaurantList } from '@/components/restaurants/restaurant-list';
import { Screen } from '@/components/ui/screen';
import { getCuisineCategory } from '@/features/restaurants/cuisine-categories';
import { useRestaurantsByCategory } from '@/features/restaurants/use-restaurants-by-category';
import type { RestaurantWithDistance } from '@/types/supabase';

function handlePressRestaurant(restaurant: RestaurantWithDistance) {
  router.push(`/restaurant/${restaurant.id}`);
}

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const category = getCuisineCategory(slug);
  const { data: restaurants, isLoading, isRefetching, refetch } = useRestaurantsByCategory(slug);

  return (
    <Screen className="pt-4">
      <View className="flex-row items-center gap-3 pb-4">
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <Ionicons name="chevron-back" size={24} color="#0A0A0A" />
        </Pressable>
        <Text className="text-xl font-semibold text-ink">{category?.label ?? slug}</Text>
      </View>

      <RestaurantList
        data={restaurants}
        isLoading={isLoading}
        refreshing={isRefetching}
        onRefresh={refetch}
        onPressRestaurant={handlePressRestaurant}
        emptyLabel="Bu kateqoriyada restoran tapılmadı"
      />
    </Screen>
  );
}
