import React, { useState } from 'react';

const OfferTypeNavigation = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { 
      id: 'all', 
      label: 'All Offers',
      activeGradient: 'from-blue-500/90 to-blue-600/90',
      activeBorder: 'border-blue-300/30'
    },
    { 
      id: 'spotlight', 
      label: 'Spotlight',
      activeGradient: 'from-amber-500/90 to-yellow-500/90',
      activeBorder: 'border-amber-300/30'
    },
    { 
      id: 'happyhour', 
      label: 'Happy Hours',
      activeGradient: 'from-orange-500/90 to-orange-600/90',
      activeBorder: 'border-orange-300/30'
    },
    { 
      id: 'spintowin', 
      label: 'Spin to Win',
      activeGradient: 'from-purple-500/90 to-purple-600/90',
      activeBorder: 'border-purple-300/30'
    }
  ];

  const handleFilterClick = (filterId, label) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
    console.log(`Filter selected: ${filterId}`);
  };

  return (
    <div className="px-4 pt-1 pb-3 bg-gray-50">
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {filterOptions.map((option) => {
          const isActive = activeFilter === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => handleFilterClick(option.id, option.label)}
              className={`
                flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                ${isActive
                  ? `bg-gradient-to-r ${option.activeGradient} text-white shadow-lg backdrop-blur-sm border ${option.activeBorder}`
                  : 'bg-white/70 text-gray-700 border border-gray-200/50 backdrop-blur-sm hover:bg-blue-50/80 hover:border-blue-200/50'
                }
              `}
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OfferTypeNavigation;
