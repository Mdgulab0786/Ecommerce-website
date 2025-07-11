import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Building, QrCode } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  enabled: boolean;
}

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedMethod, onMethodChange }) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      enabled: true,
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Pay using any UPI app',
      enabled: true,
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Paytm, PhonePe, Google Pay',
      enabled: true,
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'All major banks supported',
      enabled: true,
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: QrCode,
      description: 'Pay when you receive',
      enabled: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          return (
            <label
              key={method.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${!method.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => onMethodChange(e.target.value)}
                disabled={!method.enabled}
                className="sr-only"
              />
              
              <div className="flex items-center space-x-3 flex-1">
                <div className={`p-2 rounded-lg ${
                  selectedMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <IconComponent className={`h-5 w-5 ${
                    selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                
                <div>
                  <div className="font-medium text-gray-900">{method.name}</div>
                  <div className="text-sm text-gray-500">{method.description}</div>
                </div>
              </div>
              
              <div className={`w-4 h-4 border-2 rounded-full ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedMethod === method.id && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* Payment Form based on selected method */}
      {selectedMethod === 'card' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {selectedMethod === 'upi' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            UPI ID
          </label>
          <input
            type="text"
            placeholder="yourname@upi"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {selectedMethod === 'wallet' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            You will be redirected to your selected wallet app to complete the payment.
          </div>
        </div>
      )}

      {selectedMethod === 'netbanking' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Your Bank
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Choose your bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="axis">Axis Bank</option>
            <option value="kotak">Kotak Mahindra Bank</option>
          </select>
        </div>
      )}

      {selectedMethod === 'cod' && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <QrCode className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Cash on Delivery</p>
              <p>Pay ₹50 extra as COD charges. Please keep exact change ready.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;