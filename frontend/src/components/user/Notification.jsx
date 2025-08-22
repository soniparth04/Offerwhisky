import { useState } from "react";
import {
  ChevronLeft,
  X,
  Bell,
  Package,
  Percent,
  Gift,
  Clock,
  ShoppingBag,
  Star,
  Heart,
  Zap,
  Tag,
  MapPin,
} from "lucide-react";

export default function Notification({ onBack = () => window.history.back() }) {
  // Enhanced mock data with varied notification types including images
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "deal",
      title: "Flash Sale Alert! 🔥",
      description:
        "Electronics Hub is offering up to 60% off on smartphones. Limited time offer ends in 2 hours!",
      time: "2m",
      unread: true,
      icon: Percent,
      color: "bg-red-50 text-red-600",
      hasImage: true,
      brandLogo: "./OfferWhisky.png",
      brandName: "Electronics Hub",
      offerText: "EXTRA 15% OFF",
      couponCode: "FLASH60",
      buttonText: "Grab Offer",
      buttonStyle: "border-2 border-purple-700 text-purple-700",
    },
    {
      id: 2,
      type: "fashion",
      title: "Great Fashion Fest is LIVE ✨",
      description: "Grab trendy fits Starting ₹149 + Extra 15% Off",
      couponCode: "TRYGLITCHEZ",
      time: "15m",
      unread: true,
      icon: Gift,
      color: "bg-purple-50 text-purple-600",
      hasImage: true,
      brandLogo: "./OfferWhisky.png",
      brandName: "Fashion Store",
      offerText: "Starting ₹149",
      buttonText: "Grab Offer",
      buttonStyle: "border-2 border-purple-700 text-purple-700",
    },
    {
      id: 3,
      type: "order",
      title: "Order Delivered Successfully",
      description:
        "Your order #12345 has been delivered. Rate your experience and help others!",
      time: "1h",
      unread: true,
      icon: Package,
      color: "bg-green-50 text-green-600",
      hasImage: false,
      brandLogo: "./OfferWhisky.png",
      brandName: "DeliveryApp",
      buttonText: "Rate Order",
      buttonStyle: "border-2 border-purple-700 text-purple-700",
    },
    {
      id: 4,
      type: "deal",
      title: "Best deal of the day is ready for you 🛍️",
      description:
        "On Tommy Hilfiger & Calvin Klein Claim Deal Only on Fashion Store",
      time: "3h",
      unread: false,
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
      hasImage: false,
      brandLogo: "./OfferWhisky.png",
      brandName: "Fashion Store",
      offerText: "Up to 70% OFF",
      buttonText: "Grab Offer",
      buttonStyle: "border-2 border-purple-700 text-purple-700",
    },
    {
      id: 5,
      type: "reminder",
      title: "Cart Reminder",
      description:
        "You have 3 items waiting in your cart. Complete your purchase before they go out of stock!",
      time: "5h",
      unread: false,
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
      hasImage: false,
      brandLogo: "./OfferWhisky.png",
      brandName: "Shopping App",
      buttonText: "Complete Purchase",
      buttonStyle: "border-2 border-purple-700 text-purple-700",
    },
    {
      id: 6,
      type: "location",
      title: "New Store Near You!",
      description:
        "Grocery Plus just opened 500m away. Get 25% off on your first order with code WELCOME25.",
      time: "1d",
      unread: false,
      icon: MapPin,
      color: "bg-emerald-50 text-emerald-600",
      hasImage: false,
      brandLogo: "./OfferWhisky.png",
      brandName: "Grocery Plus",
      offerText: "25% OFF",
      couponCode: "WELCOME25",
      buttonText: "Order Now",
      buttonStyle: "border-2 border-purple-700 text-purple-700",
    },
  ]);

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="bg-gray-50 flex flex-col w-full h-full min-h-screen">
      {/* Header */}
      <div className="bg-white w-full flex items-center justify-between p-4 shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="ml-1 bg-purple-700 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="text-sm font-medium text-purple-700 hover:text-purple-800"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 p-4">
        {notifications.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center px-6 mt-20">
            {/* Empty State */}
            <div className="text-center mb-12">
              <h2 className="text-gray-500 font-medium text-sm tracking-wide uppercase mb-3">
                NO NOTIFICATIONS
              </h2>
              <p className="text-gray-500 text-sm max-w-xs">
                Stay Tuned - Exclusive deals will pop up here soon
              </p>
            </div>
            {/* Skeleton Placeholders */}
            <div className="w-full max-w-sm mx-auto space-y-6">
              {/* Pink notification placeholder */}
              <div className="h-16 bg-pink-200 rounded-2xl opacity-40 p-3 flex items-center gap-3 rotate-2">
                <div className="flex w-8 h-8 bg-white/50 rounded-full justify-center items-center">
                  <Bell className="text-black/20 w-4 h-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 bg-pink-300 rounded w-2/5"></div>
                  <div className="h-3 bg-pink-300 rounded w-4/5"></div>
                </div>
                <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
              </div>
              {/* Orange notification placeholder */}
              <div className="h-16 bg-orange-200 rounded-2xl opacity-40 p-3 flex items-center gap-3 -rotate-2">
                <div className="flex w-8 h-8 bg-white/50 rounded-full justify-center items-center">
                  <Bell className="text-black/20 w-4 h-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 bg-orange-300 rounded w-2/5"></div>
                  <div className="h-3 bg-orange-300 rounded w-4/5"></div>
                </div>
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              </div>
              {/* Blue notification placeholder */}
              <div className="h-16 bg-blue-200 rounded-2xl opacity-40 p-3 flex items-center gap-3">
                <div className="flex w-8 h-8 bg-white/50 rounded-full justify-center items-center">
                  <Bell className="text-black/20 w-4 h-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 bg-blue-300 rounded w-2/5"></div>
                  <div className="h-3 bg-blue-300 rounded w-4/5"></div>
                </div>
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          // Notifications list with card design
          <div className="space-y-4 max-w-lg mx-auto">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                    notification.unread ? "ring-2 ring-blue-100" : ""
                  }`}
                >
                  {/* Close button */}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="absolute top-3 right-3 z-10 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white shadow-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Unread indicator */}
                  {notification.unread && (
                    <div className="absolute top-3 left-3 w-2 h-2 bg-purple-700 rounded-full z-10 animate-pulse"></div>
                  )}

                  {/* Image section for notifications with images */}
                  {notification.hasImage && (
                    <div className="relative h-48 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 overflow-hidden">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative h-full flex items-center justify-center">
                        {/* Mock fashion image content */}
                        <div className="text-center text-white">
                          <img
                            src="https://i.ytimg.com/vi/EWvsIS4y1ro/maxresdefault.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content section */}
                  <div className="p-4">
                    {/* Brand info */}
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-sm">
                        <img src={notification.brandLogo} alt="Logo" />
                      </div>
                      <div className="">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-0.5">
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {notification.brandName}
                          </span>
                          {notification.offerText && !notification.hasImage && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                              {notification.offerText}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {notification.description}
                    </p>

                    {/* Coupon code for non-image notifications */}
                    {notification.couponCode && !notification.hasImage && (
                      <div className=" p-3 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">
                          Use Code:
                        </div>
                        <div className="font-mono text-sm font-semibold text-gray-900">
                          {notification.couponCode}
                        </div>
                      </div>
                    )}

                    <span className="flex text-xs text-gray-400 items-center mt-2">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {notification.time} ago
                    </span>

                    {/* Action button */}
                    <button
                      className={`w-full py-3 px-4 mt-3 rounded-xl font-semibold text-sm transition-all duration-200 transform active:scale-98 ${notification.buttonStyle} shadow-lg hover:shadow-xl`}
                    >
                      {notification.buttonText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
