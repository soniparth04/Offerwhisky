import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Crown, Star, Eye, Shield } from "lucide-react";

const Section2 = () => {
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

  // Mock data for Mega Brand Deal
  useEffect(() => {
    const mockOffers = [
      {
        _id: "mega1",
        title: "Samsung Galaxy Mega Deal",
        description:
          "Flagship Samsung smartphones with exclusive mega brand discounts and premium accessories",
        category: "Mega Brand Deal",
        offerType: "megaBrand",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=500&fit=crop",
        ownerId: { shopName: "Samsung Store" },
        validTill: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        discount: 75,
        primaryDiscount: "75% OFF",
        secondaryDiscount: "+ Free Buds",
        categoryText: "Electronics",
        distance: "0.3 km",
        rating: 4.9,
        views: 3420,
        originalPrice: 79999,
        salePrice: 19999,
        isVerified: true,
        brandTier: "Premium",
        happyHourEnd: new Date(Date.now() + 5 * 60 * 60 * 1000),
        happyHourTime: "Mega Sale",
      },
      {
        _id: "mega2",
        title: "Nike Mega Brand Special",
        description:
          "Authentic Nike collection with mega discounts on shoes, apparel and sports accessories",
        category: "Mega Brand Deal",
        offerType: "megaBrand",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
        ownerId: { shopName: "Nike Flagship" },
        validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        discount: 60,
        primaryDiscount: "60% OFF",
        secondaryDiscount: "+ Free Bag",
        categoryText: "Sports",
        distance: "0.5 km",
        rating: 4.8,
        views: 2890,
        originalPrice: 12999,
        salePrice: 5199,
        isVerified: true,
        brandTier: "Official",
        happyHourEnd: new Date(Date.now() + 4 * 60 * 60 * 1000),
        happyHourTime: "Brand Deal",
      },
      {
        _id: "mega3",
        title: "Apple Authorized Reseller",
        description:
          "Official Apple products with mega brand pricing and authorized warranty coverage",
        category: "Mega Brand Deal",
        offerType: "megaBrand",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=500&fit=crop",
        ownerId: { shopName: "Apple Premium" },
        validTill: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        discount: 45,
        primaryDiscount: "45% OFF",
        secondaryDiscount: "+ Warranty",
        categoryText: "Premium Tech",
        distance: "0.7 km",
        rating: 4.9,
        views: 4150,
        originalPrice: 129999,
        salePrice: 71499,
        isVerified: true,
        brandTier: "Authorized",
        happyHourEnd: new Date(Date.now() + 6 * 60 * 60 * 1000),
        happyHourTime: "Exclusive",
      },
      {
        _id: "mega4",
        title: "Adidas Mega Collection",
        description:
          "Complete Adidas range with mega brand deals on footwear, clothing and accessories",
        category: "Mega Brand Deal",
        offerType: "megaBrand",
        image:
          "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=500&fit=crop",
        ownerId: { shopName: "Adidas Official" },
        validTill: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        discount: 65,
        primaryDiscount: "65% OFF",
        secondaryDiscount: "+ Membership",
        categoryText: "Athletic",
        distance: "0.4 km",
        rating: 4.7,
        views: 2760,
        originalPrice: 8999,
        salePrice: 3149,
        isVerified: true,
        brandTier: "Official",
        happyHourEnd: new Date(Date.now() + 3 * 60 * 60 * 1000),
        happyHourTime: "Brand Hours",
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
      {/* Header - Mega Brand Deal */}
      <div className="mb-3 mt-4 px-3">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 sm:p-4 relative overflow-hidden rounded-xl">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[80px] border-l-transparent border-b-[80px] border-b-white/10"></div>
          <div className="absolute top-1 right-3 w-8 h-8 sm:w-12 sm:h-12 border border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border border-white rounded-full animate-bounce"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1.5 mb-1">
                  <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-pulse" />
                  <span className="text-white/90 text-xs font-medium tracking-wider">
                    SPONSORED
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                  Mega Brand Deal
                </h2>
                <p className="text-white/90 text-xs">
                  Sponsored offers from top brands
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

                  {/* MEGA Badge */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-purple-600 text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-0.5">
                      <Crown className="w-2 h-2" />
                      <span>MEGA</span>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  {offer.isVerified && (
                    <div className="absolute top-2 left-2">
                      <div className="bg-blue-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-0.5">
                        <Shield className="w-2 h-2" />
                        <span>VERIFIED</span>
                      </div>
                    </div>
                  )}

                  {/* Heart Icon */}
                  <button
                    onClick={() => toggleLike(offer._id)}
                    className="absolute top-10 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 hover:bg-white transition-all duration-200 hover:scale-110"
                  >
                    <Heart
                      className={`w-3 h-3 ${
                        isLiked ? "text-red-500 fill-current" : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Discount Badge */}
                  <div className="absolute bottom-2 left-2">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-1 rounded-md">
                      <div className="text-xs font-bold">
                        {offer.primaryDiscount}
                      </div>
                    </div>
                  </div>

                  {/* Brand Tier Badge */}
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md text-xs">
                      {offer.brandTier}
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
                    <p className="text-xs text-gray-500">
                      {offer.categoryText}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="mb-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-bold text-green-600">
                        ₹{offer.salePrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{offer.originalPrice.toLocaleString()}
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
                      <span className="text-gray-700 font-medium">
                        {offer.rating}
                      </span>
                    </div>
                    <div className="flex items-center space-x-0.5 text-gray-500">
                      <Eye className="w-3 h-3" />
                      <span>{offer.views}</span>
                    </div>
                  </div>

                  {/* Brand Quality Indicator */}
                  <div className="mb-2">
                    <div className="flex items-center space-x-1">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-purple-600 font-medium">
                        Brand Quality
                      </span>
                    </div>
                  </div>

                  {/* Footer - Countdown and Distance */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-0.5 text-purple-600">
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
                  <button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-200">
                    Shop Now
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

export default Section2;
