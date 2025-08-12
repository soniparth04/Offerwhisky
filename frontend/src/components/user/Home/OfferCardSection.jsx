import React, { useEffect, useState } from "react";
import {
  Heart,
  Clock,
  MapPin,
  Star,
  Zap,
  Sparkles,
  Gift,
  Filter,
} from "lucide-react";

const OfferCardSection = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedOffers, setLikedOffers] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock data for demonstration - replace with your API call
  useEffect(() => {
    const mockOffers = [
      {
        _id: "1",
        title: "50% Off on Trimmer",
        description: "Get amazing discount on trimmers",
        category: "Spotlight",
        offerType: "spotlight",
        image:
          "https://images.philips.com/is/image/philipsconsumer/a59bc3c8e8294d0fa85bae7800c112f5?wid=700&hei=700&$pnglarge$",
        ownerId: { shopName: "India Electronics" },
        validTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        discount: 50,
        rating: 4.8,
        distance: "0.5 km",
      },
      {
        _id: "2",
        title: "Buy 2 Get 1 Free",
        description: "Limited Time Deal",
        category: "Happy Hours",
        offerType: "happyHour",
        image:
          "https://suwasthi.com/cdn/shop/products/GiloyTulsiJuice_1.jpg?v=1608965903&width=480",
        ownerId: { shopName: "Sharma Medical" },
        validTill: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        discount: 33,
        rating: 4.5,
        distance: "1.2 km",
      },
      {
        _id: "3",
        title: "Win Exciting Coupons",
        description: "Spin the wheel for surprise discounts",
        category: "Spin & Win",
        offerType: "spinToWin",
        image:
          "https://cdn.pixabay.com/photo/2021/12/16/03/04/spin-the-wheel-6873663_1280.png",
        ownerId: { shopName: "Vijay Sales" },
        validTill: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        discount: 40,
        rating: 4.7,
        distance: "2.1 km",
      },
      {
        _id: "4",
        title: "Weekend Special offer",
        description: "Clothes at unbeatable prices",
        category: "Spotlight",
        offerType: "spotlight",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-08/interior-shot-racks-with-shirts-undershirts-jeans_2.jpg",
        ownerId: { shopName: "Alex Clothing" },
        validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        discount: 45,
        rating: 4.6,
        distance: "0.8 km",
      },
    ];

    setTimeout(() => {
      setOffers(mockOffers);
      setLoading(false);
    }, 1000);
  }, []);

  const getOfferTypeBadge = (type) => {
    const badges = {
      spotlight: {
        text: "Spotlight",
        color: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
      },
      happyHour: {
        text: "Happy Hour",
        color: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
      },
      spinToWin: {
        text: "Spin to Win",
        color: "bg-gradient-to-r from-green-400 to-blue-500 text-white",
      },
    };
    return badges[type] || { text: "Special", color: "bg-gray-500 text-white" };
  };

  const toggleLike = (offerId) => {
    setLikedOffers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(offerId)) {
        newSet.delete(offerId);
      } else {
        newSet.add(offerId);
      }
      return newSet;
    });
  };

  const getTimeLeft = (validTill) => {
    const now = new Date();
    const diff = new Date(validTill) - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d left`;
    if (hours > 0) return `${hours}h left`;
    return "Ending soon";
  };

  const filteredOffers =
    activeFilter === "all"
      ? offers
      : offers.filter((offer) => offer.offerType === activeFilter);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-4 max-w-7xl mx-auto">


      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animate-reverse"></div>
          </div>
        </div>
      ) : // Offers Grid
      filteredOffers.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Gift className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">
            No offers available for this filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {filteredOffers.map((offer) => {
            const offerTypeBadge = getOfferTypeBadge(offer.offerType);
            const isLiked = likedOffers.has(offer._id);

            return (
              <div
                key={offer._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-40 bg-gray-100">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 opacity-100">
                    <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      {offer.discount}% OFF
                    </span>
                  </div>

                  {/* Heart Icon */}
                  <button
                    onClick={() => toggleLike(offer._id)}
                    className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "text-red-500 fill-current" : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Shop Info */}
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-gray-600 text-xs font-medium truncate">
                      {offer.ownerId?.shopName}
                    </p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">
                        {offer.rating}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs mb-2 line-clamp-1">
                    {offer.description}
                  </p>

                  {/* Category and Distance */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-200 text-blue-600 px-1.5 py-0.5 rounded-full text-xs font-medium">
                      {offer.category}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{offer.distance}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-orange-600">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs font-medium">
                        {getTimeLeft(offer.validTill)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OfferCardSection;
