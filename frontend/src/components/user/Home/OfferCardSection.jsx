// OfferCardSection.jsx
import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Star, Zap, Sparkles, Gift } from "lucide-react";

const OfferCardSection = ({ activeFilter = "all" }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedOffers, setLikedOffers] = useState(new Set());

  useEffect(() => {
    const mockOffers = [
      {
        _id: "1",
        image: "https://via.placeholder.com/300x200",
        discount: 20,
        offerType: "spotlight",
        ownerId: { shopName: "Cafe Mocha" },
        rating: 4.5,
        title: "Buy 1 Get 1 Coffee",
        description: "Enjoy fresh brewed coffee with your friend.",
        discountedPrice: 150,
        originalPrice: 300,
        category: "Beverages",
        distance: "2 km",
        validTill: "2025-08-20T23:59:59",
      },
      {
        _id: "2",
        image: "https://via.placeholder.com/300x200",
        discount: 30,
        offerType: "happyHour",
        ownerId: { shopName: "Pizza Hub" },
        rating: 4.2,
        title: "30% Off on All Pizzas",
        description: "Only available during happy hours!",
        discountedPrice: 350,
        originalPrice: 500,
        category: "Food",
        distance: "5 km",
        validTill: "2025-08-15T20:00:00",
      },
      {
        _id: "3",
        image: "https://via.placeholder.com/300x200",
        discount: 50,
        offerType: "spinToWin",
        ownerId: { shopName: "Fashion Point" },
        rating: 4.8,
        title: "Spin & Win up to 50% Off",
        description: "Try your luck today!",
        discountedPrice: 500,
        originalPrice: 1000,
        category: "Clothing",
        distance: "1.5 km",
        validTill: "2025-08-25T23:59:59",
      },
    ];

    setOffers(mockOffers);
    setLoading(false);
  }, []);

  const getOfferTypeIcon = (type) => {
    switch (type) {
      case "spotlight":
        return <Sparkles className="w-3 h-3" />;
      case "happyHour":
        return <Clock className="w-3 h-3" />;
      case "spinToWin":
        return <Gift className="w-3 h-3" />;
      default:
        return <Zap className="w-3 h-3" />;
    }
  };

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
      if (newSet.has(offerId)) newSet.delete(offerId);
      else newSet.add(offerId);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (filteredOffers.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Gift className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">
          No offers available for this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {filteredOffers.map((offer) => {
          const badge = getOfferTypeBadge(offer.offerType);
          const isLiked = likedOffers.has(offer._id);

          return (
            <div
              key={offer._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {offer.discount}% OFF
                </span>
                <span
                  className={`${badge.color} absolute top-2 right-2 px-2 py-1 rounded-full text-xs flex items-center space-x-1`}
                >
                  {getOfferTypeIcon(offer.offerType)}
                  <span>{badge.text}</span>
                </span>
                <button
                  onClick={() => toggleLike(offer._id)}
                  className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-full"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isLiked ? "text-red-500 fill-current" : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600 text-sm">
                    {offer.ownerId?.shopName}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{offer.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {offer.description}
                </p>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-green-600">
                    ₹{offer.discountedPrice}
                  </span>
                  <span className="line-through text-sm text-gray-500">
                    ₹{offer.originalPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {offer.category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    {offer.distance}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="flex items-center text-orange-600 space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{getTimeLeft(offer.validTill)}</span>
                  </span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferCardSection;