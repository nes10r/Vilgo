import { router } from 'expo-router';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';

export default function LocationPermissionScreen() {
  const [loading, setLoading] = useState(false);

  async function handleShareLocation() {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        router.push('/(onboarding)/address-manual-entry');
        return;
      }

      const position = await Location.getCurrentPositionAsync({});
      const [place] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      const line1 = [place?.streetNumber, place?.street].filter(Boolean).join(' ') || place?.name || '';

      router.push({
        pathname: '/(onboarding)/address-confirm',
        params: {
          lat: String(position.coords.latitude),
          lng: String(position.coords.longitude),
          line1,
          city: place?.city ?? '',
        },
      });
    } catch {
      Alert.alert('Xəta', 'Məkan alınmadı. Ünvanı əl ilə daxil edə bilərsən.');
      router.push('/(onboarding)/address-manual-entry');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen className="justify-between py-10">
      <View className="mt-16 gap-3">
        <Text className="text-3xl font-bold text-ink">Ünvanını təyin et</Text>
        <Text className="text-base text-ink-secondary">
          Ən yaxın restoranları göstərmək və sifarişini dəqiq ünvana çatdırmaq üçün məkanına
          ehtiyacımız var.
        </Text>
      </View>

      <View className="gap-3">
        <Button label="Məkanımı paylaş" onPress={handleShareLocation} loading={loading} />
        <Button
          label="Ünvanı əl ilə daxil et"
          variant="secondary"
          onPress={() => router.push('/(onboarding)/address-manual-entry')}
        />
      </View>
    </Screen>
  );
}
