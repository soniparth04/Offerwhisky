import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Management = () => {
    const navigate = useNavigate();

    return (
        <div className="px-4 pb-6">
            <div
                className="flex justify-between items-center py-2 cursor-pointer"
                onClick={() => navigate('/shop-owner/your-offer')}
            >
                <h2 className="text-l font-medium text-gray-700">Recent Live Offer</h2>
                <ChevronRight size={20} className="text-gray-500" />
            </div>
            <div
                className="flex justify-between items-center py-2 cursor-pointer"
                onClick={() => navigate('/shop-owner/booking-hostory')}
            >
                <h2 className="text-l font-medium text-gray-700">Booking History</h2>
                <ChevronRight size={20} className="text-gray-500" />
            </div>
            <div
                className="flex justify-between items-center py-2 cursor-pointer"
                onClick={() => navigate('/shop-owner/redemption-tracker')}
            >
                <h2 className="text-l font-medium text-gray-700">{'Redemption Tracker'}</h2>
                <ChevronRight size={20} className="text-gray-500" />
            </div>
            <div
                className="flex justify-between items-center py-2 cursor-pointer"
                onClick={() => navigate('/shop-owner/active-sponsored-Ads')}
            >
                <h2 className="text-l font-medium text-gray-700">{'Active Sponsored Ads'}</h2>
                <ChevronRight size={20} className="text-gray-500" />
            </div>
        </div>
    );
};

export default Management;
