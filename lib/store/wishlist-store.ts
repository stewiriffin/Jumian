import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface WishlistStore {
  items: WishlistProduct[];
  addItem: (product: WishlistProduct) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) return state;
          return { items: [...state.items, product] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      isInWishlist: (productId) => {
        const state = get();
        return state.items.some((item) => item.id === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
