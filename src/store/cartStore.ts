import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';
import { db } from '../lib/supabase';
import toast from 'react-hot-toast';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  totalItems: number;
  totalAmount: number;
  fetchCart: (userId: string) => Promise<void>;
  addItem: (userId: string, productId: string, variantId?: string, quantity?: number) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      totalItems: 0,
      totalAmount: 0,

      fetchCart: async (userId: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await db.getCart(userId);
          if (error) throw error;
          set({ items: data || [], isLoading: false });
          get().calculateTotals();
        } catch (error) {
          console.error('Error fetching cart:', error);
          set({ isLoading: false });
          toast.error('Failed to load cart');
        }
      },

      addItem: async (userId: string, productId: string, variantId?: string, quantity = 1) => {
        try {
          const { error } = await db.addToCart(userId, productId, variantId, quantity);
          if (error) throw error;
          await get().fetchCart(userId);
          toast.success('Item added to cart');
        } catch (error) {
          console.error('Error adding to cart:', error);
          toast.error('Failed to add item to cart');
        }
      },

      updateItem: async (id: string, quantity: number) => {
        try {
          const { error } = await db.updateCartItem(id, quantity);
          if (error) throw error;
          const items = get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          );
          set({ items });
          get().calculateTotals();
          toast.success('Cart updated');
        } catch (error) {
          console.error('Error updating cart:', error);
          toast.error('Failed to update cart');
        }
      },

      removeItem: async (id: string) => {
        try {
          const { error } = await db.removeFromCart(id);
          if (error) throw error;
          const items = get().items.filter(item => item.id !== id);
          set({ items });
          get().calculateTotals();
          toast.success('Item removed from cart');
        } catch (error) {
          console.error('Error removing from cart:', error);
          toast.error('Failed to remove item');
        }
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalAmount: 0 });
      },

      calculateTotals: () => {
        const { items } = get();
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = items.reduce((sum, item) => {
          const price = item.variant?.price || item.product?.price || 0;
          return sum + (price * item.quantity);
        }, 0);
        set({ totalItems, totalAmount });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, totalItems: state.totalItems, totalAmount: state.totalAmount }),
    }
  )
);