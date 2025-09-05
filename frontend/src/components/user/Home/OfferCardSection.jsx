import React, { useEffect, useState } from "react";
import { Heart, Clock, MapPin, Gift } from "lucide-react";
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
        title:
          "Grab Your Premium Trimmer at 50% OFF – Limited Time Only. Style Smarter, Save Bigger – Don’t Miss Out!",
        category: "Spotlight",
        offerType: "spotlight",
        image:
          "https://images.philips.com/is/image/philipsconsumer/a59bc3c8e8294d0fa85bae7800c112f5?wid=700&hei=700&$pnglarge$",
        ownerId: { shopName: "Suresh Kumar Ramesh Kumar Electronics" },
        validTill: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours left
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
        validTill: new Date(Date.now() + 6 * 60 * 60 * 1000),
        discount: 33,
        distance: "1.2 km",
        remainingCoupons: 15,
        happyHourEnd: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        happyHourTime: "1PM - 4PM",
      },
      {
        _id: "3",
        title: "Win Exciting Coupons",
        category: "Spin & Win",
        offerType: "spinToWin",
        image:
          "https://cdn.pixabay.com/photo/2021/12/16/03/04/spin-the-wheel-6873663_1280.png",
        ownerId: { shopName: "Vijay Sales" },
        validTill: new Date(Date.now() + 4 * 60 * 60 * 1000),
        discount: 40,
        distance: "2.1 km",
        // Added content properties similar to Spotlight/Happy Hours cards
        description: "Spin the wheel and win exclusive coupons and discounts!",
        remainingCoupons: 20,
        happyHourEnd: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        happyHourTime: "Spin Time",
      },
      {
        _id: "4",
        title:
          "Upgrade Your Wardrobe with Flat 50% OFF on Stylish Clothes. Trendy Looks, Budget-Friendly Prices – Shop Before the Weekend Ends!",
        category: "Spotlight",
        offerType: "spotlight",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-08/interior-shot-racks-with-shirts-undershirts-jeans_2.jpg",
        ownerId: { shopName: "Alex Clothing" },
        validTill: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour left
        discount: 45,
        distance: "0.8 km",
      },
    ];

    setTimeout(() => {
      setOffers(mockOffers);
      setLoading(false);
    }, 1000);
  }, []);

  // Format countdown as HH:MM:SS
  const formatCountdown = (endTime) => {
    const diff = new Date(endTime) - currentTime;
    if (diff <= 0) return "00:00:00";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Check if offer is ending in less than 4 hours
  const isEndingSoon = (endTime) => {
    const diff = new Date(endTime) - currentTime;
    return diff > 0 && diff <= 4 * 60 * 60 * 1000;
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

  const filteredOffers =
    activeFilter === "all"
      ? offers
      : offers.filter((offer) => offer.offerType === activeFilter);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-2 max-w-7xl">
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animate-reverse"></div>
          </div>
        </div>
      ) : filteredOffers.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Gift className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">
            No offers available for this filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          {filteredOffers.map((offer) => {
            const isLiked = likedOffers.has(offer._id);

            // Pick correct expiry (happyHourEnd for HH, else validTill)
            const expiryTime =
              offer.offerType === "happyHour" && offer.happyHourEnd
                ? offer.happyHourEnd
                : offer.validTill;

            return (
              <div
                key={offer._id}
                className="bg-white overflow-hidden shadow-md border border-gray-100 transition-all duration-300 flex-shrink-0 relative rounded-2xl"
                style={{ width: "190px" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                    {/* Live Badges for Happy Hour */}
                    <div className="absolute top-2 left-0 w-full flex flex-row items-center justify-between z-20 px-0">
                      {offer.offerType === "happyHour" && (
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
                            {offer.happyHourTime || "1PM - 4PM"}
                          </div>
                          <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center animate-pulse mr-2">
                            <GoDotFill className="w-3 h-3 mr-[1px] mt-[1px]" />
                            LIVE
                          </span>
                        </>
                      )}
                      {offer.offerType === "spinToWin" && (
                        <div className="absolute top-2 right-2 flex items-center z-30">
                          <div className="bg-fuchsia-500 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse shadow-md">
                            <GoDotFill className="w-2 h-2" />
                            <span>SPIN</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-56 object-cover transition-transform duration-300 rounded-xl"
                    />
                    {/* Discount Badge */}
                    <div className="absolute left-0 bottom-0 w-full h-12 bg-gradient-to-t from-black/65 to-transparent flex items-end justify-center rounded-b-2xl pointer-events-none z-10">
                      <span className="text-white text-base font-bold drop-shadow-lg tracking-wide mb-2 w-40 text-center block mx-auto whitespace-pre-line break-words">
                        {offer.discount
                          ? `${offer.discount}% OFF`
                          : offer.primaryDiscount || ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Shop Name + Like */}
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

                    {/* Tag */}
                    <div className="mt-1">
                      {offer.offerType === "spotlight" ? (
                        <>
                          <span className="bg-purple-200 text-purple-600 px-2 py-0.5 rounded-full text-xs font-medium">
                            Spotlight
                          </span>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {offer.title}
                          </p>
                        </>
                      ) : offer.offerType === "happyHour" ? (
                        <>
                          <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-medium">
                            Happy Hours
                          </span>
                          {/* Optional placeholder for spacing */}
                          <p className="text-xs text-transparent mt-1">
                            Placeholder
                          </p>
                        </>
                      ) : offer.offerType === "spinToWin" ? (
                        <>
                          <span className="bg-fuchsia-200 text-fuchsia-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            Spin & Win
                          </span>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {offer.description || offer.title}
                          </p>
                        </>
                      ) : null}
                    </div>

                    {/* Coupons Left for Happy Hour */}
                    {offer.offerType === "happyHour" &&
                      offer.remainingCoupons && (
                        <div className="-mt-2 mb-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">
                              Coupons Left
                            </span>
                            <span className="text-xs font-bold text-gray-900">
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
                      )}
                  </div>

                  {/* Footer - Countdown (only if < 4h) + Distance */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    {isEndingSoon(
                      offer.offerType === "happyHour" && offer.happyHourEnd
                        ? offer.happyHourEnd
                        : offer.validTill
                    ) ? (
                      <div className="flex items-center space-x-1 text-red-600 min-w-[85px]">
                        <Clock className="w-3 h-3 animate-pulse" />
                        <span className="text-xs font-mono font-bold">
                          {formatCountdown(
                            offer.offerType === "happyHour" &&
                              offer.happyHourEnd
                              ? offer.happyHourEnd
                              : offer.validTill
                          )}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-red-600 min-w-[85px]">
                        <Clock className="w-3 h-3 animate-pulse" />
                        <span className="text-xs font-mono font-bold">
                          {formatCountdown(
                            offer.offerType === "happyHour" &&
                              offer.happyHourEnd
                              ? offer.happyHourEnd
                              : offer.validTill
                          )}
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OfferCardSection;
