import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, CreditCard, Download, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  if (!orderData) {
    navigate('/');
    return null;
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="border-b pb-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Order #{orderData.order_number}</h2>
                <p className="text-gray-600">Placed on {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">₹{orderData.total_amount.toFixed(2)}</p>
                <p className="text-green-600 font-medium">Paid</p>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Order Status</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-sm font-medium text-green-600">Order Confirmed</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <span className="ml-2 text-sm text-gray-400">Processing</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-gray-400" />
                </div>
                <span className="ml-2 text-sm text-gray-400">Shipped</span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
              <div className="text-gray-600 text-sm">
                <p className="font-medium">{orderData.shipping_address.full_name}</p>
                <p>{orderData.shipping_address.address_line_1}</p>
                {orderData.shipping_address.address_line_2 && (
                  <p>{orderData.shipping_address.address_line_2}</p>
                )}
                <p>{orderData.shipping_address.city}, {orderData.shipping_address.state} {orderData.shipping_address.postal_code}</p>
                <p>{orderData.shipping_address.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
              <p className="text-gray-600 text-sm">
                {estimatedDelivery.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-green-600 text-sm font-medium mt-1">Free delivery</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 text-sm capitalize">{orderData.payment_method}</span>
              <span className="text-green-600 text-sm font-medium">• Paid</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {orderData.items.map((item: any, index: number) => (
              <div key={index} className="flex items-center space-x-4 py-3 border-b last:border-b-0">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Product {index + 1}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{orderData.shipping_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{orderData.tax_amount.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{orderData.total_amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Download Invoice</span>
          </button>
          <button 
            onClick={() => navigate('/orders')}
            className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Track Order</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;