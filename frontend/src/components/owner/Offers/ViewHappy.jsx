import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfferTimer from './OfferTimer';
import { Eye, Zap, MoreVertical, Edit, Trash, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GetAllHappyHours = () => {
  const [offers, setOffers] = useState([]);
  const [offerStatuses, setOfferStatuses] = useState({});
  const [activeStates, setActiveStates] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  const fetchOffers = async () => {
    try {
      const res = await axios.get("https://offerwhisky.onrender.com/api/happyhour/get-all-happy-hours", {
        withCredentials: true,
      });
      setOffers(res.data);
    } catch (error) {
      console.error("Error fetching happy hour offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDelete = async (offerId) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;

    try {
      await axios.delete(`https://offerwhisky.onrender.com/api/happyhour/delete-happy-hour/${offerId}`, {
        withCredentials: true,
      });
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleEdit = (offerId) => {
    navigate(`/edit-happy-hour/${offerId}`);
  };

  const handleStatusChange = (offerId, status) => {
    setOfferStatuses((prev) => ({ ...prev, [offerId]: status }));
  };

  const toggleActiveState = (id) => {
    setActiveStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-6xl px-4 py-8 mb-20">
      {offers.length === 0 ? (
        <p className="text-center text-gray-500">No Happy Hours offers added by you.</p>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => {
            const status = offerStatuses[offer._id];
            return (
              <div
                key={offer._id}
                className="relative flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-42"
              >
                {/* Offer Image & Tags */}
                <div className="relative w-32 h-36">
                  <img
                    src={offer.offerImage}
                    alt={offer.offerTitle}
                    className="w-32 h-36 object-cover"
                  />
                  <span
                    className={`absolute top-1 left-1 text-[9px] px-2 rounded shadow font-medium ${
                      activeStates[offer._id]
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {activeStates[offer._id] ? 'Active' : 'Inactive'}
                  </span>
                  <div className="text-xs bg-amber-100 p-2 pl-4 text-yellow-700 font-semibold">
                    Happy Hour
                  </div>
                </div>

                {/* 3-dot Menu */}
                <div className="absolute top-2 right-2 z-20">
                  <button onClick={() => setOpenMenuId(openMenuId === offer._id ? null : offer._id)}>
                    <MoreVertical size={18} />
                  </button>

                  {openMenuId === offer._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg text-sm z-30">
                      <button
                        onClick={() => {
                          handleEdit(offer._id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(offer._id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                      >
                        <Trash size={14} /> Delete
                      </button>
                      <button
                        onClick={() => setOpenMenuId(null)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <XCircle size={14} /> Close
                      </button>
                    </div>
                  )}
                </div>

                {/* Offer Info */}
                <div className="pl-2 py-2 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold">{offer.offerTitle}</h3>
                    <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-2 py-0.5 mt-1">
                      {offer.category}
                    </span>
                    <p className="text-sm mt-2 pr-5">{offer.description}</p>
                  </div>

                  <div className='pr-2'>
                    <OfferTimer
                      startTime={offer.startTime}
                      endTime={offer.endTime}
                      date={offer.Date}
                      onStatusChange={(status) => handleStatusChange(offer._id, status)}
                    />
                    {status === 'Starts In' && (
                      <p className="text-xs -mt-2 text-red-700">{offer.startTime}</p>
                    )}
                    {status === 'Time Remaining' && (
                      <p className="text-xs text-green-700">Ends at {offer.endTime}</p>
                    )}
                    {status === 'Expired' && (
                      <p className="mt-4 mb-4 text-s text-gray-500 text-red-700 font-semibold">Expired</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600 p-1">
                    <div className="flex items-center gap-1">
                      <Eye size={18} />
                      <span>68</span>
                    </div>
                    <div className="flex items-center cursor-pointer">
                      <Zap size={14} />
                      <span className="pl-1">Boost</span>
                    </div>
                    <div className="flex items-center gap-2">
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
                      <span className={`text-xs font-semibold ${activeStates[offer._id] ? 'text-green-600' : 'text-gray-400'}`}>
                      </span>
                    </div>
                  </div>
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
