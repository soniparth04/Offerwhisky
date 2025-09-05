import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Flame, Star, Eye } from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { BsFire } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

const Section1 = () => {
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

  // Mock data for Today Hot Pic
  useEffect(() => {
    const mockOffers = [
      {
        _id: "hot1",
        title: "Premium Gaming Setup",
        description:
          "Complete gaming setup with RGB lighting and high-performance accessories",
        category: "Today Hot Pic",
        offerType: "hotPick",
        image:
          "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=500&fit=crop",
        ownerId: { shopName: "GameZone Pro" },
        validTill: new Date(Date.now() + 8 * 60 * 60 * 1000),
        discount: 70,
        primaryDiscount: "70% OFF",
        secondaryDiscount: "+ Free Setup",
        categoryText: "Gaming",
        distance: "0.2 km",
        rating: 4.8,
        views: 1240,
        originalPrice: 2999,
        salePrice: 899,
        happyHourEnd: new Date(Date.now() + 6 * 60 * 60 * 1000),
        happyHourTime: "",
        couponsLeft: 45,
        totalCoupons: 60,
      },
      {
        _id: "hot2",
        title: "Designer Fashion Collection",
        description:
          "Exclusive designer wear with premium fabrics and latest fashion trends",
        category: "Today Hot Pic",
        offerType: "hotPick",
        image:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop",
        ownerId: { shopName: "Elite Fashion" },
        validTill: new Date(Date.now() + 10 * 60 * 60 * 1000),
        discount: 65,
        primaryDiscount: "65% OFF",
        secondaryDiscount: "+ Extra 10%",
        categoryText: "Fashion",
        distance: "0.4 km",
        rating: 4.9,
        views: 2150,
        originalPrice: 1999,
        salePrice: 699,
        happyHourEnd: new Date(Date.now() + 4 * 60 * 60 * 1000),
        happyHourTime: "1PM - 4PM",
        couponsLeft: 28,
        totalCoupons: 60,
      },
      {
        _id: "hot3",
        title: "Smart Home Devices",
        description:
          "Latest smart home automation devices with voice control and app integration",
        category: "Today Hot Pic",
        offerType: "hotPick",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop",
        ownerId: { shopName: "SmartTech" },
        validTill: new Date(Date.now() + 12 * 60 * 60 * 1000),
        discount: 55,
        primaryDiscount: "55% OFF",
        secondaryDiscount: "+ Installation",
        categoryText: "Technology",
        distance: "0.6 km",
        rating: 4.7,
        views: 890,
        originalPrice: 4599,
        salePrice: 2069,
        happyHourEnd: new Date(Date.now() + 8 * 60 * 60 * 1000),
        happyHourTime: "",
        couponsLeft: 36,
        totalCoupons: 60,
      },
      {
        _id: "hot4",
        title: "Fitness & Wellness Kit",
        description:
          "Complete fitness package with equipment, supplements and workout guides",
        category: "Today Hot Pic",
        offerType: "hotPick",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
        ownerId: { shopName: "FitLife Premium" },
        validTill: new Date(Date.now() + 6 * 60 * 60 * 1000),
        discount: 60,
        primaryDiscount: "60% OFF",
        secondaryDiscount: "+ Training",
        categoryText: "Fitness",
        distance: "0.8 km",
        rating: 4.6,
        views: 1780,
        originalPrice: 3499,
        salePrice: 1399,
        happyHourEnd: new Date(Date.now() + 3 * 60 * 60 * 1000),
        happyHourTime: "1PM - 4PM",
        couponsLeft: 20,
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
            <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      {/* Header - match Section2 alignment and layout */}
      <div className="w-full px-4 py-6 sm:py-8 bg-transparent">
        <div className="flex items-center justify-between">
          {/* Left Side: Icon + Title + Subtitle */}
          <div className="flex items-center gap-3">
            <BsFire className="text-red-500 w-7 h-7 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                Today Hot Picks
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-0">
                Featured deals you can't miss!
              </p>
            </div>
          </div>
          {/* Right Side: Featured stacked above View All */}
           <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
              Featured
            </span>
            <button className="text-xs sm:text-sm font-medium flex items-center gap-1 text-pink-500 hover:text-pink-600 transition">
              View All
              <IoIosArrowForward className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards - horizontal scrollable row, improved UI, match Section2 size */}
      <div className="overflow-x-auto scrollbar-hide px-3">
        <div className="flex space-x-2 pb-4" style={{ width: "max-content" }}>
          {offers.map((offer, idx) => {
            const isLiked = likedOffers.has(offer._id);
            return (
              <div
                key={offer._id}
                className="bg-white overflow-hidden shadow-md border border-gray-100 transition-all duration-300 flex-shrink-0 relative rounded-2xl"
                style={{ width: "180px" }}
              >
                {/* Image Container - match Section2 image size and style */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                    {/* HOT and Time Badges in a single row at the top, improved position */}
                    <div className="absolute top-2 left-0 w-full flex flex-row items-center justify-between z-20 px-0">
                      {offer.happyHourTime && (
                        <>
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
                          <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center animate-pulse mr-2">
                            <GoDotFill className="w-3 h-3 mr-[1px] mt-[1px]" />
                            LIVE
                          </span>
                        </>
                      )}
                    </div>
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
                              ? "text-red-500 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                    {/* Tag: Spotlight or Happy Hours below shop name */}
                    <div className="mt-1">
                      {idx % 2 === 0 ? (
                        <>
                          <span className="bg-purple-200 text-purple-600 px-2 py-0.5 rounded-full text-xs font-medium">
                            Spotlight
                          </span>
                          {/* Product description below Spotlight tag */}
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {offer.description}
                          </p>
                        </>
                      ) : (
                        offer.happyHourTime && (
                          <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-medium">
                            Happy Hours
                          </span>
                        )
                      )}
                    </div>
                    {/* Coupons Left Bar for Happy Hours cards */}
                    {idx % 2 === 1 && offer.happyHourTime && (
                      <div className="mt-2 mb-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">
                            Coupons Left
                          </span>
                          <span className="text-xs font-bold text-pink-500">
                            {offer.couponsLeft ?? 0}/{offer.totalCoupons ?? 60}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Section1;
