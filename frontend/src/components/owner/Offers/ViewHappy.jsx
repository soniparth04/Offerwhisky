import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfferTimer from './OfferTimer';

const GetAllHappyHours = () => {
  const [offers, setOffers] = useState([]);
  const [offerStatuses, setOfferStatuses] = useState({}); // Track status for each offer

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("https://offerwhisky.onrender.com/api/owner/get-all-happy-hours", {
          withCredentials: true,
        });
        setOffers(res.data);
      } catch (error) {
        console.error("Error fetching happy hour offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const handleStatusChange = (offerId, status) => {
    setOfferStatuses((prev) => ({ ...prev, [offerId]: status }));
  };

  return (
    <div className="px-4 space-y-6 pb-20">
      {offers.length === 0 ? (
        <p className="text-center text-gray-500">No Happy Hours offers added by you.</p>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => {
            const status = offerStatuses[offer._id];
            return (
              <div
                key={offer._id}
                className="flex flex-row sm:flex-row bg-white rounded-lg shadow overflow-hidden"
              >
                <img
                  src={offer.offerImage}
                  alt={offer.offerTitle}
                  className="w-32 h-36 object-cover"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold">{offer.offerTitle}</h2>
                    <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-2 py-0.5 mt-1">
                      {offer.category}
                    </span>
                    <p className="text-sm mt-2">{offer.description}</p>
                  </div>

                  <OfferTimer
                    startTime={offer.startTime}
                    endTime={offer.endTime}
                    date={offer.Date}
                    onStatusChange={(status) => handleStatusChange(offer._id, status)}
                  />
                   {/* Show Start or End time based on status */}
                    {status === 'Starts In' && (
                      <p className="text-xs -mt-2 text-red-700 font-semibold">{offer.startTime}</p>
                    )}
                    {status === 'Time Remaining' && (
                      <p className="text-xs text-red-800">end time {offer.endTime}</p>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GetAllHappyHours;
