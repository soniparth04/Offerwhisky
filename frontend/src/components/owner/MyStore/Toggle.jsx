import React, { useState } from 'react';

const Tabs = ({ children }) => <div>{children}</div>;
const TabsList = ({ children }) => <div className="flex border-b mb-4">{children}</div>;
const TabsTrigger = ({ children, onClick, isActive }) => (
  <button
    className={`flex-1 py-2 text-center font-semibold ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
      }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Toggle = () => {

    const [activeTab, setActiveTab] = useState('available');
    
    return (
        <div className='max-w-md mx-auto'>
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
                        available offers
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        store catalog
                    </div>
                )}
            </Tabs>
        </div>
    )
}

export default Toggle;