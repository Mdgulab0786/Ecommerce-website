import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Edit,
  Plus,
  Trash2,
  Eye
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { motion } from 'framer-motion';
import ProductCard from '../components/common/ProductCard';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const { items: cartItems, removeItem: removeFromCart, updateItem: updateCartItem } = useCartStore();
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses' | 'settings'>('profile');

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: 3,
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 149.99,
      items: 1,
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 89.99,
      items: 2,
      trackingNumber: null
    }
  ];

  const mockAddresses = [
    {
      id: '1',
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: '2',
      type: 'Office',
      name: 'John Doe',
      address: '456 Business Park, Floor 5',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      phone: '+91 9876543210',
      isDefault: false
    }
  ];

  const sidebarItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              {/* User Info */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{user?.full_name || 'User'}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1 sm:space-y-2">
                {sidebarItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-colors text-sm sm:text-base ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                
                <button
                  onClick={signOut}
                  className="w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors text-sm sm:text-base"
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Information</h2>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base">
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Edit Profile</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user?.full_name || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={user?.phone || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Member Since</label>
                      <input
                        type="text"
                        value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">My Orders</h2>
                  
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 space-y-2 sm:space-y-0">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Order #{order.id}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm mb-3">
                          <div>
                            <span className="text-gray-600">Total Amount:</span>
                            <span className="font-medium ml-2">₹{order.total}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Items:</span>
                            <span className="font-medium ml-2">{order.items}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Tracking:</span>
                            <span className="font-medium ml-2">{order.trackingNumber || 'N/A'}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>View Details</span>
                          </button>
                          {order.trackingNumber && (
                            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm">
                              <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>Track Order</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">My Wishlist</h2>
                  
                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="relative">
                          <ProductCard product={item.product!} />
                          <button
                            onClick={() => user && removeFromWishlist(user.id, item.product_id)}
                            className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                      <p className="text-sm sm:text-base text-gray-600">Save items you love to your wishlist</p>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base">
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Add Address</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {mockAddresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{address.name}</h3>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded uppercase">
                                {address.type}
                              </span>
                              {address.isDefault && (
                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm">{address.address}</p>
                            <p className="text-gray-600 text-xs sm:text-sm">{address.city}, {address.state} {address.pincode}</p>
                            <p className="text-gray-600 text-xs sm:text-sm">{address.phone}</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                          <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                          <button className="text-sm text-red-600 hover:text-red-700">Delete</button>
                          {!address.isDefault && (
                            <button className="text-sm text-green-600 hover:text-green-700">Set as Default</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Account Settings</h2>
                  
                  <div className="space-y-4 sm:space-y-6">
                    {/* Notifications */}
                    <div className="border-b border-gray-200 pb-4 sm:pb-6">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <Bell className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Notifications
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm sm:text-base">
                          <span className="text-gray-700">Email notifications</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </label>
                        <label className="flex items-center justify-between text-sm sm:text-base">
                          <span className="text-gray-700">SMS notifications</span>
                          <input type="checkbox" className="toggle" />
                        </label>
                        <label className="flex items-center justify-between text-sm sm:text-base">
                          <span className="text-gray-700">Order updates</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </label>
                      </div>
                    </div>

                    {/* Security */}
                    <div className="border-b border-gray-200 pb-4 sm:pb-6">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Security
                      </h3>
                      <div className="space-y-3">
                        <button className="w-full text-left p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm sm:text-base">
                          Change Password
                        </button>
                        <button className="w-full text-left p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm sm:text-base">
                          Two-Factor Authentication
                        </button>
                        <button className="w-full text-left p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm sm:text-base">
                          Login History
                        </button>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Payment Methods
                      </h3>
                      <div className="space-y-3">
                        <div className="p-2 sm:p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                              <div>
                                <p className="font-medium text-sm sm:text-base">**** **** **** 1234</p>
                                <p className="text-xs sm:text-sm text-gray-600">Expires 12/25</p>
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm">Edit</button>
                          </div>
                        </div>
                        <button className="w-full p-2 sm:p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 text-sm sm:text-base">
                          + Add Payment Method
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;