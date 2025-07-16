import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"
import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const AllShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get("https://offerwhisky.onrender.com/api/user/all-shops");
        setShops(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load shops", err);
        setError("Failed to load shops");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-900 flex items-center">
          <MapPin className="w-6 h-6 mr-2" />
          Store Nearby ({shops.length} stores)
        </h1>
      </div>

      {/* Stores Grid */}
      <div className="mt-2 px-4 bg-gray-50 py-3">
        <div className="grid grid-cols-2 gap-2">
          {shops.map((shop) => (
            <Link
              to={`/shop/${shop._id}`} 
              key={shop._id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {/* Store image */}
              <div className="relative">
                <img
                  src={shop.profileImage}
                  alt={shop.shopName}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                  }}
                />
                
                {/* Distance tag - top right */}
                <div className="absolute top-2 right-2">
                  <div className="bg-blue-500 text-white px-1.5 py-0.5 text-[10px] font-medium rounded-sm">
                    2.5 km
                  </div>
                </div>
              </div>

              {/* Store details */}
              <div className="p-3">
                {/* Store name and heart icon */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-xs">{shop.shopName}</p>
                  <Heart className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" />
                </div>
                
                {/* Store location */}
                <h3 className="text-sm font-bold text-blue-900 line-clamp-1">{shop.city}, {shop.state}</h3>
                
                {/* Rating only */}
                <div className="flex items-center mt-1">
                  <span className="ml-0 text-xs text-gray-500">★ 4.5</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Navbar />
    </div>
  );
};

export default AllShops;
