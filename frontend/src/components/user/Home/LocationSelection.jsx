import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";

const LocationSelection = () => {
  const navigate = useNavigate();

  const savedAddresses = [
    {
      label: "Home",
      distance: "75m",
      status: "CURRENTLY SELECTED",
      address:
        "Siddhivinayak Apartments, S. No. 89, Plot No. 2/3, Opp. Indira International School, Indira College Rd, Bhunakar Nagar",
    },
    {
      label: "Work",
      distance: "20 km",
      address:
        "Siddhivinayak Apartments, S. No. 89, Plot No. 2/3, Opp. Indira International School, Indira College Rd, Bhunakar Nagar",
    },
    {
      label: "Other",
      distance: "30 km",
      address:
        "Siddhivinayak Apartments, S. No. 89, Plot No. 2/3, Opp. Indira International School, Indira College Rd, Bhunakar Nagar",
    },
  ];

  const iconMap = {
    Home: <FaHome className="text-gray-700" />,
    Work: <FaBriefcase className="text-gray-700" />,
    Other: <FaMapMarkerAlt className="text-gray-700" />,
  };

  return (
    <div className="h-screen bg-white p-4">
      <h2 className="text-lg font-medium mb-4">Location selection</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your area or apartment name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-2 flex items-center justify-between p-3 border rounded-md cursor-pointer">
        <span>📍 To use my current location</span>
        <HiChevronRight />
      </div>

      <div className="mb-4 flex items-center justify-between p-3 border rounded-md cursor-pointer">
        <span>➕ Add new address</span>
        <HiChevronRight />
      </div>

      <div className="text-sm text-gray-700 font-medium mb-2">Saved Address</div>

      {savedAddresses.map((item, index) => (
        <div
          key={index}
          className="border-b py-3 flex justify-between items-start"
        >
          <div className="flex items-start gap-2">
            <div className="mt-1">{iconMap[item.label]}</div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{item.label}</p>
                <p className="text-xs text-gray-500">{item.distance}</p>
                {item.status && (
                  <span className="text-green-600 text-xs border border-green-600 px-1 rounded">
                    {item.status}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">{item.address}</p>
            </div>
          </div>
          <div className="text-gray-400 text-lg">⋮</div>
        </div>
      ))}

      <p className="mt-4 text-sm text-blue-500 cursor-pointer">View More</p>

      <div className="mt-6 text-sm text-gray-500">Recent Searches</div>
    </div>
  );
};

export default LocationSelection;
