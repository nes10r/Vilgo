import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { sendPasswordReset } from '@/features/auth/api';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      Alert.alert('Göndərildi', 'Şifrəni bərpa etmək üçün e-poçtuna keçid göndərdik.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Xəta', error instanceof Error ? error.message : 'Yenidən cəhd edin.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen className="justify-center gap-6">
      <View className="gap-1">
        <Text className="text-3xl font-bold text-ink">Şifrəni bərpa et</Text>
        <Text className="text-base text-ink-secondary">
          Qeydiyyat zamanı istifadə etdiyin e-poçtu daxil et
        </Text>
      </View>

      <TextField
        label="E-poçt"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />

      <Button label="Keçid göndər" onPress={handleReset} loading={loading} disabled={!email} />
    </Screen>
  );
}
