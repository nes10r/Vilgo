import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text } from 'react-native';

import { CUISINE_CATEGORIES } from '@/features/restaurants/cuisine-categories';

export function CategoryChipRow() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
      className="py-2">
      {CUISINE_CATEGORIES.map((category) => (
        <Pressable
          key={category.slug}
          onPress={() => router.push(`/category/${category.slug}`)}
          className="items-center gap-1 rounded-card bg-surface-alt px-4 py-3"
          accessibilityRole="button">
          <Ionicons name={category.icon} size={20} color="#0A0A0A" />
          <Text className="text-xs font-medium text-ink">{category.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
