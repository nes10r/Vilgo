import { Text, View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { useDefaultAddress } from '@/features/addresses/use-default-address';

export default function HomeScreen() {
  const { data: address } = useDefaultAddress();

  return (
    <Screen className="gap-2 pt-6">
      <Text className="text-sm font-medium text-ink-secondary">Çatdırılma ünvanı</Text>
      <Text className="text-lg font-semibold text-ink">{address?.line1 ?? 'Ünvan yüklənir...'}</Text>

      <View className="mt-10 flex-1 items-center justify-center gap-2">
        <Text className="text-xl font-semibold text-ink">Restoranlar tezliklə burada 🍔</Text>
        <Text className="text-center text-ink-secondary">
          Bu, Vilgo-nun əsas kəşf ekranıdır. Növbəti mərhələdə restoran siyahısı, kateqoriyalar
          və axtarış əlavə olunacaq.
        </Text>
      </View>
    </Screen>
  );
}
