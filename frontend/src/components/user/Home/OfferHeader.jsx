import React from "react";
import { Filter } from "lucide-react";
import { IoMdTrendingUp } from "react-icons/io";

const OfferHeader = () => {
  return (
    <div className="w-full px-4 py-6 sm:py-8 bg-transparent">
      <div className="flex items-center justify-between">
        {/* Left Side: Icon (same as Section1) + Title + Subtitle */}
        <div className="flex items-center gap-3">
          <IoMdTrendingUp className="text-red-500 w-7 h-7 flex-shrink-0" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
              Latest Offers Nearby
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-0">
              Discover amazing deals around you
            </p>
          </div>
        </div>

        {/* Right Side: Filter Button */}
        <button className="text-xs sm:text-sm font-medium flex items-center gap-2 text-pink-500 border border-pink-500 px-3 py-1.5 rounded-full">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
};

export default OfferHeader;
