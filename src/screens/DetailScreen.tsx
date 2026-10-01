import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import Watermark from '../components/Watermark';
import {STALE_TIME_MS, STUDENT, VARIANT} from '../constants/student';
import {colors, spacing} from '../constants/theme';
import {getProduct, type Product} from '../services/productApi';
import {formatVnd, productVnd, useCartStore} from '../stores/cartStore';

type Props = {
  id: string;
  onBack: () => void;
};

function triggerAddHaptic() {
  Vibration.vibrate(VARIANT.hapticOnAdd === 'impact' ? 35 : 12);
}

export default function DetailScreen({id, onBack}: Props) {
  const add = useCartStore(state => state.add);
  const {data, isPending, isError, refetch} = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    staleTime: STALE_TIME_MS,
  });

  const handleAddToCart = async (product: Product) => {
    add(product);
    await triggerAddHaptic();
    Alert.alert(
      'Thành công',
      `Đã thêm vào giỏ hàng!\nMSSV: ${STUDENT.mssv}`,
    );
  };

  return (
    <Watermark>
      {isPending ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.muted}>
            Đang tải chi tiết món · {STUDENT.mssv}
          </Text>
        </View>
      ) : isError || !data ? (
        <View style={styles.center}>
          <Text style={styles.error}>Lỗi tải dữ liệu · {STUDENT.mssv}</Text>
          <Pressable style={styles.button} onPress={() => refetch()}>
            <Text style={styles.buttonText}>Thử lại</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Text style={styles.backText}>Quay lai</Text>
          </Pressable>
          <View style={styles.card}>
            <Image source={{uri: data.image}} style={styles.image} />
            <Text style={styles.category}>{data.category}</Text>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.price}>{formatVnd(productVnd(data.price))}</Text>
            {data.rating && (
              <Text style={styles.rating}>
                ⭐ {data.rating.rate} / 5.0 ({data.rating.count} đánh giá)
              </Text>
            )}
            <Text style={styles.sectionHeading}>Mô tả món hàng</Text>
            <Text style={styles.description}>{data.description}</Text>
            <Pressable
              style={styles.button}
              onPress={() => handleAddToCart(data)}>
              <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </Watermark>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  backText: {
    color: colors.primary,
    fontWeight: '900',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'contain',
    marginBottom: spacing.md,
  },
  category: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
    marginTop: spacing.xs,
  },
  price: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  rating: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  sectionHeading: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textLight,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '900',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  muted: {
    color: colors.textLight,
    marginTop: spacing.md,
    fontWeight: '700',
  },
  error: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
});
