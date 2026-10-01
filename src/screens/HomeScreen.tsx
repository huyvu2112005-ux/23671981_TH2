import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import type {FlashListProps} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import Watermark from '../components/Watermark';
import {
  DEBOUNCE_MS,
  ROOM_LABEL,
  STALE_TIME_MS,
  STUDENT,
  VARIANT,
} from '../constants/student';
import {colors, spacing} from '../constants/theme';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {getProducts, type Product} from '../services/productApi';
import {useCartStore} from '../stores/cartStore';

type Props = {
  onOpenDetail: (id: string) => void;
};

const ProductFlashList = FlashList as React.ComponentType<
  FlashListProps<Product> & {estimatedItemSize: number}
>;

function triggerAddHaptic() {
  Vibration.vibrate(VARIANT.hapticOnAdd === 'impact' ? 35 : 12);
}

export default function HomeScreen({onOpenDetail}: Props) {
  const add = useCartStore(state => state.add);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS);

  const {data, isPending, isError, refetch, isRefetching} = useQuery({
    queryKey: ['products', STUDENT.mssv],
    queryFn: getProducts,
    staleTime: STALE_TIME_MS,
  });

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) {
      return data ?? [];
    }
    return (data ?? []).filter(item =>
      `${item.title} ${item.category}`.toLowerCase().includes(query),
    );
  }, [data, debouncedSearch]);

  const handleAddProduct = async (product: Product) => {
    add(product);
    await triggerAddHaptic();
  };

  return (
    <Watermark>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brand}>KTXGO</Text>
          <Text style={styles.room}>Giao tận {ROOM_LABEL}</Text>
        </View>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Tìm đồ ăn, nước, văn phòng phẩm..."
          placeholderTextColor={colors.textLight}
          style={styles.search}
        />

        {isPending ? (
          <View style={styles.center}>
            <ActivityIndicator color={colors.primary} size="large" />
            <Text style={styles.centerText}>
              Đang tải món · {STUDENT.mssv}
            </Text>
          </View>
        ) : isError ? (
          <View style={styles.center}>
            <Text style={styles.error}>Lỗi mạng · {STUDENT.mssv}</Text>
            <Pressable style={styles.retryButton} onPress={() => refetch()}>
              <Text style={styles.retryText}>Thử lại</Text>
            </Pressable>
          </View>
        ) : (
          <ProductFlashList
            data={filteredProducts}
            numColumns={2}
            estimatedItemSize={260}
            keyExtractor={item => `${STUDENT.mssv}-${item.id}`}
            renderItem={({item}) => (
              <ProductCard
                product={item}
                onPress={() => onOpenDetail(String(item.id))}
                onAdd={() => handleAddProduct(item)}
              />
            )}
            refreshing={isRefetching}
            onRefresh={refetch}
            ListEmptyComponent={
              <Text style={styles.empty}>Không tìm thấy món phù hợp</Text>
            }
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </Watermark>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  brand: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  room: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  search: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  centerText: {
    color: colors.textLight,
    marginTop: spacing.md,
    fontWeight: '700',
    fontSize: 14,
  },
  error: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  retryText: {
    color: colors.surface,
    fontWeight: '900',
    fontSize: 15,
  },
  empty: {
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xl,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
});
