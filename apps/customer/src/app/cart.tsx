import Ionicons from '@expo/vector-icons/build/Ionicons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { formatMoney } from '@/lib/format';
import { lineItemTotalCents, useCartStore, useCartTotalCents } from '@/stores/cart-store';

export default function CartScreen() {
  const items = useCartStore((s) => s.items);
  const restaurantName = useCartStore((s) => s.restaurantName);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalCents = useCartTotalCents();

  return (
    <Screen className="pt-4">
      <View className="flex-row items-center gap-3 pb-4">
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <Ionicons name="chevron-back" size={24} color="#0A0A0A" />
        </Pressable>
        <Text className="text-xl font-semibold text-ink">Səbət</Text>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-ink-secondary">Səbətiniz boşdur</Text>
        </View>
      ) : (
        <>
          {restaurantName ? (
            <Text className="pb-3 text-sm text-ink-secondary">{restaurantName}</Text>
          ) : null}

          <ScrollView contentContainerStyle={{ gap: 16 }}>
            {items.map((line) => (
              <View key={line.id} className="gap-2 rounded-card bg-surface-alt p-4">
                <View className="flex-row items-start justify-between gap-3">
                  <Text className="flex-1 text-base font-medium text-ink">{line.name}</Text>
                  <Text className="text-base font-semibold text-ink">
                    {formatMoney(lineItemTotalCents(line))}
                  </Text>
                </View>

                {line.selectedOptions.length > 0 && (
                  <Text className="text-sm text-ink-secondary">
                    {line.selectedOptions.map((o) => o.name).join(', ')}
                  </Text>
                )}

                <View className="flex-row items-center justify-between pt-1">
                  <View className="flex-row items-center gap-4 rounded-pill bg-surface px-3 py-1.5">
                    <Pressable
                      onPress={() => updateQuantity(line.id, line.quantity - 1)}
                      accessibilityRole="button">
                      <Ionicons name="remove" size={18} color="#0A0A0A" />
                    </Pressable>
                    <Text className="text-base font-medium text-ink">{line.quantity}</Text>
                    <Pressable
                      onPress={() => updateQuantity(line.id, line.quantity + 1)}
                      accessibilityRole="button">
                      <Ionicons name="add" size={18} color="#0A0A0A" />
                    </Pressable>
                  </View>
                  <Pressable onPress={() => removeItem(line.id)} accessibilityRole="button">
                    <Ionicons name="trash-outline" size={20} color="#E5484D" />
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>

          <View className="flex-row items-center justify-between border-t border-surface-alt py-4">
            <Text className="text-base text-ink-secondary">Cəmi</Text>
            <Text className="text-lg font-semibold text-ink">{formatMoney(totalCents)}</Text>
          </View>
        </>
      )}
    </Screen>
  );
}
