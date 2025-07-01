import React from 'react';
import Navbar from './Navbar';
import { QrCode, Star, ChevronRight } from 'lucide-react';

const Bag = () => {
  // Sample booked offers for demonstration
  const bookedOffers = [
    {
      id: 1,
      name: "Get 20% OFF your total bill on your next visit!",
      shop: "Name of store",
      category: "Category",
      distance: "2km",
      rating: 4.3
    },
    {
      id: 2,
      name: "Get 20% OFF your total bill on your next visit!",
      shop: "Name of store",
      category: "Category", 
      distance: "2km",
      rating: 4.3
    },
    {
      id: 3,
      name: "Get 20% OFF your total bill on your next visit!",
      shop: "Name of store",
      category: "Category",
      distance: "2km", 
      rating: 4.3
    },
    {
      id: 4,
      name: "Get 20% OFF your total bill on your next visit!",
      shop: "Name of store",
      category: "Category",
      distance: "2km",
      rating: 4.3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-900">
          Booked Offers
        </h1>
      </div>

      {/* Booked Offers */}
      <div className="p-4 space-y-4">
        {bookedOffers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex">
              {/* QR Code Section */}
              <div className="bg-gray-100 p-3 flex items-center justify-center" style={{ width: '120px', minHeight: '120px' }}>
                <QrCode className="w-20 h-20 text-gray-700" />
              </div>
              
              {/* Offer Details */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{offer.shop}</h3>
                      <span className="text-gray-500 text-xs">({offer.distance})</span>
                      <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                        <span className="font-semibold">{offer.rating}</span>
                        <Star className="w-3 h-3 ml-1 fill-current" />
                      </div>
                    </div>
                    
                    <div className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mb-2">
                      {offer.category}
                    </div>
                    
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                      {offer.name}
                    </p>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

export default Bag;
