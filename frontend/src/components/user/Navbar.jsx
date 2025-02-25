import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { ownerId } = useParams(); // Get ownerId from the current URL

    const handleLogout = async () => {
        try {
            await axios.post('https://offerwhisky.vercel.app/api/user/logout', {}, { withCredentials: true });
            console.log("User logged out successfully");

            // Redirect to the correct login route
            if (ownerId) {
                navigate(`/login/${ownerId}`);
            } else {
                navigate("/"); // Fallback in case ownerId is missing
            }

        } catch (error) {
            console.error('Error logging out:', error);
            alert('Logout failed, please try again.');
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-400 to-indigo-800 p-4 flex justify-between items-center">
            <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
