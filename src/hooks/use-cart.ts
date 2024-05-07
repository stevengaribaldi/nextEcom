import { Product } from '@/payload-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type CartItem = {
  id: string;
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => ({
          items: [...state.items, { id: uuidv4(), product }],
        })),
      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== cartItemId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
