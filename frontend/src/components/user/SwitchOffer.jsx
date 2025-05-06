import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tabs = ({ children }) => <div>{children}</div>;
const TabsList = ({ children }) => <div className="flex border-b mb-4">{children}</div>;
const TabsTrigger = ({ children, onClick, isActive }) => (
  <button
    className={`flex-1 py-2 text-center font-semibold ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const SwitchOffer = ({ shopId }) => {
  const [activeTab, setActiveTab] = useState('available');
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(`https://offerwhisky.onrender.com/api/user/owner/${shopId}`);
        setOffers(res.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    if (shopId) fetchOffers();
  }, [shopId]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <Tabs>
        <TabsList>
          <TabsTrigger onClick={() => setActiveTab('available')} isActive={activeTab === 'available'}>
            Available Offers
          </TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab('catalogue')} isActive={activeTab === 'catalogue'}>
            Store Catalogue
          </TabsTrigger>
        </TabsList>

        {activeTab === 'available' ? (
          <div className="grid grid-cols-2 gap-4">
            {offers.map((offer) => (
              <div key={offer._id} className="rounded-lg  overflow-hidden w-full max-w-[180px] mx-auto">
                <div className="bg-blue-500 w-full h-28 rounded-xl flex items-center justify-center text-white text-xl overflow-hidden">
                  {offer.image ? (
                    <img src={offer.image} alt={offer.title} className="w-full object-cover" />
                  ) : (
                    <span>🎁</span>
                  )}
                </div>
                <div className=" font-bold text-blue-900">{offer.title}</div>
                <span className="inline-flex items-center px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                    {offer.category}
                  </span>
                  <p className="text-sm">{offer.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Valid Till: {new Date(offer.validTill).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl shadow-md p-4 flex flex-col items-center">
              <div className="bg-green-500 w-full h-28 rounded-xl flex items-center justify-center">
                <div className="text-white text-center text-2xl">🛒🛍️</div>
              </div>
              <div className="text-sm mt-2 text-center">Store Item 1</div>
            </div>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default SwitchOffer;
