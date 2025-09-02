import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, RotateCcw, Trophy, Star, Eye } from "lucide-react";
import { GoDotFill } from "react-icons/go";

const Section6 = () => {
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

  // Mock data for Spin & Win Deal
  useEffect(() => {
    const mockOffers = [
      {
        _id: "spin1",
        title: "Electronics Spin Bonanza",
        description: "Spin the wheel for surprise discounts on smartphones, laptops and gadgets",
        category: "Spin & Win",
        offerType: "spinToWin",
        image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=500&fit=crop",
        ownerId: { shopName: "TechSpin" },
        validTill: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        discount: 70,
        primaryDiscount: "Win 90% OFF",
        secondaryDiscount: "+ Guaranteed",
        categoryText: "Electronics",
        distance: "0.4 km",
        rating: 4.8,
        views: 2340,
        originalPrice: 24999,
        salePrice: 2499,
        happyHourEnd: new Date(Date.now() + 3 * 60 * 60 * 1000),
        happyHourTime: "Spin Hours",
      },
      {
        _id: "spin2",
        title: "Fashion Wheel Fortune",
        description: "Every spin guarantees a reward - win coupons up to 80% off on trendy fashion",
        category: "Spin & Win",
        offerType: "spinToWin",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop",
        ownerId: { shopName: "Style Spinner" },
        validTill: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        discount: 50,
        primaryDiscount: "Win 80% OFF",
        secondaryDiscount: "+ Lucky Bonus",
        categoryText: "Fashion",
        distance: "0.8 km",
        rating: 4.7,
        views: 1890,
        originalPrice: 4999,
        salePrice: 999,
        happyHourEnd: new Date(Date.now() + 5 * 60 * 60 * 1000),
        happyHourTime: "Lucky Hours",
      },
      {
        _id: "spin3",
        title: "Home Decor Lucky Wheel",
        description: "Spin to win amazing discounts on furniture, decor items and home essentials",
        category: "Spin & Win",
        offerType: "spinToWin",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop",
        ownerId: { shopName: "Home Spinner" },
        validTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        discount: 60,
        primaryDiscount: "Spin 75% OFF",
        secondaryDiscount: "+ Free Ship",
        categoryText: "Home Decor",
        distance: "1.0 km",
        rating: 4.6,
        views: 1560,
        originalPrice: 7999,
        salePrice: 1999,
        happyHourEnd: new Date(Date.now() + 4 * 60 * 60 * 1000),
        happyHourTime: "Wheel Special",
      },
      {
        _id: "spin4",
        title: "Food & Beverage Roulette",
        description: "Lucky spins for food lovers - win vouchers and exciting meal deals",
        category: "Spin & Win",
        offerType: "spinToWin",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=500&fit=crop",
        ownerId: { shopName: "Foodie's Wheel" },
        validTill: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        discount: 40,
        primaryDiscount: "Lucky 60% OFF",
        secondaryDiscount: "+ Surprise",
        categoryText: "Food",
        distance: "0.6 km",
        rating: 4.9,
        views: 2780,
        originalPrice: 1299,
        salePrice: 519,
        happyHourEnd: new Date(Date.now() + 6 * 60 * 60 * 1000),
        happyHourTime: "Taste Fortune",
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
            <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      {/* Header - Spin & Win Deal (match Section1 UI, keep Section6 color) */}
      <div className="mb-3 mt-4">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 py-6 sm:py-8 w-full relative overflow-hidden px-3">
          {/* Background Pattern (match Section1 UI) */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-1 right-3 w-8 h-8 sm:w-12 sm:h-12 border border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border border-white rounded-full animate-bounce"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                Spin & Win
              </h2>
              <p className="text-white/90 text-xs">
                Try your luck and win exciting deals
              </p>
            </div>
            <button className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-full transition">
              View All
            </button>
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
                className="bg-white overflow-hidden shadow-md border border-gray-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex-shrink-0 relative rounded-2xl"
                style={{ width: '180px' }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                    {/* Time Badge (left) and Spin Badge (right) */}
                    <div className="absolute top-4 left-2 right-2 z-20 flex flex-row items-center justify-between">
                      <div className="bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md text-xs">
                        {offer.happyHourTime}
                      </div>
                      <div className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-0.5 animate-pulse shadow-md">
                        <GoDotFill className="w-2 h-2" />
                        <span>SPIN</span>
                      </div>
                    </div>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-[98%] h-[95%] object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                      style={{ aspectRatio: '4/3' }}
                    />
                    {/* Black gradient at bottom for discount badge */}
                    <div className="absolute left-1 bottom-2 w-[96%] h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center rounded-b-xl pointer-events-none z-10">
                      <span className="text-white text-base font-bold drop-shadow-lg tracking-wide mb-2">
                        {offer.primaryDiscount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Shop Name, Like Button & Description */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-900 truncate">
                        {offer.ownerId?.shopName}
                      </h3>
                      <button
                        onClick={() => toggleLike(offer._id)}
                        className="ml-2 rounded-full p-1 transition-all duration-200 hover:scale-110"
                        aria-label={isLiked ? 'Unlike' : 'Like'}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked ? 'text-red-500 fill-current' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                    {/* Description below shop name */}
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {offer.description}
                    </p>
                  </div>

                  {/* Footer - Countdown and Distance */}
                  <div className="flex flex-col pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
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
                  </div>

                  {/* Spin Now Button */}
                  <button className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text border border-blue-600 py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-200">
                    Spin Now
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

export default Section6;
