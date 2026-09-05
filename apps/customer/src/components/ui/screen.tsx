import { KeyboardAvoidingView, Platform, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Screen({ className, children, ...rest }: ViewProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className={`flex-1 px-6 ${className ?? ''}`} {...rest}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
