import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { formatMoney } from '@/lib/format';
import type { MenuItem } from '@/types/supabase';

type MenuItemRowProps = {
  item: MenuItem;
  onPress: () => void;
};

export function MenuItemRow({ item, onPress }: MenuItemRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 py-3 ${item.is_available ? '' : 'opacity-50'}`}
      accessibilityRole="button">
      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Text numberOfLines={1} className="flex-1 text-base font-medium text-ink">
            {item.name}
          </Text>
          {!item.is_available && (
            <Text className="rounded-pill bg-surface-alt px-2 py-0.5 text-xs text-ink-secondary">
              Bitib
            </Text>
          )}
        </View>
        {item.description ? (
          <Text numberOfLines={1} className="text-sm text-ink-secondary">
            {item.description}
          </Text>
        ) : null}
        <Text className="text-sm font-medium text-ink">{formatMoney(item.price_cents)}</Text>
      </View>
      {item.image_url ? (
        <Image
          source={{ uri: item.image_url }}
          contentFit="cover"
          className="h-20 w-20 rounded-card bg-surface-alt"
        />
      ) : null}
    </Pressable>
  );
}
