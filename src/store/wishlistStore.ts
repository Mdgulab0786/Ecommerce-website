import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem } from '../types';
import { db } from '../lib/supabase';
import toast from 'react-hot-toast';

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  fetchWishlist: (userId: string) => Promise<void>;
  addItem: (userId: string, productId: string) => Promise<void>;
  removeItem: (userId: string, productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      fetchWishlist: async (userId: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await db.getWishlist(userId);
          if (error) throw error;
          set({ items: data || [], isLoading: false });
        } catch (error) {
          console.error('Error fetching wishlist:', error);
          set({ isLoading: false });
        }
      },

      addItem: async (userId: string, productId: string) => {
        try {
          const { error } = await db.addToWishlist(userId, productId);
          if (error) throw error;
          await get().fetchWishlist(userId);
          toast.success('Added to wishlist');
        } catch (error) {
          console.error('Error adding to wishlist:', error);
          toast.error('Failed to add to wishlist');
        }
      },

      removeItem: async (userId: string, productId: string) => {
        try {
          const { error } = await db.removeFromWishlist(userId, productId);
          if (error) throw error;
          const items = get().items.filter(item => item.product_id !== productId);
          set({ items });
          toast.success('Removed from wishlist');
        } catch (error) {
          console.error('Error removing from wishlist:', error);
          toast.error('Failed to remove from wishlist');
        }
      },

      isInWishlist: (productId: string) => {
        return get().items.some(item => item.product_id === productId);
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);