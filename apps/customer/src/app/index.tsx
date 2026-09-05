import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useDefaultAddress } from '@/features/addresses/use-default-address';
import { useAuth } from '@/features/auth/auth-provider';

export default function Index() {
  const { user } = useAuth();
  const { data: address, isLoading: addressLoading } = useDefaultAddress();

  if (!user) {
    return <Redirect href="/(auth)/welcome" />;
  }

  if (addressLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator color="#00C2E8" />
      </View>
    );
  }

  if (!address) {
    return <Redirect href="/(onboarding)/location-permission" />;
  }

  return <Redirect href="/(tabs)" />;
}
