import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { CartBar } from '@/components/cart/cart-bar';
import { MenuCategoryTabs } from '@/components/menu/menu-category-tabs';
import { MenuItemRow } from '@/components/menu/menu-item-row';
import { useRestaurantMenu } from '@/features/menu/use-restaurant-menu';
import { useRestaurant } from '@/features/restaurants/use-restaurant';
import { formatMoney, formatPriceTier } from '@/lib/format';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: restaurant, isLoading: restaurantLoading } = useRestaurant(id);
  const { data: menu, isLoading: menuLoading } = useRestaurantMenu(id);
  const insets = useSafeAreaInsets();

  const scrollRef = useRef<ScrollView>(null);
  const offsetsRef = useRef<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleCategoryLayout(index: number, event: LayoutChangeEvent) {
    offsetsRef.current[index] = event.nativeEvent.layout.y;
  }

  function handleTabPress(index: number) {
    setActiveIndex(index);
    scrollRef.current?.scrollTo({ y: offsetsRef.current[index] ?? 0, animated: true });
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const y = event.nativeEvent.contentOffset.y;
    let next = 0;
    for (let i = 0; i < offsetsRef.current.length; i++) {
      if (y >= (offsetsRef.current[i] ?? 0) - 8) next = i;
    }
    setActiveIndex(next);
  }

  if (restaurantLoading || !restaurant) {
    return (
      <SafeAreaView edges={['bottom']} className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator color="#00C2E8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        ref={scrollRef}
        stickyHeaderIndices={[1]}
        onScroll={handleScroll}
        scrollEventThrottle={32}>
        <View>
          <Image
            source={{ uri: restaurant.cover_image_url ?? undefined }}
            contentFit="cover"
            className="h-56 w-full bg-surface-alt"
          />
          <Pressable
            onPress={() => router.back()}
            style={{ top: insets.top + 8 }}
            className="absolute left-4 h-10 w-10 items-center justify-center rounded-full bg-white/90"
            accessibilityRole="button">
            <Ionicons name="chevron-back" size={22} color="#0A0A0A" />
          </Pressable>

          <View className="gap-2 px-6 py-4">
            <Text className="text-2xl font-bold text-ink">{restaurant.name}</Text>
            <Text className="text-sm text-ink-secondary">{restaurant.cuisine_tags.join(' · ')}</Text>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <Ionicons name="star" size={14} color="#F5A623" />
                <Text className="text-sm text-ink-secondary">
                  {restaurant.rating.toFixed(1)} ({restaurant.rating_count})
                </Text>
              </View>
              <Text className="text-sm text-ink-secondary">
                {formatPriceTier(restaurant.price_range)}
              </Text>
              <Text className="text-sm text-ink-secondary">
                {restaurant.avg_prep_time_minutes} dəq
              </Text>
            </View>
            <Text className="text-sm text-ink-secondary">
              Çatdırılma {formatMoney(restaurant.delivery_fee_cents)} · {restaurant.address_line}
            </Text>
          </View>
        </View>

        {menu && menu.length > 0 ? (
          <>
            <MenuCategoryTabs
              categories={menu}
              activeIndex={activeIndex}
              onPress={handleTabPress}
            />
            <View className="px-6">
              {menu.map((category, index) => (
                <View key={category.id} onLayout={(e) => handleCategoryLayout(index, e)}>
                  <Text className="pb-2 pt-4 text-lg font-semibold text-ink">{category.name}</Text>
                  {category.items.map((item) => (
                    <MenuItemRow
                      key={item.id}
                      item={item}
                      onPress={() => router.push(`/restaurant/${id}/item/${item.id}`)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </>
        ) : (
          <View className="items-center justify-center px-6 py-16">
            {menuLoading ? (
              <ActivityIndicator color="#00C2E8" />
            ) : (
              <Text className="text-center text-ink-secondary">
                Bu restoran hələ menyusunu əlavə etməyib.
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      <CartBar />
    </SafeAreaView>
  );
}
