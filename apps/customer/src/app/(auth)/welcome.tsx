import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';

export default function WelcomeScreen() {
  return (
    <Screen className="justify-between py-10">
      <View className="mt-16 gap-3">
        <Text className="text-4xl font-bold text-ink">Vilgo</Text>
        <Text className="text-lg text-ink-secondary">
          Sevdiyin restoranlardan sifariş ver, qapına qədər sürətlə çatdırılsın.
        </Text>
      </View>

      <View className="gap-3">
        <Link href="/(auth)/signup" asChild>
          <Button label="Qeydiyyatdan keç" />
        </Link>
        <Link href="/(auth)/login" asChild>
          <Button label="Daxil ol" variant="secondary" />
        </Link>
      </View>
    </Screen>
  );
}
