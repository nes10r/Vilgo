import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { formatMoney } from '@/lib/format';
import { useCartItemCount, useCartTotalCents } from '@/stores/cart-store';

export function CartBar() {
  const count = useCartItemCount();
  const totalCents = useCartTotalCents();

  if (count === 0) return null;

  return (
    <View className="flex-row items-center gap-3 border-t border-surface-alt bg-surface px-6 py-3">
      <View className="flex-1">
        <Text className="text-sm text-ink-secondary">{count} məhsul</Text>
        <Text className="text-base font-semibold text-ink">{formatMoney(totalCents)}</Text>
      </View>
      <Button label="Səbətə bax" onPress={() => router.push('/cart')} />
    </View>
  );
}
