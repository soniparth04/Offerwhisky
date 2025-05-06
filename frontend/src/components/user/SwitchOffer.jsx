import React, { useState } from 'react';
import { Heart } from 'lucide-react';

// Basic Tabs implementation
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

// Basic Card implementation
const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl shadow-md p-4 ${className}`}>{children}</div>
);
const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

const SwitchOffer = () => {
  const [activeTab, setActiveTab] = useState('available'); // State to track the active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab on click
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Tabs>
        <TabsList>
          <TabsTrigger
            onClick={() => handleTabClick('available')}
            isActive={activeTab === 'available'} // Apply active class if it's the selected tab
          >
            Available Offers
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleTabClick('catalogue')}
            isActive={activeTab === 'catalogue'} // Apply active class if it's the selected tab
          >
            Store Catalogue
          </TabsTrigger>
        </TabsList>

        {activeTab === 'available' ? (
          // Available Offers Content
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="flex flex-col items-center">
                <div className="bg-blue-500 w-full h-28 rounded-xl flex items-center justify-center">
                  <div className="text-white text-center text-2xl">🎁🎁🎁</div>
                </div>
                <div className="text-sm mt-2 text-center"></div>
                <Heart size={16} className="mt-1 text-gray-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center">
                <div className="w-full h-28 rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center text-white text-xl">
                  🎯 Spin Wheel
                </div>
                <div className="text-sm mt-2 text-center"></div>
                <Heart size={16} className="mt-1 text-gray-500" />
              </CardContent>
            </Card>
          </div>
        ) : (
          // Store Catalogue Content
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="flex flex-col items-center">
                <div className="bg-green-500 w-full h-28 rounded-xl flex items-center justify-center">
                  <div className="text-white text-center text-2xl">🛒🛍️</div>
                </div>
                <div className="text-sm mt-2 text-center">Store Item 1</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center">
                <div className="w-full h-28 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-400 flex items-center justify-center text-white text-xl">
                  🏷️ Item Offer
                </div>
                <div className="text-sm mt-2 text-center">Store Item 2</div>
              </CardContent>
            </Card>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default SwitchOffer;
