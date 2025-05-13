import React from 'react';
import { Tag, Eye, MapPin, Receipt } from 'lucide-react';

const StatGrid = () => {
  const stats = [
    {
      title: 'Total Offer running',
      value: 12,
      icon: <Tag size={30} className="text-blue-600" />,
    },
    {
      title: 'Total offer view',
      value: 45,
      icon: <Eye size={30} className="text-green-600" />,
    },
    {
      title: 'Total Store Visit',
      value: 78,
      icon: <MapPin size={30} className="text-purple-600" />,
    },
    {
      title: 'Recent Redemption',
      value: 3,
      icon: <Receipt size={30} className="text-red-600" />,
    },
  ];
  

  return (
    <div className="grid grid-cols-2 gap-4 p-4 ">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center pt-10"
        >
          <h3 className="text-gray-800 font-medium text-center text-sm">{stat.title}</h3>
          <div className="flex items-center space-x-2 pb-4" >
            <span>{stat.icon}</span>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatGrid;
