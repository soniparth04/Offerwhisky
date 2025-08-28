import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Star, TrendingUp, Eye } from "lucide-react";
import { GoDotFill } from "react-icons/go";

const Section5 = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedOffers, setLikedOffers] = useState(new Set());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for Local Treasures
  useEffect(() => {
    const mockOffers = [
      {
        _id: "local1",
        title: "Artisan Coffee Roastery",
        description: "Locally sourced beans with traditional roasting methods and handcrafted brewing",
        category: "Local Treasures",
        offerType: "local",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=500&fit=crop",
        ownerId: { shopName: "Bean Craft Local" },
        validTill: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        discount: 45,
        primaryDiscount: "45% OFF",
        secondaryDiscount: "+ Free Tasting",
        categoryText: "Local Artisan",
        distance: "0.1 km",
        rating: 4.9,
        views: 890,
        originalPrice: 899,
        salePrice: 494,
        happyHourEnd: new Date(Date.now() + 7 * 60 * 60 * 1000),
        happyHourTime: "Local Special",
      },
      {
        _id: "local2",
        title: "Handmade Jewelry Studio",
        description: "Unique handcrafted jewelry pieces made by local artisans with premium materials",
        category: "Local Treasures",
        offerType: "local",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
        ownerId: { shopName: "Treasure Craft" },
        validTill: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        discount: 60,
        primaryDiscount: "60% OFF",
        secondaryDiscount: "+ Custom Design",
        categoryText: "Handmade",
        distance: "0.3 km",
        rating: 4.8,
        views: 1240,
        originalPrice: 2499,
        salePrice: 999,
        happyHourEnd: new Date(Date.now() + 5 * 60 * 60 * 1000),
        happyHourTime: "Artisan Hours",
      },
      {
        _id: "local3",
        title: "Farm Fresh Organic Store",
        description: "Direct from farm organic vegetables, fruits and dairy products from local farmers",
        category: "Local Treasures",
        offerType: "local",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=500&fit=crop",
        ownerId: { shopName: "Green Valley" },
        validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        discount: 35,
        primaryDiscount: "Buy 2 Get 1",
        secondaryDiscount: "+ Farm Tour",
        categoryText: "Organic",
        distance: "0.5 km",
        rating: 4.7,
        views: 1560,
        originalPrice: 599,
        salePrice: 199,
        happyHourEnd: new Date(Date.now() + 4 * 60 * 60 * 1000),
        happyHourTime: "Fresh Daily",
      },
      {
        _id: "local4",
        title: "Traditional Handicrafts",
        description: "Authentic local handicrafts, pottery and traditional art pieces by skilled craftsmen",
        category: "Local Treasures",
        offerType: "local",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
        ownerId: { shopName: "Heritage Crafts" },
        validTill: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        discount: 50,
        primaryDiscount: "50% OFF",
        secondaryDiscount: "+ Certificate",
        categoryText: "Traditional",
        distance: "0.4 km",
        rating: 4.6,
        views: 780,
        originalPrice: 1999,
        salePrice: 999,
        happyHourEnd: new Date(Date.now() + 6 * 60 * 60 * 1000),
        happyHourTime: "Heritage Deal",
      },
    ];

    setTimeout(() => {
      setOffers(mockOffers);
      setLoading(false);
    }, 800);
  }, []);

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

  const getHappyHourCountdown = (happyHourEnd) => {
    const now = currentTime;
    const diff = new Date(happyHourEnd) - now;

    if (diff <= 0) return "00:00:00";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white p-3 sm:p-4">
        <div className="flex justify-center items-center py-12 sm:py-20">
          <div className="relative">
            <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      {/* Header - Local Treasures */}
      <div className="mb-3 mt-4 px-3">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 sm:p-4 relative overflow-hidden rounded-xl">
          {/* Background Pattern */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rotate-45"></div>
          <div className="absolute top-1 right-3 w-8 h-8 sm:w-12 sm:h-12 border border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border border-white rounded-full animate-bounce"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1.5 mb-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-pulse" />
                  <span className="text-white/90 text-xs font-medium tracking-wider">HIDDEN GEMS</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                  Local Treasures
                </h2>
                <p className="text-white/90 text-xs">
                  Hidden gems from your neighbourhood
                </p>
              </div>
              <button className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-full transition">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="overflow-x-auto scrollbar-hide px-3">
        <div className="flex space-x-3 pb-4" style={{ width: "max-content" }}>
          {offers.map((offer) => {
            const isLiked = likedOffers.has(offer._id);

            return (
              <div
                key={offer._id}
                className="bg-white overflow-hidden shadow-md border border-gray-100 group hover:shadow-lg transition-all duration-300 flex-shrink-0 relative rounded-xl"
                style={{ width: "180px" }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <div className="w-full h-48 bg-gray-100">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Local Badge */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-green-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-0.5">
                      <Star className="w-2 h-2" />
                      <span>LOCAL</span>
                    </div>
                  </div>

                  {/* Time Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md text-xs">
                      {offer.happyHourTime}
                    </div>
                  </div>

                  {/* Heart Icon */}
                  <button
                    onClick={() => toggleLike(offer._id)}
                    className="absolute top-10 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 hover:bg-white transition-all duration-200 hover:scale-110"
                  >
                    <Heart
                      className={`w-3 h-3 ${
                        isLiked
                          ? "text-red-500 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Discount Badge */}
                  <div className="absolute bottom-2 left-2">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-2 py-1 rounded-md">
                      <div className="text-xs font-bold">
                        {offer.primaryDiscount}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Shop Name & Category */}
                  <div className="mb-2">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {offer.ownerId?.shopName}
                    </h3>
                    <p className="text-xs text-gray-500">{offer.categoryText}</p>
                  </div>

                  {/* Price Section */}
                  <div className="mb-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-bold text-green-600">
                        ₹{offer.salePrice}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{offer.originalPrice}
                      </span>
                    </div>
                    {offer.secondaryDiscount && (
                      <p className="text-xs text-teal-600 font-medium">
                        {offer.secondaryDiscount}
                      </p>
                    )}
                  </div>

                  {/* Rating and Views */}
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <div className="flex items-center space-x-0.5 text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-gray-700 font-medium">{offer.rating}</span>
                    </div>
                    <div className="flex items-center space-x-0.5 text-gray-500">
                      <Eye className="w-3 h-3" />
                      <span>{offer.views}</span>
                    </div>
                  </div>

                  {/* Footer - Countdown and Distance */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-0.5 text-green-600">
                      <Clock className="w-3 h-3 animate-pulse" />
                      <span className="text-xs font-mono font-bold">
                        {getHappyHourCountdown(offer.happyHourEnd)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-0.5 text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{offer.distance}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-200">
                    Discover Local
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Section5;
