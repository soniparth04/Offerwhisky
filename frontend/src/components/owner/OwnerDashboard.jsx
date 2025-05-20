import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNavigation from './Navbar/BottomNav';
import StatGrid from './DashboardComponent/StateGrid';
import Management from './DashboardComponent/Manage';

const OwnerDashboard = () => {
    const navigate = useNavigate();
    const [shopName, setShopName] = useState("");
    const [shopImage, setShopImage] = useState("");

    useEffect(() => {
        // Fetch owner's shop name
        const fetchOwnerInfo = async () => {
            try {
                const response = await axios.get("https://offerwhisky.onrender.com/api/owner/owner-info", { withCredentials: true });
                setShopName(response.data.shopName);
                setShopImage(response.data.shopImage);

            } catch (error) {
                console.error("Error fetching owner info:", error);
                navigate("/shop-owner-login"); 
            }
        };
        fetchOwnerInfo();
    }, [navigate]);

    return (
       <div>
            <div className="flex items-center p-4 border-b border-gray-100">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate('/shop-owner/my-store')}
                >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            src={shopImage}
                            alt="Store Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="ml-5 mt-6">
                        <h2 className="font-extrabold text-[22px] text-[#252525] w-[150px] h-[29px] whitespace-nowrap ml-4">
                            {shopName ? `${shopName} ` : "Loading..."}
                        </h2>
                        <p className="mt-2 -ml-12 font-extrabold text-[10px] text-gray-500 leading-none">
                            My Store
                        </p>
                    </div>
                </div>
            </div>

            <StatGrid/>
            <Management/>
            <BottomNavigation />
        </div>
    );
};

export default OwnerDashboard;
