import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { formatDistance, formatMoney, formatPriceTier } from '@/lib/format';
import type { RestaurantWithDistance } from '@/types/supabase';

type RestaurantCardProps = {
  restaurant: RestaurantWithDistance;
  variant?: 'vertical' | 'horizontal';
  onPress: () => void;
};

export function RestaurantCard({ restaurant, variant = 'vertical', onPress }: RestaurantCardProps) {
  const isHorizontal = variant === 'horizontal';

  return (
    <Pressable
      onPress={onPress}
      className={`gap-2 ${isHorizontal ? 'w-64' : 'w-full'}`}
      accessibilityRole="button">
      <Image
        source={{ uri: restaurant.cover_image_url ?? undefined }}
        contentFit="cover"
        className={`w-full rounded-card bg-surface-alt ${isHorizontal ? 'h-32' : 'h-40'}`}
      />
      <View className="gap-1">
        <Text numberOfLines={1} className="text-base font-semibold text-ink">
          {restaurant.name}
        </Text>
        <Text numberOfLines={1} className="text-sm text-ink-secondary">
          {restaurant.cuisine_tags.join(' · ')}
        </Text>
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={14} color="#F5A623" />
            <Text className="text-sm text-ink-secondary">
              {restaurant.rating.toFixed(1)} ({restaurant.rating_count})
            </Text>
          </View>
          <Text className="text-sm text-ink-secondary">{formatPriceTier(restaurant.price_range)}</Text>
          <Text className="text-sm text-ink-secondary">{formatDistance(restaurant.distance_meters)}</Text>
        </View>
        <Text className="text-sm text-ink-secondary">
          Çatdırılma {formatMoney(restaurant.delivery_fee_cents)}
        </Text>
      </View>
    </Pressable>
  );
}
