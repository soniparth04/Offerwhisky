import React, { useState } from "react";
import { ArrowLeft, Bell, Settings } from "lucide-react";

export default function Notification() {
  const handleBack = () => {
    console.log("Navigate back");
  };

  const handleSettings = () => {
    console.log("Open notification settings");
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white">
        <button
          onClick={handleBack}
          className="flex items-center justify-center transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-medium text-gray-900">Notifications</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        {/* Empty State */}
        <div className="text-center mb-12">
          <h2 className="text-gray-400 font-medium text-sm tracking-wide uppercase mb-3">
            NO NOTIFICATIONS
          </h2>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            We will notify you once we have something for you
          </p>
        </div>

        {/* Skeleton Placeholders */}
        <div className="w-full max-w-sm space-y-6">
          {/* Pink notification placeholder */}
          <div className="h-16 bg-pink-200 rounded-2xl opacity-40 p-3 flex items-center gap-3 rotate-2">
            <div className="flex w-8 h-8 bg-white/50 rounded-full justify-center items-center">
              <Bell className="color text-black/20" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-2 bg-pink-300 rounded w-2/5"></div>
              <div className="h-3 bg-pink-300 rounded w-4/5"></div>
            </div>
            <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
          </div>

          {/* Orange notification placeholder */}
          <div className="h-16 bg-orange-200 rounded-2xl opacity-40 p-3 flex items-center gap-3 -rotate-2">
            <div className="flex w-8 h-8 bg-white/50 rounded-full justify-center items-center">
              <Bell className="color text-black/20" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-2 bg-orange-300 rounded w-2/5"></div>
              <div className="h-3 bg-orange-300 rounded w-4/5"></div>
            </div>
            <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
          </div>

          {/* Blue notification placeholder */}
          <div className="h-16 bg-blue-200 rounded-2xl opacity-40 p-3 flex items-center gap-3">
            <div className="flex w-8 h-8 bg-white/50 rounded-full justify-center items-center">
              <Bell className="color text-black/20" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-2 bg-blue-300 rounded w-2/5"></div>
              <div className="h-3 bg-blue-300 rounded w-4/5"></div>
            </div>
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
