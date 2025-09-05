import React from "react";
import { ArrowLeft, Store, Calendar, Gift, Zap } from "lucide-react";
import { useState } from "react";

const ComingSoon = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  const handleBack = () => {
    window.history.back();
  };

  const features = [
    {
      icon: Store,
      title: "New Openings",
      description: "Discover new businesses first",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Calendar,
      title: "Exclusive Events",
      description: "VIP access to special events",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Gift,
      title: "Special Deals",
      description: "Personalized offers for you",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Zap,
      title: "Flash Sales",
      description: "Limited-time amazing offers",
      color: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      {/* Header - kept the same */}
      <div
        className="bg-white w-full flex items-center justify-between p-4 shadow-sm border-b border-gray-100 sticky top-0 z-10"
        style={{ height: "64px" }}
      >
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 tracking-wide">
            Hots Tab
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-md">
          {/* Title */}
          <div>
            <h2
              className="text-4xl font-bold bg-gradient-to-r from-fuchsia-500 via-purple-600 to-blue-500
 text-transparent bg-clip-text mb-2 h-11"
            >
              Coming Soon
            </h2>
            <p className="text-gray-600 text-lg">
              Get ready for amazing local deals!
            </p>
          </div>

          {/* Alert Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full border border-orange-200">
            <span className="text-orange-700 font-medium text-sm">
              Hots Tab launching soon with exclusive offers
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="w-full max-w-sm">
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
            What's Coming
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
