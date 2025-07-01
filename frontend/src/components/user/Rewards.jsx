import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './Rewards.css';

// SVG pattern for gift boxes
const GiftPattern = ({ color }) => {
  // Lighter shade for the pattern based on background color
  const patternColor = color === 'dark-green' ? '#4a9048' : 
                      color === 'green' ? '#81c87f' :
                      color === 'blue' ? '#6dacdd' : 
                      color === 'light-blue' ? '#92c9f0' : '#81c87f';
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-90">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`giftPattern-${color}`} x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Gift box with bow on top */}
            <path d="M30,30 L50,30 L50,50 L30,50 Z M40,20 C45,20 45,30 40,30 C35,30 35,20 40,20 Z M40,20 C43,15 48,18 45,23 L40,30 L35,23 C32,18 37,15 40,20 Z" 
                  fill={patternColor} transform="rotate(15, 40, 35)" />
            
            {/* Gift box with dots */}
            <path d="M80,80 L95,80 L95,95 L80,95 Z M87.5,70 C92,70 92,80 87.5,80 C83,80 83,70 87.5,70 Z" 
                  fill={patternColor} transform="rotate(-10, 87.5, 82.5)" />
            <circle cx="83" cy="84" r="1" fill={patternColor} />
            <circle cx="86" cy="87" r="1" fill={patternColor} />
            <circle cx="89" cy="83" r="1" fill={patternColor} />
            <circle cx="91" cy="90" r="1" fill={patternColor} />
            <circle cx="85" cy="92" r="1" fill={patternColor} />
            
            {/* Traditional gift box */}
            <path d="M20,80 L35,80 L35,95 L20,95 Z M27.5,70 C32,70 32,80 27.5,80 C23,80 23,70 27.5,70 Z M27.5,70 C30,65 35,68 32,73 L27.5,80 L23,73 C20,68 25,65 27.5,70 Z" 
                  fill={patternColor} transform="rotate(5, 27.5, 82.5)" />
            
            {/* Round gift box */}
            <path d="M85,30 Q95,30 95,40 Q95,50 85,50 Q75,50 75,40 Q75,30 85,30 Z M85,25 Q87,25 87,30 Q87,35 85,35 Q83,35 83,30 Q83,25 85,25 Z" 
                  fill={patternColor} transform="rotate(-5, 85, 37.5)" />
            <line x1="85" y1="25" x2="85" y2="50" stroke={patternColor} strokeWidth="2" />
            <line x1="75" y1="40" x2="95" y2="40" stroke={patternColor} strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#giftPattern-${color})`} />
      </svg>
    </div>
  );
};

const RewardCard = ({ color, brand, offer, logo, hiddenOffer, hiddenBrand, hiddenLogo }) => {
  const [scratched, setScratched] = useState(false);
  
  let bgColor;
  switch (color) {
    case 'dark-green':
      bgColor = '#1b672b';
      break;
    case 'green': 
      bgColor = '#248232';
      break;
    case 'blue':
      bgColor = '#1e70f8';
      break;
    case 'light-blue':
      bgColor = '#59a7e8';
      break;
    default:
      bgColor = 'white';
  }

  const handleScratch = () => {
    if (color !== 'white') {
      setScratched(true);
    }
  };

  return (
    <div 
      className={`reward-card w-full aspect-square rounded-xl overflow-hidden ${color === 'white' ? 'border border-gray-200' : ''} mb-4 relative`}
      style={{ background: bgColor }}
      onClick={handleScratch}
    >
      {scratched && color !== 'white' ? (
        <div className="p-4 flex flex-col h-full relative z-10 gift-animation">
          <div className="text-2xl font-bold text-white">
            {hiddenOffer || '₹100 Off'}
          </div>
          <div className="mt-2 text-xl font-semibold text-white">
            {hiddenBrand || 'Surprise Reward!'}
          </div>
          <div className="mt-auto">
            <div className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
              <span className="text-2xl">{hiddenLogo || '🎁'}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {color === 'white' ? (
            <div className="p-4 flex flex-col h-full relative z-10">
              <div className="text-2xl font-bold text-gray-800">
                {offer}
              </div>
              <div className="mt-2 text-xl font-semibold text-gray-800">
                {brand}
              </div>
              <div className="mt-auto">
                <div className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                  <img src={logo} alt={brand} className="h-8 w-8 object-contain" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="scratch-text">Tap to Scratch</div>
              <GiftPattern color={color} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default function Rewards() {
  const navigate = useNavigate();
  
  // Define reward data
  const rewards = [
    {
      id: 1,
      color: 'dark-green',
      hiddenOffer: '₹150 off',
      hiddenBrand: 'Café Coffee Day',
      hiddenLogo: '☕'
    },
    {
      id: 2,
      color: 'white',
      brand: 'Hamleys',
      offer: '₹450 off on',
      logo: 'https://play-lh.googleusercontent.com/tpwGDYJfpUxWJ9jPIzHhpCwxdv4oIU0LqZaVJGn5Jy7C6sP1yQPGR01B4oDKJQG5jZI'
    },
    {
      id: 3,
      color: 'green',
      hiddenOffer: '20% off',
      hiddenBrand: 'Pizza Hut',
      hiddenLogo: '🍕'
    },
    {
      id: 4,
      color: 'light-blue',
      hiddenOffer: 'Buy 1 Get 1',
      hiddenBrand: 'PVR Cinemas',
      hiddenLogo: '🎬'
    }
  ];
  
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

      {/* Rewards Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {rewards.map(reward => (
          <div key={reward.id} className="col-span-1">
            <RewardCard
              color={reward.color}
              brand={reward.brand}
              offer={reward.offer}
              logo={reward.logo}
              hiddenOffer={reward.hiddenOffer}
              hiddenBrand={reward.hiddenBrand}
              hiddenLogo={reward.hiddenLogo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
