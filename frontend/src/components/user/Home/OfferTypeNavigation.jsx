import React, { useState } from 'react';

const OfferTypeNavigation = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Offers' },
    { id: 'spotlight', label: 'Spotlight' },
    { id: 'happyhour', label: 'Happy Hours' },
    { id: 'spintowin', label: 'Spin to Win' }
  ];

  const handleFilterClick = (filterId, label) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
    console.log(`Filter selected: ${filterId}`);
  };

  return (
    <div className="px-4 py-3 bg-gray-50">
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleFilterClick(option.id, option.label)}
            className={`
              flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
              ${activeFilter === option.id
                ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white shadow-lg backdrop-blur-sm border border-blue-300/30'
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
        ))}
      </div>
    </div>
  );
};

export default OfferTypeNavigation;
