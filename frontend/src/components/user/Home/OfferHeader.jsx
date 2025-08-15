import React from "react";

import {
  Heart,
  Clock,
  MapPin,
  Star,
  Zap,
  Sparkles,
  Gift,
  Filter,
} from "lucide-react";

const OfferHeader = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 to-white p-4 max-w-7xl mx-auto -mt-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Latest Offers Nearby
            </h2>
            <p className="text-gray-600 text-sm">
              Discover amazing deals around you
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2 shadow-sm border">
              <Filter className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferHeader;
