import React from "react";

import {
  Filter,
} from "lucide-react";

const OfferHeader = () => {
  return (
    <>
  <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 py-6 sm:py-8 w-full relative overflow-hidden px-3 mx-auto -mt-2">
        {/* Background Pattern */}
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute top-1 right-3 w-8 h-8 sm:w-12 sm:h-12 border border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border border-white rounded-full animate-bounce"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-0.5">
              Latest Offers Nearby
            </h2>
            <p className="text-white/90 text-xs">
              Discover amazing deals around you
            </p>
          </div>
          <button className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-full transition flex items-center space-x-2">
            <Filter className="w-4 h-4 text-white" />
            <span>Filter</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default OfferHeader;
