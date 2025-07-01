import React from "react";
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Bell from "../../../assets/Home/bell.png"
import GiftBox from "../../../assets/Home/gift.png"

const SearchBar = () => {

    const navigate = useNavigate(); // Initialize navigate function

    const handleBellClick = () => {
        navigate("/notification"); // Navigate to /notification
    };
    
    const handleRewardsClick = () => {
        navigate("/rewards"); // Navigate to /rewards
    };

    return (
        <div
            className="flex items-center justify-between w-full px-4 py-3 overflow-x-hidden"
            style={{ backgroundColor: '#ffffff' }} // Explicitly set white background
        >
            <div className="flex items-center space-x-2 border border-gray-300 rounded px-3 py-2 flex-1 mr-5" style={{ backgroundColor: '#ffffff' }}>
                <span className="text-gray-600 mr-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full border-none outline-none text-sm bg-transparent text-black"
                />
                <button className="text-gray-600 ml-1">
                    <FontAwesomeIcon icon={faMicrophone} />
                </button>
            </div>

            {/* Icons Section */}
            <div className="flex items-center shrink-0">
                <button onClick={handleBellClick} className="text-gray-600 focus:outline-none mr-6">
                    <img src={Bell} alt="Bell" className="w-6 h-6" />
                </button>
                <button onClick={handleRewardsClick} className="text-gray-600 focus:outline-none">
                    <img src={GiftBox} alt="Gift" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;