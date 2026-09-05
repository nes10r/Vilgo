import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Pressable, Text, View } from 'react-native';

import { formatMoney } from '@/lib/format';
import type { ItemOptionGroupWithOptions } from '@/features/menu/types';

type OptionGroupProps = {
  group: ItemOptionGroupWithOptions;
  selectedIds: string[];
  onToggle: (optionId: string) => void;
};

export function OptionGroup({ group, selectedIds, onToggle }: OptionGroupProps) {
  const isMultiple = group.selection_type === 'multiple';
  const atMax = isMultiple && selectedIds.length >= group.max_select;

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-2">
        <Text className="text-base font-semibold text-ink">{group.name}</Text>
        {group.is_required && (
          <Text className="rounded-pill bg-surface-alt px-2 py-0.5 text-xs text-ink-secondary">
            Məcburi
          </Text>
        )}
      </View>

      <View className="gap-2">
        {group.options.map((option) => {
          const selected = selectedIds.includes(option.id);
          const disabled = !selected && atMax;

          return (
            <Pressable
              key={option.id}
              onPress={() => onToggle(option.id)}
              disabled={disabled}
              className={`flex-row items-center justify-between rounded-2xl bg-surface-alt px-4 py-3 ${
                disabled ? 'opacity-40' : ''
              }`}
              accessibilityRole="button">
              <Text className="text-base text-ink">{option.name}</Text>
              <View className="flex-row items-center gap-3">
                {option.price_delta_cents > 0 && (
                  <Text className="text-sm text-ink-secondary">
                    +{formatMoney(option.price_delta_cents)}
                  </Text>
                )}
                <Ionicons
                  name={
                    selected
                      ? isMultiple
                        ? 'checkbox'
                        : 'radio-button-on'
                      : isMultiple
                        ? 'square-outline'
                        : 'radio-button-off'
                  }
                  size={22}
                  color={selected ? '#00C2E8' : '#9AA0A8'}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
