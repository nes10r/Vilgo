import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { signOut } from '@/features/auth/api';
import { useAuth } from '@/features/auth/auth-provider';

export default function ProfileScreen() {
  const { user } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.replace('/(auth)/welcome');
  }

  return (
    <Screen className="gap-6 pt-6">
      <View className="gap-1">
        <Text className="text-2xl font-bold text-ink">
          {user?.user_metadata?.full_name ?? 'Profil'}
        </Text>
        <Text className="text-ink-secondary">{user?.email}</Text>
      </View>

      <Button label="Çıxış et" variant="secondary" onPress={handleSignOut} />
    </Screen>
  );
}
