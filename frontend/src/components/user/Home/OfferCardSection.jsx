import React, { useState, useEffect } from 'react';
import { Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const OfferCardSection = ({ sectionId, filterType = 'all', categoryFilter = 'all' }) => {
  // Hard-coded timer data for each offer card to avoid infinite loop issues
  const hardCodedTimers = {
    '1_0': { hours: 1, minutes: 45, seconds: 30 },
    '1_1': { hours: 2, minutes: 20, seconds: 15 },
    '1_2': { hours: 0, minutes: 55, seconds: 45 },
    '1_3': { hours: 3, minutes: 10, seconds: 0 },
    '2_0': { hours: 1, minutes: 15, seconds: 20 },
    '2_1': { hours: 0, minutes: 45, seconds: 10 },
    '2_2': { hours: 2, minutes: 30, seconds: 0 },
    '2_3': { hours: 1, minutes: 0, seconds: 50 },
    '3_0': { hours: 0, minutes: 30, seconds: 0 },
    '3_1': { hours: 1, minutes: 25, seconds: 40 },
    '3_2': { hours: 2, minutes: 0, seconds: 15 },
    '3_3': { hours: 0, minutes: 50, seconds: 30 },
    '4_0': { hours: 1, minutes: 10, seconds: 20 },
    '4_1': { hours: 0, minutes: 40, seconds: 0 },
    '4_2': { hours: 2, minutes: 15, seconds: 45 },
    '4_3': { hours: 3, minutes: 0, seconds: 10 },
    '5_0': { hours: 0, minutes: 20, seconds: 30 },
    '5_1': { hours: 1, minutes: 5, seconds: 15 },
    '5_2': { hours: 3, minutes: 30, seconds: 0 },
    '5_3': { hours: 2, minutes: 45, seconds: 50 }
  };
  
  // Button color variations for each offer type - subtle, comforting gradients
  const buttonColors = {
    spotlight: [
      { bg: 'bg-gradient-to-r from-gray-800 to-black', name: 'gray-black' },
      { bg: 'bg-gradient-to-r from-slate-700 to-gray-900', name: 'slate-gray' },
      { bg: 'bg-gradient-to-r from-zinc-700 to-slate-800', name: 'zinc-slate' },
      { bg: 'bg-gradient-to-r from-gray-700 to-zinc-800', name: 'gray-zinc' },
      { bg: 'bg-gradient-to-r from-stone-700 to-gray-800', name: 'stone-gray' }
    ],
    happyhour: [
      { bg: 'bg-gradient-to-r from-orange-400 to-red-400', name: 'orange-red' },
      { bg: 'bg-gradient-to-r from-rose-400 to-orange-400', name: 'rose-orange' },
      { bg: 'bg-gradient-to-r from-red-400 to-pink-400', name: 'red-pink' },
      { bg: 'bg-gradient-to-r from-pink-400 to-orange-400', name: 'pink-orange' },
      { bg: 'bg-gradient-to-r from-orange-300 to-amber-500', name: 'light-orange-amber' }
    ],
    spintowin: [
      { bg: 'bg-gradient-to-r from-purple-400 to-indigo-400', name: 'purple-indigo' },
      { bg: 'bg-gradient-to-r from-violet-400 to-purple-400', name: 'violet-purple' },
      { bg: 'bg-gradient-to-r from-indigo-400 to-blue-400', name: 'indigo-blue' },
      { bg: 'bg-gradient-to-r from-blue-400 to-violet-400', name: 'blue-violet' },
      { bg: 'bg-gradient-to-r from-purple-300 to-indigo-500', name: 'light-purple-indigo' }
    ]
  };

  // Different offer types with two spin-to-win variations (removed BOGO)
  const offerTypes = [
    {
      type: 'spotlight',
      tag: 'SPOTLIGHT',
      tagClass: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black',
      route: 'spotlight-offer',
      buttonText: 'Learn More',
      buttonClass: 'bg-blue-600 hover:bg-blue-700',
      buttonColors: buttonColors.spotlight
    },
    {
      type: 'happyhour',
      tag: 'LIVE',
      tagClass: 'bg-orange-500 text-white',
      route: 'happy-hour-offer',
      buttonText: 'Book Now',
      buttonClass: 'bg-orange-500 hover:bg-orange-600',
      buttonColors: buttonColors.happyhour
    },
    {
      type: 'spintowin',
      tag: 'SPIN',
      tagClass: 'bg-purple-600 text-white',
      route: 'spin-to-win',
      buttonText: 'Spin Now',
      buttonClass: 'bg-purple-600 hover:bg-purple-700',
      buttonColors: buttonColors.spintowin
    },
    {
      type: 'spintowin2',
      tag: 'SPIN',
      tagClass: 'bg-blue-600 text-white', // Using the BOGO blue color scheme
      route: 'spin-to-win',
      buttonText: 'Spin Now',
      buttonClass: 'bg-blue-600 hover:bg-blue-700',
      buttonColors: buttonColors.spintowin
    }
  ];    // Generate 4 different offers with randomized types to ensure variety
  const generateOffers = () => {
    let offers = [];
    
    // Sample images from Unsplash
    const offerImages = {
      food: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
        'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
      ],
      property: [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6',
        'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b'
      ],
      vehicle: [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
        'https://images.unsplash.com/photo-1489824904134-891ab64532f1',
        'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3'
      ],
      beauty: [
        'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1',
        'https://images.unsplash.com/photo-1487412912498-0447578fcca8',
        'https://images.unsplash.com/photo-1470259078422-826894b933aa',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035'
      ],
      all: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
        'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
        'https://images.unsplash.com/photo-1529778873920-4da4926a72c2',
        'https://images.unsplash.com/photo-1593504049359-74330189a345',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
        'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
      ]
    };
    
    // Sample shop names by category
    const shopNames = {
      food: ['Café Bistro', 'The Burger Joint', 'Pizza Palace', 'Taco Bell', 'Spice Garden', 'Sweet Treats'],
      property: ['Dream Homes', 'Urban Living', 'Mountain View Properties', 'Seaside Rentals', 'City Apartments'],
      vehicle: ['Motors & More', 'Premium Rides', 'Car Zone', 'Luxury Autos', 'City Rentals'],
      beauty: ['Beauty Zone', 'Glamour Salon', 'Style Studio', 'Urban Spa', 'Wellness Center'],
      all: [
        'Café Bistro', 'The Burger Joint', 'Pizza Palace', 'Taco Bell',
        'Electronics Mart', 'Fashion Hub', 'Grocery Store', 'Beauty Salon'
      ]
    };
    
    // Define category mapping
    const categoryMapping = {
      food: ['Food', 'Drinks', 'Cafe', 'Restaurant'],
      property: ['Property', 'Real Estate', 'Apartments', 'Houses'],
      vehicle: ['Vehicle', 'Cars', 'Bikes', 'Rentals'],
      beauty: ['Beauty', 'Spa', 'Salon', 'Wellness'],
      all: ['Food', 'Drinks', 'Fashion', 'Electronics', 'Beauty', 'Services', 'Property', 'Vehicle']
    };

    // Hardcoded availability counts
    const availabilityCounts = [
      { available: 23, total: 80 },
      { available: 45, total: 80 },
      { available: 32, total: 80 },
      { available: 17, total: 80 },
    ];
    
    // Skip generating offers if filtering by category but not the current section's category
    if (categoryFilter !== 'all' && sectionId % 5 !== parseInt(Math.random() * 5)) {
      // Return a limited number of offers for this category to avoid empty sections
      if (sectionId % 3 === 0) {
        return [];
      }
    }
    
    // Filter logic for offer types
    const getTypeIndices = () => {
      if (filterType !== 'all') {
        // Find the matching offer type
        const targetTypeIndex = offerTypes.findIndex(type => 
          type.type === filterType || 
          (filterType === 'spintowin' && (type.type === 'spintowin' || type.type === 'spintowin2'))
        );
        
        if (targetTypeIndex !== -1) {
          // Return all positions with the same type
          return [targetTypeIndex, targetTypeIndex, targetTypeIndex, targetTypeIndex];
        }
      }
      
      // Original logic for 'all' filter
      const indices = [];
      const seed = (sectionId * 17) % 100;
      
      indices.push((seed + 7) % offerTypes.length);
      indices.push((seed + 13) % offerTypes.length);
      indices.push((seed * 3 + 5) % offerTypes.length);
      indices.push((seed * 5 + 11) % offerTypes.length);
      
      // Prevent the same type from appearing twice in a section (only for 'all' filter)
      const seen = new Set();
      for (let i = 0; i < indices.length; i++) {
        while (seen.has(indices[i])) {
          indices[i] = (indices[i] + 1) % offerTypes.length;
        }
        seen.add(indices[i]);
      }
      
      return indices;
    };
    
    const typeIndices = getTypeIndices();

    // Choose the right category for filtering
    const currentCategoryImages = offerImages[categoryFilter] || offerImages['all'];
    const currentShopNames = shopNames[categoryFilter] || shopNames['all'];
    const currentCategories = categoryMapping[categoryFilter] || categoryMapping['all'];

    for (let i = 0; i < 4; i++) {
      const typeIndex = typeIndices[i];
      const type = offerTypes[typeIndex];
      
      // Use a static timerId for referencing hard-coded timer values
      const timerId = `${sectionId}_${i}`;
      
      // Choose a random button color for this offer
      const randomButtonColorIndex = Math.floor(Math.random() * (type.buttonColors?.length || 1));
      const randomButtonColor = type.buttonColors?.[randomButtonColorIndex]?.bg || type.buttonClass;
      // Add hover brightness effect for gradient buttons
      const randomButtonHoverClass = randomButtonColor.includes('gradient') ? 'hover:brightness-105' : '';
      
      offers.push({
        _id: `${type.type}_${sectionId}_${i}`,
        image: currentCategoryImages[(sectionId + i) % currentCategoryImages.length],
        title: `${type.type === 'spotlight' ? 'Special' : 
               type.type === 'happyhour' ? 'Limited Time' : 
               (type.type === 'spintowin' || type.type === 'spintowin2') ? 'Win Discount' : 'Offer'} Offer`,
        description: `${type.type === 'spotlight' ? 'Get great discounts' : 
                     type.type === 'happyhour' ? 'Limited time only' : 
                     type.type === 'spintowin' ? 'Spin to win up to 70% off' :
                     type.type === 'spintowin2' ? 'Spin to win exclusive deals' : ''}`,
        shopName: currentShopNames[(sectionId + i) % currentShopNames.length],
        category: currentCategories[(sectionId + i) % currentCategories.length],
        randomButtonColor: randomButtonColor,
        randomButtonHoverClass: randomButtonHoverClass,
        discountPercent: [20, 30, 40, 50][(sectionId + i) % 4],
        distance: ((sectionId + i) % 4 + 0.5).toFixed(1),
        offerType: type,
        timerId: timerId,
        availableCount: availabilityCounts[i].available,
        totalCount: availabilityCounts[i].total
      });
    }
    
    return offers;
  };

  const offers = generateOffers();
  
  // Initialize timeRemaining state with hardcoded values
  const [timeRemaining, setTimeRemaining] = useState({});

  // Format time units (add leading zeros)
  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  // Set initial timer values from hardcoded data
  useEffect(() => {
    const initialTimers = {};
    
    offers.forEach(offer => {
      if (offer.offerType.type === 'happyhour') {
        initialTimers[offer._id] = hardCodedTimers[offer.timerId] || { hours: 1, minutes: 30, seconds: 0 };
      }
    });
    
    setTimeRemaining(initialTimers);
  }, []);

  return (
    <div className="mt-2 px-4 bg-gray-50 py-3">
      <div className="grid grid-cols-2 gap-2">
        {offers.map((offer) => (
          <Link to={`/${offer.offerType.route}/${offer._id}`} key={offer._id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Offer image with discount overlay */}
            <div className="relative">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                }}
              />
              {/* Offer type tag - top left (only for happy hour) */}
              <div className="absolute top-2 left-2 flex">
                {offer.offerType.type === 'happyhour' && (
                  <div className={`${offer.offerType.tagClass} px-1.5 py-0.5 text-[10px] font-bold flex items-center rounded-sm shadow-sm`}>
                    <span className="h-1.5 w-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                    {offer.offerType.tag}
                  </div>
                )}
              </div>
              
              {/* Discount tag - top right */}
              <div className="absolute top-2 right-2">
                <div className="bg-red-500 text-white px-1.5 py-0.5 text-[10px] font-medium rounded-sm">
                  {offer.discountPercent}% OFF
                </div>
              </div>
            </div>

            {/* Offer details */}
            <div className="p-3 flex flex-col h-[150px]">
              <div>
                {/* Shop name and heart icon */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-xs">{offer.shopName}</p>
                  <Heart className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" />
                </div>
                
                {/* Offer title */}
                <h3 className="text-sm font-bold text-blue-900 line-clamp-1">{offer.title}</h3>
                
                {/* Category and distance */}
                <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                    {offer.category}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">{offer.distance} km</span>
                </div>
                
                {/* Content area based on offer type */}
                {offer.offerType.type !== 'happyhour' ? (
                  <p className="text-xs line-clamp-2 mt-1">{offer.description}</p>
                ) : (
                  <div className="mt-1">
                    {/* Timer display */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 text-orange-500 mr-1" />
                        <span className="text-xs font-mono font-bold">
                          {timeRemaining[offer._id] ? 
                            `${formatTimeUnit(timeRemaining[offer._id].hours)}:${formatTimeUnit(timeRemaining[offer._id].minutes)}:${formatTimeUnit(timeRemaining[offer._id].seconds)}` : 
                            `${formatTimeUnit(hardCodedTimers[offer.timerId]?.hours || 0)}:${formatTimeUnit(hardCodedTimers[offer.timerId]?.minutes || 0)}:${formatTimeUnit(hardCodedTimers[offer.timerId]?.seconds || 0)}`
                          }
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {offer.availableCount}/{offer.totalCount}
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-green-500 h-full rounded-full" 
                        style={{ width: `${(offer.availableCount/offer.totalCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action button - fixed position at bottom */}
              <div className="mt-auto">
                <button className={`w-full ${offer.randomButtonColor || offer.offerType.buttonClass} ${offer.randomButtonHoverClass || ''} text-white text-xs py-1.5 rounded font-medium transition-all duration-300 shadow-sm hover:shadow-md`}>
                  {offer.offerType.buttonText}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OfferCardSection;
