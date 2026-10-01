import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Watermark from '../components/Watermark';
import {ROOM_LABEL} from '../constants/student';
import {colors, spacing} from '../constants/theme';
import {
  CartItem,
  formatVnd,
  productVnd,
  useCartStore,
} from '../stores/cartStore';

function CartRow({item}: {item: CartItem}) {
  const changeQty = useCartStore(state => state.changeQty);
  const remove = useCartStore(state => state.remove);

  return (
    <View style={styles.row}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>
          {formatVnd(productVnd(item.price))}
        </Text>
        <View style={styles.actions}>
          <View style={styles.qtyControl}>
            <Pressable
              style={styles.qtyButton}
              onPress={() => changeQty(item.id, item.qty - 1)}
              hitSlop={6}>
              <Text style={styles.qtyText}>-</Text>
            </Pressable>
            <Text style={styles.qtyValue}>{item.qty}</Text>
            <Pressable
              style={styles.qtyButton}
              onPress={() => changeQty(item.id, item.qty + 1)}
              hitSlop={6}>
              <Text style={styles.qtyText}>+</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.remove}
            onPress={() => remove(item.id)}
            hitSlop={6}>
            <Text style={styles.removeText}>Xóa</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function CartScreen() {
  const items = useCartStore(state => state.items);
  const totalAmount = useCartStore(state => state.totalAmount());
  const shippingFee = useCartStore(state => state.shippingFee);
  const totalPay = totalAmount + (shippingFee ?? 0);

  return (
    <Watermark>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Giỏ hàng</Text>
          <Text style={styles.room}>Phòng giao: {ROOM_LABEL}</Text>
        </View>

        <FlatList
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => <CartRow item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🛒</Text>
              <Text style={styles.empty}>Giỏ hàng đang trống</Text>
              <Text style={styles.emptySub}>
                Hãy chọn các món yêu thích tại tab Cửa hàng
              </Text>
            </View>
          }
          contentContainerStyle={styles.list}
        />

        <View style={styles.summary}>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Tạm tính ({items.reduce((acc, it) => acc + it.qty, 0)} món):</Text>
            <Text style={styles.summaryValue}>{formatVnd(totalAmount)}</Text>
          </View>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Phí ship KTX:</Text>
            <Text style={styles.shipValue}>
              {shippingFee === null
                ? 'Chưa có vị trí (vào tab Tôi)'
                : formatVnd(shippingFee)}
            </Text>
          </View>
          <View style={[styles.summaryLine, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalValue}>{formatVnd(totalPay)}</Text>
          </View>
        </View>
      </View>
    </Watermark>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  heading: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
  },
  room: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  list: {
    paddingVertical: spacing.xs,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  price: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 14,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
  },
  qtyText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  qtyValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    marginHorizontal: spacing.sm,
    minWidth: 18,
    textAlign: 'center',
  },
  remove: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  removeText: {
    color: colors.error,
    fontWeight: '900',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  empty: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptySub: {
    color: colors.textLight,
    fontSize: 13,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  summary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.xs,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    color: colors.textLight,
    fontWeight: '700',
    fontSize: 13,
  },
  summaryValue: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 14,
  },
  shipValue: {
    color: colors.secondary,
    fontWeight: '900',
    fontSize: 13,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
    marginTop: spacing.xs,
    marginBottom: 0,
  },
  totalLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  totalValue: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
});
