import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use placeholder values if environment variables are not set
const defaultUrl = 'https://placeholder.supabase.co';
const defaultKey = 'placeholder-key';

export const supabase = createClient(
  supabaseUrl || defaultUrl,
  supabaseAnonKey || defaultKey
);

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && 
         supabaseUrl !== 'https://your-project.supabase.co' && 
         supabaseAnonKey !== 'your-anon-key-here';
};
// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },
};

// Database helpers
export const db = {
  // Products
  getProducts: async (filters?: any) => {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*)
      `)
      .eq('is_active', true);

    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }
    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters?.brand) {
      query = query.eq('brand', filters.brand);
    }
    if (filters?.rating) {
      query = query.gte('rating', filters.rating);
    }
    if (filters?.inStock) {
      query = query.gt('quantity', 0);
    }

    // Sorting
    switch (filters?.sortBy) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    return await query;
  },

  getProduct: async (slug: string) => {
    return await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*),
        reviews:reviews(*, user:users(*))
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
  },

  searchProducts: async (query: string) => {
    return await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*)
      `)
      .or(`name.ilike.%${query}%, description.ilike.%${query}%, tags.cs.{${query}}`)
      .eq('is_active', true)
      .limit(20);
  },

  // Categories
  getCategories: async () => {
    return await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
  },

  // Cart
  getCart: async (userId: string) => {
    return await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*),
        variant:product_variants(*)
      `)
      .eq('user_id', userId);
  },

  addToCart: async (userId: string, productId: string, variantId?: string, quantity = 1) => {
    return await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        variant_id: variantId,
        quantity,
      });
  },

  updateCartItem: async (id: string, quantity: number) => {
    return await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id);
  },

  removeFromCart: async (id: string) => {
    return await supabase
      .from('cart_items')
      .delete()
      .eq('id', id);
  },

  // Wishlist
  getWishlist: async (userId: string) => {
    return await supabase
      .from('wishlist_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId);
  },

  addToWishlist: async (userId: string, productId: string) => {
    return await supabase
      .from('wishlist_items')
      .insert({
        user_id: userId,
        product_id: productId,
      });
  },

  removeFromWishlist: async (userId: string, productId: string) => {
    return await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
  },

  // Orders
  createOrder: async (orderData: any) => {
    return await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
  },

  getOrders: async (userId: string) => {
    return await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*, product:products(*))
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  getOrder: async (id: string) => {
    return await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*, product:products(*))
      `)
      .eq('id', id)
      .single();
  },

  // Reviews
  addReview: async (reviewData: any) => {
    return await supabase
      .from('reviews')
      .insert(reviewData);
  },

  getProductReviews: async (productId: string) => {
    return await supabase
      .from('reviews')
      .select(`
        *,
        user:users(full_name, avatar_url)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
  },
};