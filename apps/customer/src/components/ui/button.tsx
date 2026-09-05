import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

type ButtonProps = PressableProps & {
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ label, loading, variant = 'primary', disabled, className, ...rest }: ButtonProps) {
  const isDisabled = disabled || loading;

  const base = 'h-14 items-center justify-center rounded-pill px-6';
  const variants = {
    primary: 'bg-brand active:bg-brand-dark',
    secondary: 'bg-surface-alt active:bg-surface-selected',
    ghost: 'bg-transparent',
  } as const;
  const textVariants = {
    primary: 'text-white',
    secondary: 'text-ink',
    ghost: 'text-brand',
  } as const;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      className={`${base} ${variants[variant]} ${isDisabled ? 'opacity-50' : ''} ${className ?? ''}`}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#00C2E8'} />
      ) : (
        <Text className={`text-base font-semibold ${textVariants[variant]}`}>{label}</Text>
      )}
    </Pressable>
  );
}
