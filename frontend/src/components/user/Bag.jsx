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
    <div className="h-screen bg-gray-50">
      <div className="h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="items-center gap-4 p-4 bg-white">
          <h1 className="text-xl font-bold text-gray-900 text-center">
            My Booked Offers
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex-col items-center justify-center px-10 pt-10 bg-gray-100">
          {/* Shopping bag */}
          <div className="relative">
            <img src="chatgpt.png" alt="Empty Bag" className="w-100 h-100" />
          </div>

          {/* Content */}
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">
              No offers in your bag yet.
            </h2>

            <p className="text-gray-400 text-base px-2">
              <span className="font-medium truncate">
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
              Grab Best Deals
            </button>
          </div>
          {/* Extra Spacing For Better View Of Content */}
          <div className="mb-11"></div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Bag;
