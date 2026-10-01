import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, spacing} from '../constants/theme';
import {formatVnd, productVnd} from '../stores/cartStore';
import type {Product} from '../services/productApi';

type Props = {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
};

export default function ProductCard({product, onPress, onAdd}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatVnd(productVnd(product.price))}</Text>
        <Pressable style={styles.addButton} onPress={onAdd} hitSlop={8}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 240,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    margin: spacing.xs,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 110,
    resizeMode: 'contain',
    marginBottom: spacing.sm,
  },
  title: {
    minHeight: 42,
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  price: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    flex: 1,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    marginLeft: spacing.xs,
  },
  addText: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 24,
  },
});
