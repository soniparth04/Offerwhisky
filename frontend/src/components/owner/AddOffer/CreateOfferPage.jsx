import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SpotlightOfferIcon from '../../../assets/OwnerDash/spotlite.png';
import HappyhoursOfferIcon from '../../../assets/OwnerDash/hourlyoffer.png';
import SpintoWinIcon from '../../../assets/OwnerDash/spintowin.png';
import AddCommonOffer from './AddSpotlightOffer';
import AddOffer from './AddSpinOffer';
import BottomNavigation from '../Navbar/BottomNav';

const offerTypes = [
  { id: 'spotlight', icon: <img src={SpotlightOfferIcon} alt="Spotlight" className="mx-auto" />, label: 'Spotlight Offer' },
  { id: 'happyhours', icon: <img src={HappyhoursOfferIcon} alt="Happy Hours" className="mx-auto w-[60px] h-[60px]" />, label: 'Happy Hours Offer' },
  { id: 'spintowin', icon: <img src={SpintoWinIcon} alt="Spin to Win" className="mx-auto" />, label: 'Spin to Win' },
];


const CreateOfferPage = () => {
  const navigate = useNavigate();
  const [selectedOfferType, setSelectedOfferType] = useState('happyhours');
  

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">What are you offering</h1>
      </div>
      
      {/* Offer Type Selection */}
      <div className="flex flex-row justify-around px-4 mt-2 mb-6">
        {offerTypes.map((type) => (
          <button 
            key={type.id} 
            className={`flex flex-col items-center w-16`}
            onClick={() => setSelectedOfferType(type.id)}
          >
            <div className="p-2 flex items-center justify-center">
              {React.cloneElement(type.icon, {
                className: `mx-auto ${selectedOfferType === type.id ? 'text-gray-800' : 'text-gray-400 opacity-60'}`
              })}
            </div>
            <span className={`text-xs text-center mt-1 leading-tight ${selectedOfferType === type.id ? 'font-medium' : ''}`}>{type.label}</span>
          </button>
        ))}
      </div>

      {/* Spotlight Offer Form */}
      {selectedOfferType === 'spotlight' && (
        <AddCommonOffer/>
      )}

      {/* Spin to Win Form */}
      {selectedOfferType === 'spintowin' && (
         <AddOffer/>
      )}

     

      {/* Happy Hours Offer Form */}
      {selectedOfferType === 'happyhours' && (
         <div> houly offer </div>
      )}

      <BottomNavigation/>
    </div>
  );
};

export default CreateOfferPage;