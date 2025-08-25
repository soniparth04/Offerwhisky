import React, { useState } from "react";
import { ChevronLeft, Gift, Star, Trophy, Sparkles, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

export default function Rewards() {
  const [giftPressed, setGiftPressed] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // ✅ Go back if possible
    } else {
      navigate("/"); // ✅ Fallback to home
    }
  };

  const handleStartEarning = () => {
    console.log("Start earning rewards");
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white flex items-center p-3 shadow-sm flex-shrink-0">
        <button 
          onClick={handleBack}
          className="p-1 rounded-full hover:bg-gray-100 mr-3 transition-colors duration-200"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-gray-900">My Rewards</h1>
        <div className="bg-amber-400 text-white rounded-full px-2.5 py-1 flex items-center shadow-sm">
          <Coins className="w-3.5 h-3.5 mr-1" />
          <span className="font-medium text-sm">1052</span>
        </div>
      </div>

      {/* Rewards Balance */}
      <div className="px-4 py-3 bg-gray-50/50 flex-shrink-0">
        <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-medium">Your Balance</p>
              <p className="text-xl font-bold text-gray-900">1,052 Points</p>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col items-center px-4 py-4 overflow-y-auto">
        {/* Central Gift Illustration */}
        <div className="relative mb-4">
          {/* Floating sparkles */}
          {giftPressed && (
            <>
              <div className="absolute -top-1 -left-1 animate-bounce">
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <div className="absolute -top-1 -right-2 animate-bounce delay-100">
                <Star className="w-2.5 h-2.5 text-blue-400 fill-current" />
              </div>
              <div className="absolute -bottom-1 -right-1 animate-bounce delay-200">
                <Sparkles className="w-2.5 h-2.5 text-purple-400" />
              </div>
            </>
          )}
          
          {/* Main gift box */}
          <div
            className={`w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center border-2 border-amber-200 cursor-pointer hover:from-amber-100 hover:to-amber-200 active:scale-95 transition-all duration-200 ${
              giftPressed ? 'scale-110 shadow-lg' : 'shadow-md'
            }`}
            onTouchStart={() => setGiftPressed(true)}
            onTouchEnd={() => setGiftPressed(false)}
            onMouseDown={() => setGiftPressed(true)}
            onMouseUp={() => setGiftPressed(false)}
            onMouseLeave={() => setGiftPressed(false)}
          >
            <Gift className="w-8 h-8 text-amber-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            Keep earning
            <br />
            amazing rewards!
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed max-w-sm px-2">
            Complete activities, make purchases, and unlock exclusive rewards
          </p>
        </div>

        {/* Reward Categories */}
        <div className="grid grid-cols-3 gap-3 mb-4 w-full max-w-sm">
          <div className="bg-white rounded-xl p-3 text-center border border-gray-200 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-1">
              <Star className="w-4 h-4 text-blue-600 fill-current" />
            </div>
            <p className="text-xs font-medium text-gray-800">Points</p>
          </div>

          <div className="bg-white rounded-xl p-3 text-center border border-gray-200 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-1">
              <Gift className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs font-medium text-gray-800">Gifts</p>
          </div>

          <div className="bg-white rounded-xl p-3 text-center border border-gray-200 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-1">
              <Trophy className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xs font-medium text-gray-800">Badges</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 border border-gray-200 mb-4 shadow-sm">
          <div className="flex -space-x-1">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white"></div>
          </div>
          <p className="text-xs text-gray-700">
            <span className="font-semibold text-gray-900">5,432</span> rewards claimed this week
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStartEarning}
          className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 text-white font-semibold py-3 rounded-xl text-base active:scale-95 transition-all duration-200 cursor-pointer shadow-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Continue Earning</span>
          </div>
        </button>
      </div>
    </div>
  );
}
