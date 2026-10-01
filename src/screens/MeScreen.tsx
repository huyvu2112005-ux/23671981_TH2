import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import Watermark from '../components/Watermark';
import {
  BASE_SHIP_FEE,
  ROOM_LABEL,
  STUDENT,
  STUDENT_LINE,
  VARIANT,
} from '../constants/student';
import {colors, spacing} from '../constants/theme';
import {useCampusLocation} from '../hooks/useCampusLocation';
import {useAuthStore} from '../stores/authStore';
import {formatVnd} from '../stores/cartStore';

export default function MeScreen() {
  const logout = useAuthStore(state => state.logout);
  const {status, km, fee, message, requestLocation, openSettings} =
    useCampusLocation();

  return (
    <Watermark>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Tôi</Text>

        <View style={styles.card}>
          <Text style={styles.name}>{STUDENT.hoTen}</Text>
          <Text style={styles.mssv}>{STUDENT_LINE}</Text>
          <View style={styles.divider} />
          <Text style={styles.line}>Phòng giao: <Text style={styles.highlight}>{ROOM_LABEL}</Text></Text>
          <Text style={styles.line}>
            Công thức phí: <Text style={styles.highlight}>Công thức {VARIANT.shipFormula}</Text> · Base {formatVnd(BASE_SHIP_FEE)}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Vị trí & Ước tính ship KTX</Text>
          <Text style={styles.status}>Trạng thái: <Text style={styles.statusValue}>{message}</Text></Text>
          <Text style={styles.line}>
            Khoảng cách: {km === null ? 'Chưa có' : `${km.toFixed(2)} km`}
          </Text>
          <Text style={styles.fee}>
            Phí ship KTX: {fee === null ? 'Chưa có vị trí' : formatVnd(fee)}
          </Text>

          <Pressable style={styles.button} onPress={requestLocation}>
            <Text style={styles.buttonText}>Xin quyền Location</Text>
          </Pressable>

          {status === 'blocked' && (
            <Pressable style={styles.secondaryButton} onPress={openSettings}>
              <Text style={styles.secondaryText}>Mở cài đặt thiết bị</Text>
            </Pressable>
          )}
        </View>

        <Pressable style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </ScrollView>
    </Watermark>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  heading: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  mssv: {
    color: colors.textLight,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  section: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  line: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  highlight: {
    color: colors.text,
    fontWeight: '800',
  },
  status: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  statusValue: {
    color: colors.text,
    fontWeight: '800',
  },
  fee: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  button: {
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  buttonText: {
    color: colors.surface,
    fontWeight: '900',
    fontSize: 15,
  },
  secondaryButton: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  secondaryText: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 14,
  },
  logout: {
    height: 46,
    borderRadius: 8,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  logoutText: {
    color: colors.surface,
    fontWeight: '900',
    fontSize: 15,
  },
});
