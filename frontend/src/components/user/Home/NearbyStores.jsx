import React from "react";
import { ChevronRight } from "lucide-react";
import "../../../../src/index.css"

const OfferCard = ({ imageSrc, storeName, distance, discount }) => {
  return (
    <div className="min-w-[180px] max-w-[180px] flex-shrink-0 rounded-xl overflow-hidden">
      <div className="relative">
        <img
          src={imageSrc}
          alt={storeName}
          className="w-full h-48 object-cover rounded-xl"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/180x192?text=Image+Error")
          }
        />
        {/* Discount inside image */}
        <div className="absolute bottom-2 left-0 right-0 text-white text-sm font-semibold px-2 text-center">
          {discount}
        </div>
      </div>

      {/* Store name + distance below image */}
      <div className="mt-2 text-center text-xs font-medium text-black">
        {storeName} ({distance})
      </div>
    </div>
  );
};

const NearbyStores = () => {
  const offers = [
    {
      imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=180&h=192&q=80",
      storeName: "Matrix Salon",
      distance: "1km",
      discount: "Buy One Get One Free",
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=180&h=192&q=80",
      storeName: "Matrix Salon",
      distance: "2km",
      discount: "Upto 20% OFF",
    },
   
     {
      imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=180&h=192&q=80",
      storeName: "Matrix Salon",
      distance: "5km",
      discount: "30% OFF on all items",
    },
     {
      imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=180&h=192&q=80",
      storeName: "Matrix Salon",
      distance: "5km",
      discount: "30% OFF on all items",
    },
     {
      imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=180&h=192&q=80",
      storeName: "Matrix Salon",
      distance: "5km",
      discount: "30% OFF on all items",
    },
  ];

  return (
    <div className="bg-white px-4 py-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-900">Nearby Stores</h2>
        <button className="flex items-center text-sm text-gray-500 hover:text-black">
          View all <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>

<div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">

        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            imageSrc={offer.imageSrc}
            storeName={offer.storeName}
            distance={offer.distance}
            discount={offer.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default NearbyStores;
