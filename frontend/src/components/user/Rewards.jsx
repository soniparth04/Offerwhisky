import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';


export default function Rewards() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white flex items-center p-4 shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1 rounded-full hover:bg-gray-100 mr-3"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold flex-1">Rewards</h1>
        <div className="bg-amber-400 text-white rounded-full px-3 py-1 flex items-center">
          <span className="mr-1">🪙</span>
          <span className="font-medium">1052</span>
        </div>
      </div>
      
    </div>
  );
}
