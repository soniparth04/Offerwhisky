import React from 'react';

const VideoAdSection = ({ adId = 1 }) => {
  // Different ad variations for variety
  const ads = [
    {
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=300&fit=crop",
      title: "Gourmet Food Festival",
      subtitle: "Watch & Get 25% OFF",
      bgColor: "bg-black bg-opacity-40"
    },
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
      title: "Fashion Week Sale",
      subtitle: "Watch & Get 30% OFF",
      bgColor: "bg-purple-900 bg-opacity-50"
    },
    {
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=300&fit=crop",
      title: "Electronics Mega Sale",
      subtitle: "Watch & Get 40% OFF",
      bgColor: "bg-blue-900 bg-opacity-50"
    },
    {
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=300&fit=crop",
      title: "Travel Deals Expo",
      subtitle: "Watch & Get 50% OFF",
      bgColor: "bg-green-900 bg-opacity-50"
    }
  ];
  
  const currentAd = ads[(adId - 1) % ads.length];
  
  return (
    <div className="mt-2 px-4 bg-gray-50 py-3">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="relative">
          {/* Background image */}
          <img 
            src={currentAd.image}
            alt={currentAd.title}
            className="w-full h-48 object-cover"
          />
          
          {/* Dark overlay */}
          <div className={`absolute inset-0 ${currentAd.bgColor}`}></div>
          
          {/* AD tag - top right */}
          <div className="absolute top-3 right-3">
            <div className="bg-black bg-opacity-80 text-white px-3 py-1 text-xs font-medium rounded">
              AD
            </div>
          </div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end items-start p-6">
            {/* Main heading */}
            <h2 className="text-white text-2xl font-bold mb-2 leading-tight">
              {currentAd.title}
            </h2>
            
            {/* Subtitle */}
            <p className="text-white text-lg font-medium opacity-90">
              {currentAd.subtitle}
            </p>
          </div>
          
          {/* Play button - separate positioned element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 border-2 border-white border-opacity-50 hover:bg-opacity-30 transition-all duration-200 cursor-pointer">
              <svg 
                className="w-8 h-8 text-white ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAdSection;
