import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const { ownerId } = useParams(); // Get ownerId from URL
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', phone: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/user/signup/${ownerId}`, // ✅ ownerId already in URL
                user,  // ❌ Removed redundant ownerId
                { withCredentials: true } // ✅ Ensures session cookies are sent
            );
    
            if (response.status === 201) {
                navigate(`/spinner/${ownerId}`); // ✅ Redirect to spinner with ownerId
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error signing up.');
        }
    };
    

    return (
        <div className="flex justify-center items-end min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-center text-2xl font-bold mb-6">Welcome to Wow Hair</h1>
                <h1 className="text-xl mb-4 font-bold">Signup</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={user.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={user.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    {errorMessage && (
                        <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{errorMessage}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Signup
                    </button>
                    <p className="text-center mt-4 text-sm">
                Already have an account?{" "}
                <Link to={`/login/${ownerId}`} className="text-blue-500 hover:underline">
                    Click here to login
                </Link>
            </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
