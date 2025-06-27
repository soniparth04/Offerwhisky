import React from 'react';

const ImageAdSection = ({ adId = 1 }) => {
  // Different ad variations for the top image section
  const topAds = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=200&fit=crop",
      title: "OVERSIZED T-SHIRTS",
      subtitle: "BUY 2 AT ₹999",
      bgColor: "bg-black bg-opacity-40"
    },
    {
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=200&fit=crop",
      title: "SUMMER COLLECTION",
      subtitle: "FLAT 50% OFF",
      bgColor: "bg-purple-900 bg-opacity-50"
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=200&fit=crop",
      title: "FASHION SALE",
      subtitle: "UP TO 70% OFF",
      bgColor: "bg-red-900 bg-opacity-50"
    }
  ];

  // Sample slider items based on the image
  const sliderItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=200&fit=crop",
      title: "Cool Snack Tee"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=150&h=200&fit=crop",
      title: "Snoopy Pals Tee"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=200&fit=crop",
      title: "Graphic Tee"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=150&h=200&fit=crop",
      title: "Batman Tee"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=150&h=200&fit=crop",
      title: "Vintage Tee"
    }
  ];
  
  const currentTopAd = topAds[(adId - 1) % topAds.length];
  
  return (
    <div className="mt-2 px-4 bg-gray-50 py-3">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Top Image Ad Section */}
        <div className="relative">
          <img 
            src={currentTopAd.image}
            alt={currentTopAd.title}
            className="w-full h-32 object-cover"
          />
          
          {/* Dark overlay */}
          <div className={`absolute inset-0 ${currentTopAd.bgColor}`}></div>
          
          {/* AD tag - top right */}
          <div className="absolute top-2 right-2">
            <div className="bg-black bg-opacity-80 text-white px-2 py-1 text-xs font-medium rounded">
              AD
            </div>
          </div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <h2 className="text-white text-lg font-bold mb-1 leading-tight">
              {currentTopAd.title}
            </h2>
            <p className="text-white text-xl font-bold">
              {currentTopAd.subtitle}
            </p>
          </div>
        </div>

        {/* Bottom Slider Section */}
        <div className="p-3">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {sliderItems.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 w-24 cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                {/* Product Image */}
                <div className="relative mb-2">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                </div>
                
                {/* Product Details */}
                <div className="text-center">
                  <p className="text-xs text-gray-800 font-medium truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAdSection;
