import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ViewClaim = () => {
    const { userId } = useParams();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching claimed offers for userId (Mongo _id):", userId); // Debug userId
    
        if (!userId) {
            console.error("No userId provided!");
            setError("No user ID provided");
            setLoading(false);
            return;
        }
    
        const fetchOffers = async () => {
            try {
                const response = await axios.get(`https://offerwhisky.onrender.com/api/owner/users/${userId}/claimed-offers`);
                console.log("API Response:", response.data); // Debugging API response
                setOffers(response.data.claimedOffers);
            } catch (err) {
                console.error("Error fetching claimed offers:", err);
                console.log("Error response:", err.response?.data); // Debugging backend response
                setError("Failed to fetch claimed offers");
            } finally {
                setLoading(false);
            }
        };
    
        fetchOffers();
    }, [userId]);
    
    

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto mt-10 ml-2">
            <h1 className="text-2xl font-bold mb-4 ml-2">Claimed Offers</h1>
            {offers.length > 0 ? (
                <ul className="list-none pl-5 ">
                    {offers.map((offer, index) => (
                        <li key={index} className="mb-4 ">
                            <strong>Offer:-</strong>{offer.label} <br />
                            <strong>Description</strong> {offer.description} <br />
                            <p className='font-semibold'>(Claimed on: {new Date(offer.claimedAt).toLocaleDateString()})</p>
                            <button className="bg-red-500 text-white px-3 py-1 rounded mb-2">delete</button> 
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No offers claimed yet.</p>
            )}
            
        </div>
    );
};

export default ViewClaim;
