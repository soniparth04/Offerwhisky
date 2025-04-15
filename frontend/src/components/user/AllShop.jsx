import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationCard from "./CurrentLocation";

const AllShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleShopClick = (ownerId) => {
    navigate(`/common-offers/${ownerId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <LocationCard/>
      <h2 className="text-xl font-bold mb-4">Available Shops</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shops.map((shop) => (
          <li
            key={shop._id}
            onClick={() => handleShopClick(shop._id)}
            className="p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <h3 className="text-lg font-semibold">{shop.shopName}</h3>
            <p className="text-gray-600">{shop.city}, {shop.state}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllShops;
