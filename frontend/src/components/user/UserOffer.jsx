import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const UserOffer = () => {
    const { shopName, ownerId } = useParams();
    const [claimedOffers, setClaimedOffers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaimedOffers = async () => {
            try {
                console.log(`Fetching offers for shop: ${shopName}, ownerId: ${ownerId}`);
                const response = await axios.get(`https://offerwhisky.onrender.com/api/user/user-offers/${shopName}/${ownerId}`, {
                    withCredentials: true, 
                });

                console.log("Fetched Claimed Offers:", response.data.claimedOffers);
                setClaimedOffers(response.data.claimedOffers);
            } catch (error) {
                console.error("Error fetching claimed offers:", error);
            }
        };

        fetchClaimedOffers();
    }, [shopName, ownerId]);

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h2 className="text-2xl font-bold mb-4">Your Offers</h2>
                {claimedOffers.length > 0 ? (
                    <ul className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                        {claimedOffers.map((offer, index) => (
                            <li key={index} className="border-b py-2 text-center">
                                <strong> {offer.label} </strong> <br />
                                {offer.description}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No offers yet....</p>
                )}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default UserOffer;
