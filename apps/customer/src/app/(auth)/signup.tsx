import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { signUpWithEmail } from '@/features/auth/api';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    try {
      await signUpWithEmail(email.trim(), password, fullName.trim());
      Alert.alert(
        'Hesab yaradıldı',
        'E-poçtunu təsdiqlədikdən sonra daxil ola bilərsən.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }],
      );
    } catch (error) {
      Alert.alert('Qeydiyyat xətası', error instanceof Error ? error.message : 'Yenidən cəhd edin.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen className="justify-center gap-6">
      <View className="gap-1">
        <Text className="text-3xl font-bold text-ink">Hesab yarat</Text>
        <Text className="text-base text-ink-secondary">Bir neçə addımda sifarişə başla</Text>
      </View>

      <View className="gap-4">
        <TextField label="Ad Soyad" value={fullName} onChangeText={setFullName} autoComplete="name" />
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
          autoComplete="password-new"
        />
      </View>

      <Button
        label="Qeydiyyatdan keç"
        onPress={handleSignup}
        loading={loading}
        disabled={!email || !password || !fullName}
      />

      <Link href="/(auth)/login" className="self-center text-sm text-ink-secondary">
        Artıq hesabın var? <Text className="text-brand-dark">Daxil ol</Text>
      </Link>
    </Screen>
  );
}
