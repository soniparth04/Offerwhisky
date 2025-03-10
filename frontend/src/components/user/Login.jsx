import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const { ownerId, shopName } = useParams(); // 🔹 Get ownerId from URL
    const navigate = useNavigate();
    const location = useLocation(); // 🔹 Get location state for flash message

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [flashMessage, setFlashMessage] = useState("");


    // 🔹 Display flash message if passed via navigation state
    useEffect(() => {
        if (location.state?.flashMessage) {
            setFlashMessage(location.state.flashMessage);
            // Clear flash message after 5 seconds
            setTimeout(() => setFlashMessage(""), 5000);
        }
    }, [location.state]);

    const handleLogin = async () => {
        if (!phone || !password) {
            setFlashMessage("Please enter both phone number and password.");
            return;
        }

        setLoading(true);
        setFlashMessage(""); // Clear previous messages

        try {
            const response = await axios.post(
                `https://offerwhisky.onrender.com/api/user/login/${shopName}/${ownerId}`,
                { phone, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                navigate(`/spinner/${shopName}/${ownerId}`);
            }
        } catch (error) {
            console.error("Login request failed", error);

            if (error.response) {
                if (error.response.status === 404) {
                    setFlashMessage("Invalid phone number. Please check and try again.");
                } else if (error.response.status === 401) {
                    setFlashMessage("Incorrect password. Please try again.");
                } else {
                    setFlashMessage("Failed to login. Please try again later.");
                }
            } else {
                setFlashMessage("Network error. Please check your internet connection.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* 🔹 Flash Message Section */}
                {flashMessage && (
                    <div className="bg-red-100 text-red-700 border border-red-400 p-3 text-center rounded-lg font-semibold mb-4 animate-fade-out">
                        {flashMessage}
                    </div>
                )}

                <h1 className="text-center text-2xl font-bold mb-6">Welcome to {shopName}</h1>
                <h2 className="text-xl font-bold mb-4">Login as Customer</h2>

                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full p-3 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600 transition`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="text-center mt-4 text-sm">
                    Don't have an account?{" "}
                    <Link to={`/signup/${shopName}/${ownerId}`} className="text-blue-500 hover:underline">
                        Click here to sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
