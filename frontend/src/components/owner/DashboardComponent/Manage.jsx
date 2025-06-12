import React from 'react';
import { useNavigate } from 'react-router-dom';
import OfferManagement from './OfferManagement';
import BookingHistory from './Bookinghis';
import RedemptionTracker from './Redemption';
import ActiveAds from './ActiveSponser';

const Management = () => {
    const navigate = useNavigate();

    return (
        <div className="px-4 pb-6 mt-4 mb-20">
            <OfferManagement/>
            <BookingHistory/>
            <RedemptionTracker/>
            <ActiveAds/>
            
        </div>
    );
};

export default Management;
