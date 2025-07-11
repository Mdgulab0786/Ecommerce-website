import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Edit, Plus, CreditCard, Truck, Package } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import PaymentMethods from '../components/checkout/PaymentMethods';
import toast from 'react-hot-toast';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { items, totalAmount, clearCart } = useCartStore();
  
  const [selectedAddress, setSelectedAddress] = useState<string>('1');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock addresses - in real app, fetch from user's saved addresses
  const addresses = [
    {
      id: '1',
      type: 'home' as const,
      full_name: 'John Doe',
      phone: '+91 9876543210',
      address_line_1: '123 Main Street',
      address_line_2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      postal_code: '400001',
      country: 'India',
      is_default: true,
    },
    {
      id: '2',
      type: 'work' as const,
      full_name: 'John Doe',
      phone: '+91 9876543210',
      address_line_1: '456 Business Park',
      address_line_2: 'Floor 5, Office 501',
      city: 'Mumbai',
      state: 'Maharashtra',
      postal_code: '400002',
      country: 'India',
      is_default: false,
    },
  ];

  const shippingCost = totalAmount > 500 ? 0 : 50;
  const taxAmount = totalAmount * 0.18; // 18% GST
  const finalTotal = totalAmount + shippingCost + taxAmount;

  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !user) {
      navigate('/auth');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order object
      const orderData = {
        user_id: user.id,
        order_number: `ORD-${Date.now()}`,
        status: 'confirmed',
        payment_status: 'paid',
        payment_method: paymentMethod,
        subtotal: totalAmount,
        tax_amount: taxAmount,
        shipping_amount: shippingCost,
        discount_amount: 0,
        total_amount: finalTotal,
        currency: 'INR',
        shipping_address: addresses.find(addr => addr.id === selectedAddress),
        billing_address: addresses.find(addr => addr.id === selectedAddress),
        items: items.map(item => ({
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          price: item.product?.price || 0,
          total: (item.product?.price || 0) * item.quantity,
        })),
      };

      // Clear cart after successful order
      clearCart();
      
      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { state: { orderData } });
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to your cart to proceed with checkout</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Address
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Address
                </button>
              </div>

              <div className="space-y-3">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="sr-only"
                    />
                    
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{address.full_name}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded uppercase">
                            {address.type}
                          </span>
                          {address.is_default && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {address.address_line_1}
                          {address.address_line_2 && `, ${address.address_line_2}`}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                        <p className="text-gray-600 text-sm">{address.phone}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <PaymentMethods 
                selectedMethod={paymentMethod} 
                onMethodChange={setPaymentMethod} 
              />
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                    <img
                      src={item.product?.images?.[0]?.url || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product?.name}</h4>
                      {item.variant && (
                        <p className="text-sm text-gray-600">
                          Variant: {Object.values(item.variant.options).join(', ')}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{((item.variant?.price || item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-green-600">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>Free delivery on orders over ₹500</span>
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Secure payment guaranteed</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : `Place Order - ₹${finalTotal.toFixed(2)}`}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                By placing your order, you agree to our Terms & Conditions and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;