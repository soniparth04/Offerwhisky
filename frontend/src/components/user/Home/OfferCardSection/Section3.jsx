import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { FcAlarmClock } from "react-icons/fc";

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
        ownerId: { shopName: "Croma" },
        validTill: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        discount: 50,
        primaryDiscount: "Buy 2 Get 1 Free",
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
        ownerId: { shopName: "Teapost" },
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
      {/* Header - Happy Hours (Section1 style, keep content) */}
      <div className="w-full px-4 py-6 sm:py-8 bg-transparent">
        <div className="flex items-center justify-between">
          {/* Left Side: Icon + Title + Subtitle */}
          <div className="flex items-center gap-3">
            <FcAlarmClock className="text-pink-500 w-7 h-7 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                Happy Hours
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-0">
                Limited-time discounts available now
              </p>
            </div>
          </div>

          {/* Right Side: Featured stacked above View All */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
              Sponsored
            </span>
            <button className="text-xs sm:text-sm font-medium flex items-center gap-1 text-pink-500 hover:text-pink-600 transition">
              View All
              <IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards - horizontal scrollable row */}
      <div className="overflow-x-auto scrollbar-hide px-3">
        <div
          className="flex space-x-2 pb-4"
          style={{ width: "max-content" }}
        >
          {offers.map((offer, idx) => {
            const isLiked = likedOffers.has(offer._id);
            // Section1 Happy Hours card logic
            return (
              <div
                key={offer._id}
                className="bg-white overflow-hidden shadow-md border border-gray-100 transition-all duration-300 flex-shrink-0 relative rounded-2xl"
                style={{ width: "180px" }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                    {/* Time Badge at the top left and LIVE tag at the top right, both slightly higher */}
                    {/* Slot timing left and LIVE tag right, horizontally aligned */}
                    <div className="absolute top-2 left-0 w-full flex flex-row items-center justify-between z-20 px-0">
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
                      {offer.offerType === "happyHour" && (
                        <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center animate-pulse mr-2">
                          <GoDotFill className="w-3 h-3 mr-[1px] mt-[1px]" />
                          Live
                        </span>
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
                    {/* Tag: Happy Hours below shop name */}
                    <div className="mt-1">
                      <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-medium">
                        Happy Hours
                      </span>
                    </div>
                    {/* Coupons Left Bar for Happy Hours cards */}
                    <div className="mt-2 mb-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">
                          Coupons Left
                        </span>
                        <span className="text-xs font-bold text-pink-500">
                          {offer.remainingCoupons ?? 0}/60
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                          style={{
                            width: `${
                              offer.remainingCoupons
                                ? (offer.remainingCoupons / 60) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
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

export default Section3;
