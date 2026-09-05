import { FlashList } from '@shopify/flash-list';
import type { ReactElement } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { RestaurantCard } from '@/components/restaurants/restaurant-card';
import type { RestaurantWithDistance } from '@/types/supabase';

type RestaurantListProps = {
  data: RestaurantWithDistance[] | undefined;
  isLoading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onPressRestaurant: (restaurant: RestaurantWithDistance) => void;
  ListHeaderComponent?: ReactElement;
  emptyLabel?: string;
};

export function RestaurantList({
  data,
  isLoading,
  refreshing,
  onRefresh,
  onPressRestaurant,
  ListHeaderComponent,
  emptyLabel = 'Heç bir restoran tapılmadı',
}: RestaurantListProps) {
  return (
    <FlashList
      data={data ?? []}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="pb-4">
          <RestaurantCard restaurant={item} onPress={() => onPressRestaurant(item)} />
        </View>
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <View className="items-center justify-center py-16">
          {isLoading ? (
            <ActivityIndicator color="#00C2E8" />
          ) : (
            <Text className="text-ink-secondary">{emptyLabel}</Text>
          )}
        </View>
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}
