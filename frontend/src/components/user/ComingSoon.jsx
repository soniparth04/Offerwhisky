import React from "react";
import Navbar from "./Navbar";
import ComingSoonImg from "../../assets/ComingSoon.png";
// import Header from "./Header";

const ComingSoon = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header at the very top, like Bag */}
      <div className="items-center gap-4 p-4 bg-white border-b border-gray-300 w-full">
        <h1 className="text-xl font-bold text-gray-900 text-center mt-1">
          Coming Soon
        </h1>
      </div>
      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-start px-6 pt-8">
        {/* Center image with animation */}
        <img
          src={ComingSoonImg}
          alt="Coming Soon"
          className="w-80 h-80 object-contain mb-8"
        />
        {/* Energetic and FOMO creating text with animation */}
  <div className="text-center max-w-lg">
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Get ready for the most <strong>exclusive local deals</strong> you've
            ever seen! Our team is working day and night to bring you offers so
            good.
          </p>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default ComingSoon;
