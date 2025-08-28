import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Zap, Star, Eye, Timer } from "lucide-react";
import { GoDotFill } from "react-icons/go";

const Section3 = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedOffers, setLikedOffers] = useState(new Set());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const mockOffers = [
      {
        _id: "happy1",
        title: "Coffee Shop Delight",
        description:
          "Premium coffee beans with artisan brewing methods and fresh bakery items",
        category: "Happy Hours",
        offerType: "happyHour",
        image:
          "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=500&fit=crop",
        ownerId: { shopName: "Brew Masters" },
        validTill: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        discount: 50,
        primaryDiscount: "Buy 2 Get 1",
        secondaryDiscount: "+ Free Pastry",
        categoryText: "Coffee & Bakery",
        distance: "0.2 km",
        remainingCoupons: 45,
        rating: 4.6,
        views: 1240,
        originalPrice: 399,
        salePrice: 199,
        happyHourEnd: new Date(Date.now() + 4 * 60 * 60 * 1000),
        happyHourTime: "2PM - 6PM",
      },
      {
        _id: "happy2",
        title: "Electronics Flash Deal",
        description:
          "Latest smartphones, tablets and tech accessories with instant discounts",
        category: "Happy Hours",
        offerType: "happyHour",
        image:
          "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=500&fit=crop",
        ownerId: { shopName: "TechHub" },
        validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        discount: 65,
        primaryDiscount: "65% OFF",
        secondaryDiscount: "+ Warranty",
        categoryText: "Electronics",
        distance: "0.5 km",
        remainingCoupons: 28,
        rating: 4.8,
        views: 2150,
        originalPrice: 24999,
        salePrice: 8749,
        happyHourEnd: new Date(Date.now() + 2 * 60 * 60 * 1000),
        happyHourTime: "3PM - 7PM",
      },
      {
        _id: "happy3",
        title: "Fashion Hour Special",
        description:
          "Trendy clothing and accessories with limited-time flash pricing",
        category: "Happy Hours",
        offerType: "happyHour",
        image:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop",
        ownerId: { shopName: "Style Studio" },
        validTill: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        discount: 70,
        primaryDiscount: "70% OFF",
        secondaryDiscount: "+ Styling",
        categoryText: "Fashion",
        distance: "0.3 km",
        remainingCoupons: 36,
        rating: 4.7,
        views: 1890,
        originalPrice: 2999,
        salePrice: 899,
        happyHourEnd: new Date(Date.now() + 5 * 60 * 60 * 1000),
        happyHourTime: "1PM - 8PM",
      },
      {
        _id: "happy4",
        title: "Wellness & Beauty",
        description:
          "Premium skincare, cosmetics and wellness products at happy hour prices",
        category: "Happy Hours",
        offerType: "happyHour",
        image:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
        ownerId: { shopName: "Glow Beauty" },
        validTill: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        discount: 55,
        primaryDiscount: "55% OFF",
        secondaryDiscount: "+ Consultation",
        categoryText: "Beauty",
        distance: "0.7 km",
        remainingCoupons: 20,
        rating: 4.9,
        views: 980,
        originalPrice: 1999,
        salePrice: 899,
        happyHourEnd: new Date(Date.now() + 3 * 60 * 60 * 1000),
        happyHourTime: "12PM - 5PM",
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
            <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      {/* Header - Happy Hours */}
      <div className="mb-3 mt-4 px-3">
        <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 p-3 sm:p-4 relative overflow-hidden rounded-xl">
          {/* Background Pattern */}
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute top-1 right-3 w-8 h-8 sm:w-12 sm:h-12 border border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border border-white rounded-full animate-bounce"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1.5 mb-1">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-pulse" />
                  <span className="text-white/90 text-xs font-medium tracking-wider">LIMITED TIME</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                  Happy Hours
                </h2>
                <p className="text-white/90 text-xs">
                  Limited-time discounts available now
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

                  {/* LIVE Badge */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-0.5 animate-pulse">
                      <GoDotFill className="w-2 h-2" />
                      <span>LIVE</span>
                    </div>
                  </div>

                  {/* Happy Hour Time Badge */}
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
                    <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-2 py-1 rounded-md">
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
                      <p className="text-xs text-purple-600 font-medium">
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

                  {/* Remaining Coupons with Progress Bar - KEPT AS REQUESTED */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">
                        Coupons Left
                      </span>
                      <span className="text-xs font-bold text-pink-500">
                        {offer.remainingCoupons}/60
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-300 ease-out"
                        style={{
                          width: `${(offer.remainingCoupons / 60) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Footer - Countdown and Distance */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-0.5 text-red-600">
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
                  <button className="w-full mt-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-200">
                    Grab Deal
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

export default Section3;
