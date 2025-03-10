import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const handleLogout = async () => {
        try {
            await axios.post("https://offerwhisky.onrender.com/api/owner/owner-logout", {}, { withCredentials: true });
            navigate("/shop-owner-login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="bg-white border-b shadow-md sticky-top">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

                    <div className="flex space-x-6 ml-auto">
                        <Link to="/shop-owner/add-offer" className="text-blue-500 hover:text-blue-700">Add new Offer</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="text-lg font-bold flex-grow text-center">
                {shopName ? `${shopName} - Owner Panel` : "Loading..."}
            </div>
            {/* Dashboard Content */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Total Users</div>
                <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Active Offers</div>
            </div>

            <p className="mt-4 font-semibold">Quick actions</p>

            <div className="container mx-auto mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/shop-owner/view-offers" className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="text-center">
                            <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">View All Offers</h5>
                        </div>
                    </Link>
                    <Link to="/shop-owner/view-users" className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="text-center">
                            <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">View All Users</h5>
                        </div>
                    </Link>
                    <Link to="/redeemed" className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="text-center">
                            <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">View Redeemed Offers</h5>
                        </div>
                    </Link>
                </div> 
            </div>
            <div className="mt-6 text-center">
                <p className="font-semibold">Generate User Login Link:</p>
                <button
                    onClick={() => navigate('/generate-link', { state: { ownerId, shopName } })}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-2"
                >
                    Generate Link
                </button>
            </div>
        </div>
    );
};

export default OwnerDashboard;
