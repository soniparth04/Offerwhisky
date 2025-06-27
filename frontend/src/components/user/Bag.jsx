import React from 'react';
import Navbar from './Navbar';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';

const Bag = () => {
  // Sample bag items for demonstration
  const bagItems = [
    {
      id: 1,
      name: "Burger Combo",
      shop: "The Burger Joint",
      price: 299,
      originalPrice: 399,
      discount: "25% OFF",
      quantity: 2,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Pizza Margherita",
      shop: "Pizza Palace",
      price: 499,
      originalPrice: 599,
      discount: "17% OFF",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop"
    }
  ];

  const total = bagItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = bagItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-900 flex items-center">
          <ShoppingBag className="w-6 h-6 mr-2" />
          My Bag ({bagItems.length} items)
        </h1>
      </div>

      {/* Bag Items */}
      <div className="p-4 space-y-4">
        {bagItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-start space-x-3">
              {/* Item Image */}
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              {/* Item Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.shop}</p>
                
                {/* Price */}
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-bold text-lg">₹{item.price}</span>
                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {item.discount}
                  </span>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-3">
                    <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="text-red-500 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mx-4 bg-white rounded-lg shadow-sm p-4 mb-4">
        <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{(total + savings)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>You Save</span>
            <span>-₹{savings}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4 hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>

      <Navbar />
    </div>
  );
};

export default Bag;
