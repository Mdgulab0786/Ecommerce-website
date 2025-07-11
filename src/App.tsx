import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import { useAuthStore } from './store/authStore';
import { useCartStore } from './store/cartStore';
import { useWishlistStore } from './store/wishlistStore';
import { auth } from './lib/supabase';

function App() {
  const { setUser, setLoading } = useAuthStore();
  const { fetchCart } = useCartStore();
  const { fetchWishlist } = useWishlistStore();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      setLoading(true);
      try {
        const { user } = await auth.getCurrentUser();
        if (user) {
          const userData = {
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name || '',
            avatar_url: user.user_metadata?.avatar_url,
            phone: user.user_metadata?.phone,
            role: user.user_metadata?.role || 'customer',
            created_at: user.created_at,
            updated_at: user.updated_at || user.created_at,
          };
          setUser(userData);
          
          // Fetch user's cart and wishlist
          await Promise.all([
            fetchCart(user.id),
            fetchWishlist(user.id)
          ]);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [setUser, setLoading, fetchCart, fetchWishlist]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<Categories />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Dashboard />} />
            <Route path="/orders" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;