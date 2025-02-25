import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await axios.get("https://offerwhisky.vercel.app/api/owner/view-offers", {
                    withCredentials: true, // Ensure authentication
                });
                if (Array.isArray(res.data)) {
                    setOffers(res.data);
                } else {
                    throw new Error("Invalid data format received");
                }
            } catch (err) {
                console.error("Error fetching offers:", err);
                setError("Failed to fetch offers");
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    const handleDelete = async (offerId) => {
        if (window.confirm("Are you sure you want to delete this offer?")) {
            try {
                await axios.delete(`http://localhost:5000/api/owner/delete-offer/${offerId}`, {
                    withCredentials: true, // Ensure authentication
                });
                setOffers((prev) => prev.filter((offer) => offer._id !== offerId)); // Remove deleted offer
            } catch (error) {
                console.error("Error deleting offer:", error);
            }
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto mt-10 p-5">
            <h1 className="text-2xl font-bold mb-4 text-center">Your Offers</h1>
            <table className="w-full border-collapse border border-gray-300 shadow-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="border p-2">S.No</th>
                        <th className="border p-2">Offer Details</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.length > 0 ? (
                        offers.map((offer, index) => (
                            <tr key={offer._id} className="text-center">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2 text-left">
                                    <strong>Title:</strong> {offer.label} <br />
                                    <strong>Description:</strong> {offer.description} <br />
                                    <strong>Expiry Date:</strong> {new Date(offer.expiryDate).toLocaleDateString()} <br />
                                    <Link to={`/edit-offer/${offer._id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700">Edit</Link>
                                    <button 
                                        onClick={() => handleDelete(offer._id)} 
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4 text-gray-500">No offers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewOffers;
