import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';

export default function AddressManualEntryScreen() {
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    setLoading(true);
    try {
      const [result] = await Location.geocodeAsync(`${line1}, ${city}`);
      if (!result) {
        Alert.alert('Ünvan tapılmadı', 'Ünvanı daha dəqiq yaz və yenidən cəhd et.');
        return;
      }

      router.push({
        pathname: '/(onboarding)/address-confirm',
        params: {
          lat: String(result.latitude),
          lng: String(result.longitude),
          line1,
          city,
        },
      });
    } catch {
      Alert.alert('Xəta', 'Ünvan yoxlanılarkən xəta baş verdi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen className="justify-center gap-6">
      <View className="gap-1">
        <Text className="text-3xl font-bold text-ink">Ünvanı daxil et</Text>
        <Text className="text-base text-ink-secondary">Küçə, ev/bina və şəhəri qeyd et</Text>
      </View>

      <View className="gap-4">
        <TextField label="Küçə, ev/bina" value={line1} onChangeText={setLine1} />
        <TextField label="Şəhər" value={city} onChangeText={setCity} />
      </View>

      <Button label="Davam et" onPress={handleContinue} loading={loading} disabled={!line1 || !city} />
    </Screen>
  );
}
