import React from "react";
import Navbar from "./Navbar";
import { ArrowLeft } from "lucide-react";

const Bag = () => {
  const handleBack = () => {
    console.log("Navigate back");
  };

  const handleStartShopping = () => {
    console.log("Navigate to shopping");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="items-center gap-4 p-4 bg-white">
          <h1 className="text-lg font-semibold text-gray-900 text-center">
            My Booked Offers
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 bg-gray-100">
          {/* Sad Shopping Bag Illustration */}
          <div className="relative mb-12">
            {/* Radiating lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Left lines */}
              <div className="absolute left-0 top-1/2 transform -translate-y-5 -translate-x-8">
                <div className="w-8 h-1 bg-blue-400 rounded-full rotate-45 mb-5"></div>
                <div className="w-6 h-1 bg-blue-400 rounded-full rotate-12 mb-5"></div>
                <div className="w-10 h-1 bg-blue-400 rounded-full -rotate-12"></div>
              </div>

              {/* Right lines */}
              <div className="absolute right-0 top-1/2 transform -translate-y-5 translate-x-8">
                <div className="w-8 h-1 bg-blue-400 rounded-full -rotate-45 mb-5"></div>
                <div className="w-6 h-1 bg-blue-400 rounded-full -rotate-12 mb-5"></div>
                <div className="w-10 h-1 bg-blue-400 rounded-full rotate-12"></div>
              </div>
            </div>

            {/* Question marks */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              <span className="text-4xl text-blue-400 font-bold">?</span>
              <span className="text-3xl text-blue-400 font-bold">?</span>
              <span className="text-4xl text-blue-400 font-bold">?</span>
            </div>

            {/* Shopping bag */}
            <div className="relative">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="mx-auto"
              >
                {/* Bag body */}
                <rect
                  x="20"
                  y="35"
                  width="80"
                  height="70"
                  rx="8"
                  fill="#6B7280"
                  stroke="#374151"
                  strokeWidth="3"
                />

                {/* Bag handles */}
                <path
                  d="M35 35 Q35 20 50 20 Q65 20 65 35"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M55 35 Q55 20 70 20 Q85 20 85 35"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Sad face */}
                <circle cx="45" cy="55" r="2" fill="#374151" />
                <circle cx="75" cy="55" r="2" fill="#374151" />
                <path
                  d="M45 75 Q60 65 75 75"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">
              No offers in your bag yet.
            </h2>

            <p className="text-gray-600 text-base px-2">
              Don’t let the savings slip away.
              <br />
              <span className="text-pink-600 font-medium truncate">
                Unlock exclusive deals waiting just for you!
              </span>
            </p>
          </div>

          {/* CTA Button */}
          <div className="w-full px-20">
            <button
              onClick={handleStartShopping}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 
               hover:opacity-90 text-white font-semibold py-3 rounded-2xl text-lg 
               shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] 
               transition-all duration-200 ease-out"
            >
              See Best Offers
            </button>
          </div>

          {/* Bottom spacing for safe area */}
          <div className="h-8"></div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Bag;
