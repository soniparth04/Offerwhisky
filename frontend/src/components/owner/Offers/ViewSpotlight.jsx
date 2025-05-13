import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewSpotlightOffer = () => {
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
        <div className="max-w-6xl  px-4 py-8">
            {offers.length === 0 ? (
                <p className="text-center text-gray-500">No Spotlight offers added by you.</p>
            ) : (
                <div className="space-y-4">
                    {offers.map((offer) => (
                        <div
                            key={offer._id}
                            className="flex flex-row sm:flex-row bg-white rounded-lg shadow overflow-hidden"
                        >
                            {offer.image && (
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className=" w-32 h-36 object-cover"
                                />
                            )}
                            <div className="p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold">{offer.title}</h3>
                                    <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-2 py-0.5 mt-1">
                                        {offer.category}
                                    </span>
                                    <p className="text-sm mt-2">{offer.description}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Valid Till: {new Date(offer.validTill).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewSpotlightOffer;
