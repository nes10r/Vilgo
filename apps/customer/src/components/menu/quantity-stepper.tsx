import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type QuantityStepperProps = {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
};

export function QuantityStepper({ quantity, onChange, min = 1 }: QuantityStepperProps) {
  return (
    <View className="flex-row items-center gap-4 rounded-pill bg-surface-alt px-2 py-2">
      <Pressable
        onPress={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className={quantity <= min ? 'opacity-30' : ''}
        accessibilityRole="button">
        <Ionicons name="remove-circle" size={28} color="#00C2E8" />
      </Pressable>
      <Text className="min-w-6 text-center text-base font-semibold text-ink">{quantity}</Text>
      <Pressable onPress={() => onChange(quantity + 1)} accessibilityRole="button">
        <Ionicons name="add-circle" size={28} color="#00C2E8" />
      </Pressable>
    </View>
  );
}
