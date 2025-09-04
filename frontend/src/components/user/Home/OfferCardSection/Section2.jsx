import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Crown, Star, Eye, Shield } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";
import { FaCrown } from "react-icons/fa6";

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
        happyHourTime: "",
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
      {/* Header - Mega Brand Deal (Section1 style, keep content) */}
      <div className="w-full px-4 py-6 sm:py-8 bg-transparent">
        <div className="flex items-center justify-between">
          {/* Left Side: Icon + Title + Subtitle */}
          <div className="flex items-center gap-3">
            <FaCrown className="text-purple-600 w-7 h-7 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                Mega Brand Deal
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-0">
                Exclusive offers from top brands
              </p>
            </div>
          </div>

          {/* Right Side: Featured stacked above View All */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-purple-500 font-medium bg-purple-100 px-2 py-0.5 rounded-full">
              Sponsored
            </span>
            <button className="text-xs sm:text-sm font-medium flex items-center gap-1 text-pink-500 hover:text-pink-600 transition">
              View All
              <IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="overflow-x-auto scrollbar-hide px-3">
        <div className="flex space-x-2 pb-4" style={{ width: "max-content" }}>
          {offers.map((offer, idx) => {
            const isLiked = likedOffers.has(offer._id);
            const isSpotlight = idx < offers.length / 2;
            const isHappyHours = idx >= offers.length / 2;
            return (
              <div
                key={offer._id}
                className="bg-white overflow-hidden shadow-md border border-gray-100 transition-all duration-300 flex-shrink-0 relative rounded-2xl"
                style={{ width: "180px" }}
              >
                {/* Image Container - match Section1/3 image size and style */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                    {/* Offer Duration Badge (like Section1) */}
                      {isHappyHours && offer.happyHourTime && (
                        <div className="absolute top-2 left-0 w-full flex flex-row items-start z-20 px-0">
                          <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-0.5 rounded-l-none rounded-r-full text-xs font-bold flex items-center shadow-lg"
                            style={{
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                              borderTopRightRadius: "9999px",
                              borderBottomRightRadius: "9999px",
                              boxShadow: "2px 2px 8px 0 rgba(0,0,0,0.10)",
                            }}>
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
                      <span className="text-white text-base font-bold drop-shadow-lg tracking-wide mb-2 w-40 text-center block mx-auto whitespace-pre-line break-words"
                        style={{
                          width: "10rem",
                          textAlign: "center",
                          wordBreak: "break-word",
                        }}>
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
                              ? "text-purple-600 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                    {/* Tag and description logic, match Section1 tag colors and text style */}
                      {isSpotlight ? (
                        <>
                          <span className="bg-purple-200 text-purple-600 px-2 py-0.5 rounded-full text-xs font-medium mt-1 inline-block">
                            Spotlight
                          </span>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {offer.description}
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-medium mt-1 inline-block">
                            Happy Hours
                          </span>
                        </>
                      )}
                    {/* Coupons Left Bar for Happy Hours cards (second half only) */}
                      {isHappyHours && offer.happyHourTime && (
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
                              className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
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
                  <div className="flex flex-col pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        {isHappyHours && offer.happyHourTime && (
                          <div className="flex items-center space-x-0.5 text-red-600">
                            <Clock className="w-3 h-3 animate-pulse" />
                            <span className="text-xs font-mono font-bold">
                              {getHappyHourCountdown(offer.happyHourEnd)}
                            </span>
                          </div>
                        )}
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

export default Section2;
