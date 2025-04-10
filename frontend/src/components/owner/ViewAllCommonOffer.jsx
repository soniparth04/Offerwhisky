import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllCommonOffer = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchCommonOffers = async () => {
      try {
        const response = await axios.get("https://offerwhisky.onrender.com/api/owner/common-offers", {
          withCredentials: true,
        });
        setOffers(response.data);
      } catch (err) {
        console.error("Error fetching common offers:", err);
      }
    };

    fetchCommonOffers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">All Common Offers</h2>
      {offers.length === 0 ? (
        <p className="text-center text-gray-500">No common offers available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer._id} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-bold">{offer.title}</h3>
              <p className="text-sm mt-1">{offer.description}</p>
              <p className="text-xs text-gray-500 mt-1">Valid Till: {new Date(offer.validTill).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllCommonOffer;
