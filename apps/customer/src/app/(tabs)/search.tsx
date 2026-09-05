import { Text } from 'react-native';

import { Screen } from '@/components/ui/screen';

export default function SearchScreen() {
  return (
    <Screen className="items-center justify-center gap-2">
      <Text className="text-xl font-semibold text-ink">Axtarış</Text>
      <Text className="text-center text-ink-secondary">
        Restoran və yemək axtarışı növbəti mərhələdə əlavə olunacaq.
      </Text>
    </Screen>
  );
}
