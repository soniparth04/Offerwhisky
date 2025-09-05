import React from "react";
import Navbar from "./Navbar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Bag = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleStartShopping = () => {
    console.log("Navigate to shopping");
  };

  return (
    <div className="h-screen bg-gray-50">
      <div className="h-screen bg-gray-100 flex flex-col">
        {/* Header - matches Wishlist */}
        <div className="bg-white w-full flex items-center justify-between p-4 shadow-sm border-b border-gray-100 sticky top-0 z-10" style={{height: "64px"}}>
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 tracking-wide">Your Bag</h1>
          </div>
          <div style={{width: '32px'}}></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center px-4 pt-20 bg-gray-100">
          {/* Shopping bag */}
          <div className="relative flex justify-center">
            <img src="chatgpt.png" alt="Empty Bag" className="px-10" />
          </div>

          {/* Content below image - optimized for mobile view */}
          <div className="text-center space-y-2 mb-8 max-w-md w-full mx-auto px-2">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 leading-tight">
              Your bag feels a little empty... let's add some spark!
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              <span className="font-medium block">
                Unlock exclusive deals waiting just for you!
              </span>
            </p>
          </div>

          {/* CTA Button */}
          <div className="w-full px-20 max-w-xl mx-auto -mt-6">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 
               hover:opacity-90 text-white font-semibold py-3 rounded-2xl text-lg 
               shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] 
               transition-all duration-200 ease-out"
            >
              Let's Go
            </button>
          </div>

          {/* Extra Spacing For Better View Of Content */}
          <div className="mb-11"></div>
        </div>
      </div>
    </div>
  );
};

export default Bag;
