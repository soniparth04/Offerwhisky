import React from "react";
import { useNavigate } from "react-router-dom";
import Bell from "../../../assets/Home/bell.png"
import GiftBox from "../../../assets/Home/gift.png"
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneLight } from "react-icons/pi";

const SearchBar = () => {
    const navigate = useNavigate(); // Initialize navigate function
    
    const handleBellClick = () => {
        navigate("/notification"); // Navigate to /notification
    };
    
    const handleRewardsClick = () => {
        navigate("/rewards"); // Navigate to /rewards
    };

    const handleSearchClick = () => {
        navigate("/search"); // Navigate to search page
    };

    const handleSearchInputClick = () => {
        navigate("/search"); // Navigate to search page when input is clicked
    };

    return (
        <div
            className="flex items-center justify-between w-full px-4 py-1 overflow-x-hidden"
            style={{ backgroundColor: '#ffffff' }} // Explicitly set white background
        >
            <div className="flex items-center space-x-2 border border-gray-300 px-3 py-2 flex-1 mr-5 rounded-3xl cursor-pointer hover:border-gray-400 transition-colors" 
                 style={{ backgroundColor: '#ffffff' }}
                 onClick={handleSearchInputClick}>
                <span className="text-gray-600" onClick={handleSearchClick}>
                    <CiSearch className="w-5 h-5 cursor-pointer" />
                </span>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full border-none outline-none text-sm bg-transparent text-black cursor-pointer"
                    onClick={handleSearchInputClick}
                    readOnly
                />
                <button className="text-gray-600">
                    <PiMicrophoneLight className="w-5 h-5" />
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