import { Text, TextInput, View, type TextInputProps } from 'react-native';

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export function TextField({ label, error, className, ...rest }: TextFieldProps) {
  return (
    <View className="gap-1.5">
      <Text className="text-sm font-medium text-ink-secondary">{label}</Text>
      <TextInput
        placeholderTextColor="#9AA0A8"
        className={`h-14 rounded-2xl border px-4 text-base text-ink ${
          error ? 'border-danger' : 'border-transparent bg-surface-alt'
        } ${className ?? ''}`}
        {...rest}
      />
      {error ? <Text className="text-sm text-danger">{error}</Text> : null}
    </View>
  );
}
