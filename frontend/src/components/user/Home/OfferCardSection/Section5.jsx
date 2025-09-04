import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Star, TrendingUp, Eye, Gem } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { GiCutDiamond } from "react-icons/gi";

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

  // Mock data for Local Treasures (add couponsLeft/totalCoupons for Happy Hours cards)
  useEffect(() => {
    const mockOffers = [
      {
        _id: "local1",
        title: "Artisan Coffee Roastery",
        description:
          "Locally sourced beans with traditional roasting methods and handcrafted brewing",
        category: "Local Treasures",
        offerType: "local",
        image:
          "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=500&fit=crop",
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
        // Spotlight
      },
      {
        _id: "local2",
        title: "Handmade Jewelry Studio",
        description:
          "Unique handcrafted jewelry pieces made by local artisans with premium materials",
        category: "Local Treasures",
        offerType: "local",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
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
        couponsLeft: 18,
        totalCoupons: 40,
        // Happy Hours
      },
      {
        _id: "local3",
        title: "Farm Fresh Organic Store",
        description:
          "Direct from farm organic vegetables, fruits and dairy products from local farmers",
        category: "Local Treasures",
        offerType: "local",
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=500&fit=crop",
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
        // Spotlight
      },
      {
        _id: "local4",
        title: "Traditional Handicrafts",
        description:
          "Authentic local handicrafts, pottery and traditional art pieces by skilled craftsmen",
        category: "Local Treasures",
        offerType: "local",
        image:
          "https://www.lowimpact.org/wp-content/uploads/zachary-staines-0kvS01RVKQI-unsplash.jpg",
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
        couponsLeft: 12,
        totalCoupons: 30,
        // Happy Hours
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
      {/* Header - Local Treasures (Section1 style, keep content) */}
      <div className="w-full px-4 py-6 sm:py-8 bg-transparent">
        <div className="flex items-center justify-between">
          {/* Left Side: Icon + Title + Subtitle */}
          <div className="flex items-center gap-3">
            <GiCutDiamond className="text-green-500 w-7 h-7 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                Local Treasures
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-0">
                Hidden gems from your neighbourhood
              </p>
            </div>
          </div>

          {/* Right Side: Featured stacked above View All */}
          <div className="flex flex-col items-center gap-2">
            <button className="text-xs sm:text-sm font-medium flex items-center gap-1 text-pink-500 hover:text-pink-600 transition">
              View All
              <IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards (match Section1/2, alternate Spotlight/Happy Hours) */}
      <div className="overflow-x-auto scrollbar-hide px-3">
        <div className="flex space-x-2 pb-4" style={{ width: "max-content" }}>
          {offers.map((offer, idx) => {
            const isLiked = likedOffers.has(offer._id);
            const isSpotlight = idx % 2 === 0;
            const isHappyHours = idx % 2 === 1;
            return (
              <div
                key={offer._id}
                className="bg-white overflow-hidden shadow-md border border-gray-100 transition-all duration-300 flex-shrink-0 relative rounded-2xl"
                style={{ width: "180px" }}
              >
                {/* Image Container - match Section1/2 image size and style */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                    {/* HOT and Time Badges in a single row at the top, improved position */}
                    {isHappyHours && offer.happyHourTime && (
                      <div className="absolute top-2 left-0 w-full flex flex-row items-start z-20 px-0">
                        <div
                          className="bg-black/70 backdrop-blur-sm text-white px-3 py-0.5 rounded-l-none rounded-r-full text-xs font-bold flex items-center shadow-lg"
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: "9999px",
                            borderBottomRightRadius: "9999px",
                            boxShadow: "2px 2px 8px 0 rgba(0,0,0,0.10)",
                          }}
                        >
                          {offer.happyHourTime}
                        </div>
                      </div>
                    )}
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-56 object-cover transition-transform duration-300 rounded-xl"
                    />
                    {/* Black gradient at bottom for discount badge, fits bottom of image */}
                    <div className="absolute left-0 bottom-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center rounded-b-2xl pointer-events-none z-10">
                      <span
                        className="text-white text-base font-bold drop-shadow-lg tracking-wide mb-2 w-40 text-center block mx-auto whitespace-pre-line break-words"
                        style={{
                          width: "10rem",
                          textAlign: "center",
                          wordBreak: "break-word",
                        }}
                      >
                        {offer.primaryDiscount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Shop Name, Like Button & Tag */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-gray-900 truncate">
                        {offer.ownerId?.shopName}
                      </h3>
                      <button
                        onClick={() => toggleLike(offer._id)}
                        className="ml-2 rounded-full p-1 transition-all duration-200"
                        aria-label={isLiked ? "Unlike" : "Like"}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked
                              ? "text-green-500 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                    {/* Tag and description logic, match Section1/2 tag colors and text style */}
                    <div className="mt-1">
                      {isSpotlight ? (
                        <>
                          <span className="bg-purple-200 text-purple-600 px-2 py-0.5 rounded-full text-xs font-medium">
                            Spotlight
                          </span>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {offer.description}
                          </p>
                        </>
                      ) : (
                        <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-medium">
                          Happy Hours
                        </span>
                      )}
                    </div>
                    {/* Coupons Left Bar for Happy Hours cards */}
                    {isHappyHours &&
                      offer.couponsLeft !== undefined &&
                      offer.totalCoupons !== undefined && (
                        <div className="mt-2 mb-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">
                              Coupons Left
                            </span>
                            <span className="text-xs font-bold text-teal-500">
                              {offer.couponsLeft ?? 0}/
                              {offer.totalCoupons ?? 30}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                              style={{
                                width: `${
                                  offer.couponsLeft && offer.totalCoupons
                                    ? (offer.couponsLeft / offer.totalCoupons) *
                                      100
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Footer - Countdown and Distance */}
                  <div className="flex flex-col pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-0.5 text-red-600">
                        {isHappyHours && offer.happyHourTime && (
                          <>
                            <Clock className="w-3 h-3 animate-pulse" />
                            <span className="text-xs font-mono font-bold">
                              {getHappyHourCountdown(offer.happyHourEnd)}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-0.5 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{offer.distance}</span>
                      </div>
                    </div>
                  </div>
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
