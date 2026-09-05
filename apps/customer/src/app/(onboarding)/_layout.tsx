import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="location-permission" />
      <Stack.Screen name="address-confirm" />
      <Stack.Screen name="address-manual-entry" />
    </Stack>
  );
}
