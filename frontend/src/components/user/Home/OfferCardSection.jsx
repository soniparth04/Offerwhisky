import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Star, Gift } from "lucide-react";
import { GoDotFill } from "react-icons/go";

const OfferCardSection = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedOffers, setLikedOffers] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for demonstration - replace with your API call
  useEffect(() => {
    const mockOffers = [
      {
        _id: "1",
        title: "50% Off on Trimmer",
        category: "Spotlight",
        offerType: "spotlight",
        image:
          "https://images.philips.com/is/image/philipsconsumer/a59bc3c8e8294d0fa85bae7800c112f5?wid=700&hei=700&$pnglarge$",
        ownerId: { shopName: "Suresh Kumar Ramesh Kumar Electronics" },
        validTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        discount: 50,
        distance: "0.5 km",
      },
      {
        _id: "2",
        title: "Buy 2 Get 1 Free",
        category: "Happy Hours",
        offerType: "happyHour",
        image:
          "https://suwasthi.com/cdn/shop/products/GiloyTulsiJuice_1.jpg?v=1608965903&width=480",
        ownerId: { shopName: "Sharma Medical" },
        validTill: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        discount: 33,
        distance: "1.2 km",
        remainingCoupons: 15,
        happyHourEnd: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      },
      {
        _id: "3",
        title: "Win Exciting Coupons",
        category: "Spin & Win",
        offerType: "spinToWin",
        image:
          "https://cdn.pixabay.com/photo/2021/12/16/03/04/spin-the-wheel-6873663_1280.png",
        ownerId: { shopName: "Vijay Sales" },
        validTill: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        discount: 40,
        distance: "2.1 km",
      },
      {
        _id: "4",
        title: "Weekend Special offer",
        category: "Spotlight",
        offerType: "spotlight",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-08/interior-shot-racks-with-shirts-undershirts-jeans_2.jpg",
        ownerId: { shopName: "Alex Clothing" },
        validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        discount: 45,
        distance: "0.8 km",
      },
    ];

    setTimeout(() => {
      setOffers(mockOffers);
      setLoading(false);
    }, 1000);
  }, []);

  const getCategoryColors = (offerType) => {
    const colors = {
      spotlight: {
        category: "bg-purple-200 text-purple-600",
        discount: "bg-purple-500 text-white",
      },
      happyHour: {
        category: "bg-pink-200 text-pink-600",
        discount: "bg-pink-500 text-white",
      },
      spinToWin: {
        category: "bg-blue-200 text-blue-600",
        discount: "bg-blue-500 text-white",
      },
    };
    return (
      colors[offerType] || {
        category: "bg-gray-200 text-gray-600",
        discount: "bg-gray-500 text-white",
      }
    );
  };

  const getOfferTypeBadge = (type) => {
    const badges = {
      spotlight: {
        text: "Spotlight",
        color: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
      },
      happyHour: {
        text: "Happy Hour",
        color: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
      },
      spinToWin: {
        text: "Spin to Win",
        color: "bg-gradient-to-r from-green-400 to-blue-500 text-white",
      },
    };
    return badges[type] || { text: "Special", color: "bg-gray-500 text-white" };
  };

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

  const getTimeLeft = (validTill) => {
    const now = new Date();
    const diff = new Date(validTill) - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d left`;
    if (hours > 0) return `${hours}h left`;
    return "Ending soon";
  };

  const getHappyHourCountdown = (happyHourEnd) => {
    const now = currentTime;
    const diff = new Date(happyHourEnd) - now;

    if (diff <= 0) return "00:00:00";

    const hours = Math.floor(diff / (2000 * 60 * 60));
    const minutes = Math.floor((diff % (500 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const filteredOffers =
    activeFilter === "all"
      ? offers
      : offers.filter((offer) => offer.offerType === activeFilter);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-2 max-w-7xl m-auto">
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animate-reverse"></div>
          </div>
        </div>
      ) : // Offers Grid
      filteredOffers.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Gift className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">
            No offers available for this filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          {filteredOffers.map((offer) => {
            const offerTypeBadge = getOfferTypeBadge(offer.offerType);
            const isLiked = likedOffers.has(offer._id);
            const categoryColors = getCategoryColors(offer.offerType);

            return (
              <div
                key={offer._id}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-40 bg-gray-100">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 opacity-100 -mt-1">
                    <span
                      className={`${categoryColors.discount} px-1.5 py-0.5 rounded-full text-xs font-bold shadow-lg animate-pulse`}
                    >
                      {offer.discount}% OFF
                    </span>
                  </div>

                  {/* Live Tag for Happy Hours */}
                  {offer.offerType === "happyHour" && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center animate-pulse">
                        <GoDotFill className="w-3 h-3 mr-[1px] mt-[1px]" />
                        Live
                      </span>
                    </div>
                  )}
                  {offer.offerType === "happyHour" && (
                    <span className="absolute bottom-2 left-2 bg-black/50 text-white  text-[10px] rounded-full px-1">
                      Wed, 1PM - 4PM
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Shop Info */}
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-black text-sm font-medium truncate">
                      {offer.ownerId?.shopName}
                    </p>
                    {/* Heart Icon */}
                    <button
                      onClick={() => toggleLike(offer._id)}
                      className="bg-white/90 rounded-full"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isLiked
                            ? "text-red-500 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-bold text-gray-500 mb-2">
                    {offer.title}
                  </h3>

                  {/* Remaining Coupons for Happy Hours with Progress Bar */}
                  {offer.offerType === "happyHour" &&
                    offer.remainingCoupons && (
                      <div className="mb-2 flex">
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                            style={{
                              width: `${(offer.remainingCoupons / 50) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between -mt-2 ml-1">
                          <span className="text-pink-500 font-bold text-[13px]">
                            [{offer.remainingCoupons}/60]
                          </span>
                        </div>
                      </div>
                    )}

                  {/* Category and Distance */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`${categoryColors.category} px-1.5 py-0.5 rounded-full text-xs font-medium`}
                    >
                      {offer.category}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    {/* Happy Hour Countdown or Regular Time Left */}
                    {offer.offerType === "happyHour" && offer.happyHourEnd ? (
                      <div className="flex items-center space-x-1 text-orange-600 mt-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-bold font-mono">
                          {getHappyHourCountdown(offer.happyHourEnd)}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-500 transform translate-x-9">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{offer.distance}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-orange-600 mt-1.5">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-medium">
                          {getTimeLeft(offer.validTill)}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-500 transform translate-x-14">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{offer.distance}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OfferCardSection;
