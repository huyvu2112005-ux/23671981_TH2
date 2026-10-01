import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {PRICE_MULTIPLIER, STUDENT} from '../constants/student';
import type {Product} from '../services/productApi';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  shippingFee: number | null;
  add: (product: Product) => void;
  remove: (id: number) => void;
  changeQty: (id: number, qty: number) => void;
  setShippingFee: (fee: number | null) => void;
  totalQuantity: () => number;
  totalAmount: () => number;
};

export function productVnd(price: number): number {
  return Math.round(price * PRICE_MULTIPLIER);
}

export const formatVnd = (amount: number): string =>
  `${amount.toLocaleString('vi-VN')} đ`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shippingFee: null,
      add: product =>
        set(state => {
          const existed = state.items.find(item => item.id === product.id);
          if (existed) {
            return {
              items: state.items.map(item =>
                item.id === product.id ? {...item, qty: item.qty + 1} : item,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                qty: 1,
              },
            ],
          };
        }),
      remove: id =>
        set(state => ({items: state.items.filter(item => item.id !== id)})),
      changeQty: (id, qty) =>
        set(state => ({
          items:
            qty <= 0
              ? state.items.filter(item => item.id !== id)
              : state.items.map(item =>
                  item.id === id ? {...item, qty} : item,
                ),
        })),
      setShippingFee: fee => set({shippingFee: fee}),
      totalQuantity: () =>
        get().items.reduce((total, item) => total + item.qty, 0),
      totalAmount: () =>
        get().items.reduce(
          (total, item) => total + productVnd(item.price) * item.qty,
          0,
        ),
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
