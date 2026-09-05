import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { OptionGroup } from '@/components/menu/option-group';
import { QuantityStepper } from '@/components/menu/quantity-stepper';
import { useMenuItem } from '@/features/menu/use-menu-item';
import { useRestaurant } from '@/features/restaurants/use-restaurant';
import { formatMoney } from '@/lib/format';
import { useCartStore } from '@/stores/cart-store';

export default function ItemDetailScreen() {
  const { id, itemId } = useLocalSearchParams<{ id: string; itemId: string }>();
  const { item, isLoading } = useMenuItem(id, itemId);
  const { data: restaurant } = useRestaurant(id);
  const addItem = useCartStore((s) => s.addItem);
  const clearCart = useCartStore((s) => s.clear);

  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [quantity, setQuantity] = useState(1);
  const [initializedItemId, setInitializedItemId] = useState<string | null>(null);

  // Seed default option selections once the item data arrives. Adjusting
  // state during render (rather than in an effect) avoids an extra
  // render pass — this only fires once per item since it's guarded by
  // initializedItemId.
  if (item && initializedItemId !== item.id) {
    const initial: Record<string, string[]> = {};
    for (const group of item.optionGroups) {
      initial[group.id] = group.options.filter((o) => o.is_default).map((o) => o.id);
    }
    setSelections(initial);
    setInitializedItemId(item.id);
  }

  const isValid = useMemo(() => {
    if (!item) return false;
    if (!item.is_available) return false;
    return item.optionGroups.every((group) => {
      const count = selections[group.id]?.length ?? 0;
      return count >= group.min_select && count <= group.max_select;
    });
  }, [item, selections]);

  const totalCents = useMemo(() => {
    if (!item) return 0;
    const optionsTotal = item.optionGroups.reduce((sum, group) => {
      const selectedIds = selections[group.id] ?? [];
      return (
        sum +
        group.options
          .filter((o) => selectedIds.includes(o.id))
          .reduce((s, o) => s + o.price_delta_cents, 0)
      );
    }, 0);
    return (item.price_cents + optionsTotal) * quantity;
  }, [item, selections, quantity]);

  function toggleOption(groupId: string, optionId: string, isMultiple: boolean) {
    setSelections((prev) => {
      const current = prev[groupId] ?? [];
      if (isMultiple) {
        return {
          ...prev,
          [groupId]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      }
      return { ...prev, [groupId]: current.includes(optionId) ? [] : [optionId] };
    });
  }

  function handleAddToCart() {
    if (!item || !restaurant) return;

    const selectedOptions = item.optionGroups.flatMap((group) => {
      const selectedIds = selections[group.id] ?? [];
      return group.options
        .filter((o) => selectedIds.includes(o.id))
        .map((o) => ({
          optionId: o.id,
          groupId: group.id,
          name: o.name,
          priceDeltaCents: o.price_delta_cents,
        }));
    });

    const result = addItem({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      menuItemId: item.id,
      name: item.name,
      basePriceCents: item.price_cents,
      quantity,
      selectedOptions,
    });

    if (result.status === 'restaurant-conflict') {
      Alert.alert(
        'Səbətdə başqa restoran var',
        `Səbətinizdə "${result.currentRestaurantName}" restoranından məhsullar var. Davam etmək üçün səbəti təmizləmək lazımdır.`,
        [
          { text: 'Ləğv et', style: 'cancel' },
          {
            text: 'Səbəti təmizlə',
            style: 'destructive',
            onPress: () => {
              clearCart();
              addItem({
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                menuItemId: item.id,
                name: item.name,
                basePriceCents: item.price_cents,
                quantity,
                selectedOptions,
              });
              router.back();
            },
          },
        ],
      );
      return;
    }

    router.back();
  }

  if (isLoading || !item) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator color="#00C2E8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="flex-row items-center justify-between px-6 py-3">
        <Text numberOfLines={1} className="flex-1 text-lg font-semibold text-ink">
          {item.name}
        </Text>
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <Ionicons name="close" size={26} color="#0A0A0A" />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ gap: 20, paddingBottom: 24 }}>
        {item.image_url ? (
          <Image
            source={{ uri: item.image_url }}
            contentFit="cover"
            className="h-48 w-full rounded-card bg-surface-alt"
          />
        ) : null}

        <View className="gap-1">
          {item.description ? (
            <Text className="text-base text-ink-secondary">{item.description}</Text>
          ) : null}
          <Text className="text-lg font-semibold text-ink">{formatMoney(item.price_cents)}</Text>
          {!item.is_available && (
            <Text className="text-sm font-medium text-danger">Bu məhsul hazırda bitib</Text>
          )}
        </View>

        {item.optionGroups.map((group) => (
          <OptionGroup
            key={group.id}
            group={group}
            selectedIds={selections[group.id] ?? []}
            onToggle={(optionId) => toggleOption(group.id, optionId, group.selection_type === 'multiple')}
          />
        ))}
      </ScrollView>

      <View className="flex-row items-center gap-3 border-t border-surface-alt px-6 py-4">
        <QuantityStepper quantity={quantity} onChange={setQuantity} />
        <Button
          label={`Səbətə əlavə et · ${formatMoney(totalCents)}`}
          onPress={handleAddToCart}
          disabled={!isValid}
          className="flex-1"
        />
      </View>
    </SafeAreaView>
  );
}
