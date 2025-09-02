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
        couponsLeft: 30,
        totalCoupons: 60,
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
        couponsLeft: 18,
        totalCoupons: 60,
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
        couponsLeft: 10,
        totalCoupons: 60,
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
        couponsLeft: 5,
        totalCoupons: 60,
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
      {/* Header - Mega Brand Deal (Match Section1 structure, keep color) */}
      <div className="mb-3 mt-4">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-6 sm:py-8 w-full relative overflow-hidden px-3">
          {/* Background Pattern (match Section1) */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-1 right-3 w-8 h-8 sm:w-12 sm:h-12 border border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border border-white rounded-full animate-bounce"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                Mega Brand Deal
              </h2>
              <p className="text-white/90 text-xs">
                Exclusive offers from top brands
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
          {offers.map((offer, idx) => {
            const isLiked = likedOffers.has(offer._id);
            const isSpotlight = idx < offers.length / 2;
            const isHappyHours = idx >= offers.length / 2;

            return (
              <div
                key={offer._id}
                className="bg-white overflow-hidden shadow-md border border-gray-100 group hover:shadow-lg transition-all duration-300 flex-shrink-0 relative rounded-xl"
                style={{ width: "180px" }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-[98%] h-[95%] object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                      style={{ aspectRatio: "4/3" }}
                    />
                    <div className="absolute left-1 bottom-2 w-[96%] h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center rounded-b-xl pointer-events-none z-10">
                      <span className="text-white text-base font-bold drop-shadow-lg tracking-wide mb-2">
                        {offer.primaryDiscount}
                      </span>
                    </div>
                    {/* Offer Duration Badge (like Section1) */}
                    {isHappyHours ? (
                      <div className="absolute top-2 left-2">
                        <div className="bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md text-xs">
                          1PM - 4PM
                        </div>
                      </div>
                    ) : (
                      <div className="absolute top-2 left-2">
                        <div className="bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md text-xs">
                          {offer.happyHourTime}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Shop Name, Like Button & Tag */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-900 truncate">
                        {offer.ownerId?.shopName}
                      </h3>
                      <button
                        onClick={() => toggleLike(offer._id)}
                        className="ml-2 rounded-full p-1 transition-all duration-200 hover:scale-110"
                        aria-label={isLiked ? "Unlike" : "Like"}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked
                              ? "text-purple-600 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                    {/* Tag and description logic */}
                    {isSpotlight ? (
                      <>
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg mt-1 inline-block">
                          Spotlight
                        </span>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {offer.description}
                        </p>
                      </>
                    ) : (
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg mt-1 inline-block">
                        Happy Hours
                      </span>
                    )}
                    {/* Coupons Left Bar for Happy Hours cards (second half only) */}
                    {isHappyHours && (
                      <div className="mt-2 mb-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">
                            Coupons Left
                          </span>
                          <span className="text-xs font-bold text-pink-500">
                            {typeof offer.couponsLeft === 'number' ? offer.couponsLeft : 0}/{typeof offer.totalCoupons === 'number' ? offer.totalCoupons : 60}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300 ease-out"
                            style={{
                              width: `${
                                typeof offer.couponsLeft === 'number' && typeof offer.totalCoupons === 'number' && offer.totalCoupons > 0
                                  ? (offer.couponsLeft / offer.totalCoupons) * 100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
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

                  {/* Action Button removed */}
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
