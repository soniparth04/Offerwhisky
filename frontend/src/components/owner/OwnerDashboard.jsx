import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNavigation from './Navbar/BottomNav';

const OwnerDashboard = () => {
    const navigate = useNavigate();
    const [shopName, setShopName] = useState("");
    const [ownerId, setOwnerId] = useState("");

    useEffect(() => {
        // Fetch owner's shop name
        const fetchOwnerInfo = async () => {
            try {
                const response = await axios.get("https://offerwhisky.onrender.com/api/owner/owner-info", { withCredentials: true });
                setShopName(response.data.shopName);
                setOwnerId(response.data.ownerId);
            } catch (error) {
                console.error("Error fetching owner info:", error);
                navigate("/owner-login"); // Redirect to login if unauthorized
            }
        };
        fetchOwnerInfo();
    }, [navigate]);

    return (
        <div>
           
            <div className="text-lg font-bold flex-grow text-center">
                {shopName ? `${shopName} - Owner Panel` : "Loading..."}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Total Users</div>
                <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Active Offers</div>
            </div>

            <p className="mt-4 font-semibold">Quick actions</p>

            <div className="container mx-auto mt-10 mb-40">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/shop-owner/view-offers" className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="text-center">
                            <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">View All Offers</h5>
                        </div>
                    </Link>

                    <Link className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="text-center">
                            <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">View Redeemed Offers</h5>
                        </div>
                    </Link>
                    <Link to="/shop-owner/view-common-offers" className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="text-center">
                            <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">View All Common Offers</h5>
                        </div>
                    </Link>
                    <Link to="/shop-owner/view-catalogs" className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="text-center">
                            <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">View Catalogs</h5>
                        </div>
                    </Link>
                    <Link to="/shop-owner/add-catalogs" className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="text-center">
                            <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">Add Catalogs</h5>
                        </div>
                    </Link>
                </div>
            </div>
            <BottomNavigation />
        </div>
    );
};

export default OwnerDashboard;
