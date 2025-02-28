import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
    const [phone, setPhone] = useState(localStorage.getItem("phone") || "");  // Get phone number from local storage
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const verifyOTP = async () => {
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }
    
        setLoading(true);  // Set loading state for OTP verification
    
        try {
            const response = await axios.post("https://offerwhisky.onrender.com/api/user/verify-otp", {
                phone,  // Make sure this is the phone number stored in localStorage
                otp,    // Pass OTP entered by user
            });
    
            if (response.status === 200) {
                navigate("/spinner"); // Redirect on success
            }
        } catch (error) {
            console.error("OTP verification failed", error);
            alert("OTP verification failed. Please try again.");
        } finally {
            setLoading(false);  // Reset loading state
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-center text-2xl font-bold mb-6">Verify OTP</h1>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP sent to {phone}
                </label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />

                <button
                    onClick={verifyOTP}
                    disabled={loading}  // Disable button while loading
                    className={`w-full p-3 ${loading ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-lg hover:bg-green-600 transition`}
                >
                    {loading ? "Verifying OTP..." : "Verify OTP"}
                </button>
            </div>
        </div>
    );
};

export default VerifyOtp;
