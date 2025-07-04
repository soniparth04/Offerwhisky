import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronRight, Tag, Eye, Zap, MoreVertical } from 'lucide-react';

const ViewSpotlightOffer = () => {
    const [offers, setOffers] = useState([]);
    const [activeStates, setActiveStates] = useState({});
    const [menuStates, setMenuStates] = useState({});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchCommonOffers = async () => {
            const ownerId = searchParams.get("ownerId");
            if (!ownerId) return;
            try {
                const response = await axios.get(`https://offerwhisky.onrender.com/api/spotlight/common-offers/${ownerId}`, {
                    withCredentials: true,
                });
                setOffers(response.data);
                const initialStates = {};
                response.data.forEach(offer => {
                    initialStates[offer._id] = offer.status === 'active';
                });
                setActiveStates(initialStates);
            } catch (err) {
                console.error("Error fetching common offers:", err);
            }
        };

        fetchCommonOffers();
    }, []);

    const handleBoostClick = (offerId) => {
        navigate(`/shop-owner/boost-spotlight/${offerId}`);
    };

    const toggleActiveState = async (id) => {
        try {
            const response = await axios.patch(`https://offerwhisky.onrender.com/api/spotlight/toggle-offer-status/${id}`, {}, {
                withCredentials: true
            });

            setActiveStates(prev => ({
                ...prev,
                [id]: response.data.status === 'active'
            }));
        } catch (err) {
            console.error("Failed to toggle status:", err);
        }
    };

    const toggleMenu = (id) => {
        setMenuStates(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleEdit = (offerId) => {
        navigate(`/shop-owner/edit-spotlight/${offerId}`);
    };

    const handleDelete = async (offerId) => {
        try {
            await axios.delete(`https://offerwhisky.onrender.com/api/spotlight/delete/${offerId}`, {
                withCredentials: true
            });
            setOffers(prev => prev.filter(o => o._id !== offerId));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleCloseMenu = (offerId) => {
        setMenuStates(prev => ({ ...prev, [offerId]: false }));
    };

    return (
        <div className="max-w-6xl px-4 py-8 mb-20">
            {offers.length === 0 ? (
                <p className="text-center text-gray-500">No Spotlight offers added by you.</p>
            ) : (
                <div className="space-y-4">
                    {offers.map((offer) => (
                        <div
                            key={offer._id}
                            className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-42"
                        >
                            <div className="relative w-32 h-36">
                                {offer.image && (
                                    <img
                                        src={offer.image}
                                        alt={offer.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <span
                                    className={`absolute top-1 left-1 text-[9px] px-2 rounded shadow font-medium ${activeStates[offer._id]
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    {activeStates[offer._id] ? 'Active' : 'Inactive'}
                                </span>
                                <div className="text-xs bg-amber-100 p-2 pl-4 text-yellow-700 font-semibold">
                                    Spotlight
                                </div>
                            </div>

                            <div className="pl-2 py-2 flex flex-col justify-between flex-1 relative">
                                {/* Title and Three-dot menu */}
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold">{offer.title}</h3>
                                    <div className="relative">
                                        <button onClick={() => toggleMenu(offer._id)}>
                                            <MoreVertical size={20} />
                                        </button>
                                        {menuStates[offer._id] && (
                                            <div className="absolute right-0 mt-1 w-28 bg-white shadow-lg rounded-md border z-10">
                                                <ul className="text-sm text-gray-700">
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleEdit(offer._id)}
                                                    >
                                                        Edit
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleDelete(offer._id)}
                                                    >
                                                        Delete
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleCloseMenu(offer._id)}
                                                    >
                                                        Close
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="w-fit mt-1">
                                    <span className="inline-block bg-gray-200 text-gray-800 text-xs font-medium rounded-full px-3 py-0.5">
                                        {offer.category}
                                    </span>
                                </div>


                                <p className="text-sm mt-2 pr-5">{offer.description}</p>

                                <p className="text-xs text-gray-500 mt-2">
                                    Valid Till: {new Date(offer.EndDate).toLocaleDateString()}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-600 p-2">
                                    <div className="flex items-center gap-1">
                                        <Eye size={18} />
                                        <span>68</span>
                                    </div>
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => handleBoostClick(offer._id)}
                                    >
                                        <Zap size={14} />
                                        <span className="pl-1">Boost</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-5">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={activeStates[offer._id] || false}
                                                onChange={() => toggleActiveState(offer._id)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-9 h-4 bg-gray-200 rounded-full peer-checked:bg-green-500 transition"></div>
                                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                                        </label>
                                        <span className={`text-xs font-semibold ${activeStates[offer._id] ? 'text-green-600' : 'text-gray-400'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewSpotlightOffer;
