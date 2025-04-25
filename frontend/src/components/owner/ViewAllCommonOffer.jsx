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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 lg:gap-5">
        {offers.map((offer) => (
          <div key={offer._id} className="bg-white rounded-lg shadow pb-4 ">

            {offer.image && (
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full object-cover rounded-md"
              />

            )}
            <div className="m-2">
              <h3 className="text-lg font-bold">{offer.title}</h3>
              <span className="inline-flex items-center px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                {offer.category}
              </span>
              <p className="text-sm ">{offer.description}</p>
              <p className="text-xs text-gray-500 ">Valid Till: {new Date(offer.validTill).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default ViewAllCommonOffer;
