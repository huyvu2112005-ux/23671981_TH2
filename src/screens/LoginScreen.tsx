import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Watermark from '../components/Watermark';
import {STUDENT_LINE, VARIANT} from '../constants/student';
import {colors, spacing} from '../constants/theme';
import {useAuthStore} from '../stores/authStore';

export default function LoginScreen() {
  const login = useAuthStore(state => state.login);
  const [value, setValue] = useState('');
  const label = VARIANT.authField === 'email' ? 'Email' : 'Số điện thoại';

  return (
    <Watermark>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.brand}>KTXGo</Text>
          <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>
          <Text style={styles.student}>{STUDENT_LINE}</Text>

          <Text style={styles.label}>{label}</Text>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={
              VARIANT.authField === 'email'
                ? 'nhap-email@ktxgo.vn'
                : 'Nhập số điện thoại (vd: 0912345678)'
            }
            placeholderTextColor={colors.textLight}
            keyboardType={
              VARIANT.authField === 'email' ? 'email-address' : 'phone-pad'
            }
            autoCapitalize="none"
            style={styles.input}
          />
          <Pressable style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Vào cửa hàng</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Watermark>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  brand: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  student: {
    color: colors.textLight,
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    color: colors.text,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    fontSize: 15,
  },
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '900',
  },
});
