import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Navigation, TrendingUp, Star, Eye } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const Section7 = () => {
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

  // Mock data for Latest Offer Nearby
  useEffect(() => {
    const mockOffers = [
      {
        _id: "nearby1",
        title: "Fresh Bakery Corner",
        description: "Daily fresh baked goods - breads, pastries, cakes and cookies at best prices",
        category: "Latest Nearby",
        offerType: "nearby",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=500&fit=crop",
        ownerId: { shopName: "Golden Crust" },
        validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        discount: 30,
        primaryDiscount: "Buy 2 Get 1",
        secondaryDiscount: "+ Fresh Daily",
        categoryText: "Bakery",
        distance: "0.1 km",
        rating: 4.8,
        views: 1240,
        originalPrice: 299,
        salePrice: 199,
        happyHourEnd: new Date(Date.now() + 4 * 60 * 60 * 1000),
        happyHourTime: "Morning Fresh",
        couponsLeft: 18,
        totalCoupons: 40,
      },
      {
        _id: "nearby2",
        title: "Fitness Zone Outlet",
        description: "Complete workout equipment and fitness accessories for home gym setup",
        category: "Latest Nearby",
        offerType: "nearby",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
        ownerId: { shopName: "FitZone Sports" },
        validTill: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        discount: 55,
        primaryDiscount: "55% OFF",
        secondaryDiscount: "+ Free Setup",
        categoryText: "Fitness",
        distance: "0.2 km",
        rating: 4.7,
        views: 890,
        originalPrice: 4999,
        salePrice: 2249,
        happyHourEnd: new Date(Date.now() + 6 * 60 * 60 * 1000),
        happyHourTime: "Fitness Hours",
      },
      {
        _id: "nearby3",
        title: "Book Lovers Paradise",
        description: "Huge collection of novels, academic books and magazines with reading discounts",
        category: "Latest Nearby",
        offerType: "nearby",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
        ownerId: { shopName: "Chapter & Verse" },
        validTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        discount: 40,
        primaryDiscount: "40% OFF",
        secondaryDiscount: "+ Book Club",
        categoryText: "Literature",
        distance: "0.3 km",
        rating: 4.9,
        views: 1560,
        originalPrice: 799,
        salePrice: 479,
        happyHourEnd: new Date(Date.now() + 5 * 60 * 60 * 1000),
        happyHourTime: "Reading Hours",
      },
      {
        _id: "nearby4",
        title: "Pet Care Essentials",
        description: "Complete pet care products, food, toys and accessories for your furry friends",
        category: "Latest Nearby",
        offerType: "nearby",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=500&fit=crop",
        ownerId: { shopName: "Happy Paws" },
        validTill: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        discount: 45,
        primaryDiscount: "45% OFF",
        secondaryDiscount: "+ Grooming",
        categoryText: "Pet Care",
        distance: "0.4 km",
        rating: 4.6,
        views: 780,
        originalPrice: 1299,
        salePrice: 714,
        happyHourEnd: new Date(Date.now() + 3 * 60 * 60 * 1000),
        happyHourTime: "Pet Special",
        couponsLeft: 7,
        totalCoupons: 30,
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
            <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      {/* Header - Latest Offer Nearby (Section1 style, keep content) */}
      <div className="w-full px-4 py-6 sm:py-8 bg-transparent">
        <div className="flex items-center justify-between">
          {/* Left Side: Icon + Title + Subtitle */}
          <div className="flex items-center gap-3">
            <Navigation className="text-blue-400 w-7 h-7 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                Latest Offer Nearby
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-0">
                Fresh deals just around the corner
              </p>
            </div>
          </div>

          {/* Right Side: Featured stacked above View All */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-black font-medium">
              Featured
            </span>
            <button className="text-xs sm:text-sm font-medium flex items-center gap-1 text-pink-500 hover:text-pink-600 transition">
              View All
              <IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards (match Section1 UI, Happy Hours at first/last, Spotlight in middle) */}
      <div className="overflow-x-auto scrollbar-hide px-3">
        <div className="flex space-x-3 pb-4" style={{ width: 'max-content' }}>
          {offers.map((offer, idx) => {
            const isLiked = likedOffers.has(offer._id);
            const isHappyHours = idx === 0 || idx === offers.length - 1;
            const isSpotlight = idx === 1 || idx === 2;
            return (
              <div
                key={offer._id}
          className="bg-white overflow-hidden shadow-md border border-gray-100 flex-shrink-0 relative rounded-2xl"
                style={{ width: '180px' }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                    {/* Time Badge (left, full width) */}
                    <div className="absolute top-4 left-2 right-2 z-20 flex flex-row items-center justify-start">
                      <div className="bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md text-xs">
                        {offer.happyHourTime}
                      </div>
                    </div>
                    <img
                      src={offer.image}
                      alt={offer.title}
            className="w-[98%] h-[95%] object-cover rounded-xl"
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
                  {/* Shop Name, Like Button & Tag */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-900 truncate">
                        {offer.ownerId?.shopName}
                      </h3>
                      <button
                        onClick={() => toggleLike(offer._id)}
                          className="ml-2 rounded-full p-1"
                        aria-label={isLiked ? 'Unlike' : 'Like'}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked ? 'text-blue-500 fill-current' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                    {/* Tag and description logic */}
                    <div className="mt-1">
                      {isSpotlight ? (
                        <>
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg">
                            Spotlight
                          </span>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {offer.description}
                          </p>
                        </>
                      ) : (
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg">
                          Happy Hours
                        </span>
                      )}
                    </div>
                    {/* Coupons Left Bar for Happy Hours cards (first/last) */}
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
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
                            style={{
                              width: `${typeof offer.couponsLeft === 'number' && typeof offer.totalCoupons === 'number' && offer.totalCoupons > 0 ? (offer.couponsLeft / offer.totalCoupons) * 100 : 0}%`,
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

export default Section7;