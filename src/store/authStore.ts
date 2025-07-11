import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { auth } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await auth.signIn(email, password);
          if (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
          }
          if (data.user) {
            const user: User = {
              id: data.user.id,
              email: data.user.email!,
              full_name: data.user.user_metadata?.full_name || '',
              avatar_url: data.user.user_metadata?.avatar_url,
              phone: data.user.user_metadata?.phone,
              role: data.user.user_metadata?.role || 'customer',
              created_at: data.user.created_at,
              updated_at: data.user.updated_at || data.user.created_at,
            };
            set({ user, isAuthenticated: true, isLoading: false });
            return { success: true };
          }
          set({ isLoading: false });
          return { success: false, error: 'Authentication failed' };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'An unexpected error occurred' };
        }
      },

      signUp: async (email: string, password: string, userData: any) => {
        set({ isLoading: true });
        try {
          const { data, error } = await auth.signUp(email, password, userData);
          if (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
          }
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'An unexpected error occurred' };
        }
      },

      signOut: async () => {
        set({ isLoading: true });
        await auth.signOut();
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      resetPassword: async (email: string) => {
        try {
          const { error } = await auth.resetPassword(email);
          if (error) {
            return { success: false, error: error.message };
          }
          return { success: true };
        } catch (error) {
          return { success: false, error: 'An unexpected error occurred' };
        }
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);