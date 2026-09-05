import { Text } from 'react-native';

import { Screen } from '@/components/ui/screen';

export default function OrdersScreen() {
  return (
    <Screen className="items-center justify-center gap-2">
      <Text className="text-xl font-semibold text-ink">Sifarişlərin</Text>
      <Text className="text-center text-ink-secondary">
        Aktiv və keçmiş sifarişlərin burada görünəcək.
      </Text>
    </Screen>
  );
}
