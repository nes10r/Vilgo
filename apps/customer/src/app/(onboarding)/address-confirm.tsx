import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { createAddress } from '@/features/addresses/api';
import { useAuth } from '@/features/auth/auth-provider';

export default function AddressConfirmScreen() {
  const params = useLocalSearchParams<{ lat: string; lng: string; line1: string; city: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [label, setLabel] = useState('Ev');
  const [line1, setLine1] = useState(params.line1 ?? '');
  const [city, setCity] = useState(params.city ?? '');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!user) return;
    setLoading(true);
    try {
      await createAddress({
        userId: user.id,
        label,
        line1,
        city: city || null,
        lat: Number(params.lat),
        lng: Number(params.lng),
        deliveryInstructions: instructions || undefined,
      });
      await queryClient.invalidateQueries({ queryKey: ['default-address', user.id] });
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Xəta', error instanceof Error ? error.message : 'Ünvan yadda saxlanılmadı.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen className="justify-center gap-6">
      <View className="gap-1">
        <Text className="text-3xl font-bold text-ink">Ünvanı təsdiqlə</Text>
        <Text className="text-base text-ink-secondary">Lazım gələrsə düzəliş edə bilərsən</Text>
      </View>

      <View className="gap-4">
        <TextField label="Etiket (Ev, İş və s.)" value={label} onChangeText={setLabel} />
        <TextField label="Küçə, ev/bina" value={line1} onChangeText={setLine1} />
        <TextField label="Şəhər" value={city} onChangeText={setCity} />
        <TextField
          label="Çatdırılma qeydi (istəyə bağlı)"
          value={instructions}
          onChangeText={setInstructions}
        />
      </View>

      <Button
        label="Təsdiqlə və davam et"
        onPress={handleConfirm}
        loading={loading}
        disabled={!line1}
      />
    </Screen>
  );
}
