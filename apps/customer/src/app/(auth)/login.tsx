import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { signInWithEmail } from '@/features/auth/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      await signInWithEmail(email.trim(), password);
      router.replace('/');
    } catch (error) {
      Alert.alert('Daxil olma xətası', error instanceof Error ? error.message : 'Yenidən cəhd edin.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen className="justify-center gap-6">
      <View className="gap-1">
        <Text className="text-3xl font-bold text-ink">Xoş gəldin</Text>
        <Text className="text-base text-ink-secondary">Hesabına daxil ol</Text>
      </View>

      <View className="gap-4">
        <TextField
          label="E-poçt"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextField
          label="Şifrə"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
        <Link href="/(auth)/forgot-password" className="self-end text-sm text-brand-dark">
          Şifrəni unutmusan?
        </Link>
      </View>

      <Button label="Daxil ol" onPress={handleLogin} loading={loading} disabled={!email || !password} />

      <Link href="/(auth)/signup" className="self-center text-sm text-ink-secondary">
        Hesabın yoxdur? <Text className="text-brand-dark">Qeydiyyatdan keç</Text>
      </Link>
    </Screen>
  );
}
