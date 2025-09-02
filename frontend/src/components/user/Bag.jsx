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
        {/* Header with Back Button left, title centered */}
        <div className="flex items-center p-4 bg-white relative">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition absolute left-4"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="w-full flex justify-center">
            <h1 className="text-xl font-bold text-gray-900 text-center">
              Your Bag
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center px-4 pt-20 bg-gray-100">
          {/* Shopping bag */}
          <div className="relative flex justify-center">
            <img src="chatgpt.png" alt="Empty Bag" className="px-10" />
          </div>

          {/* Content below image in two lines, increased width */}
          <div className="text-center space-y-3 mb-10 max-w-xl w-full mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">
              Your bag feels a little empty... let's add some spark!
            </h2>
            <p className="text-gray-400 text-base px-2">
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
