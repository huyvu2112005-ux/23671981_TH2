import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import MeScreen from '../screens/MeScreen';
import {VARIANT} from '../constants/student';
import {colors} from '../constants/theme';
import {useCartStore} from '../stores/cartStore';

type TabKey = 'shop' | 'cart' | 'me';

export default function MainTabs() {
  const [tab, setTab] = useState<TabKey>(
    VARIANT.tabOrder === 'cartFirst' ? 'cart' : 'shop',
  );
  const [detailId, setDetailId] = useState<string | null>(null);
  const totalQuantity = useCartStore(state => state.totalQuantity());

  const tabs: {key: TabKey; label: string}[] =
    VARIANT.tabOrder === 'cartFirst'
      ? [
          {key: 'cart', label: 'Gio'},
          {key: 'shop', label: 'Cua hang'},
          {key: 'me', label: 'Toi'},
        ]
      : [
          {key: 'shop', label: 'Cua hang'},
          {key: 'cart', label: 'Gio'},
          {key: 'me', label: 'Toi'},
        ];

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {tab === 'shop' && detailId === null ? (
          <HomeScreen onOpenDetail={setDetailId} />
        ) : tab === 'shop' && detailId !== null ? (
          <DetailScreen id={detailId} onBack={() => setDetailId(null)} />
        ) : tab === 'cart' ? (
          <CartScreen />
        ) : (
          <MeScreen />
        )}
      </View>
      <View style={styles.tabBar}>
        {tabs.map(item => {
          const active = tab === item.key;
          const badge = item.key === 'cart' && totalQuantity > 0;
          return (
            <Pressable
              key={item.key}
              style={styles.tabButton}
              onPress={() => {
                setTab(item.key);
                if (item.key !== 'shop') {
                  setDetailId(null);
                }
              }}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {item.label}
              </Text>
              {badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalQuantity}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    height: 64,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: '800',
  },
  tabTextActive: {
    color: colors.primary,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 32,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '900',
  },
});
