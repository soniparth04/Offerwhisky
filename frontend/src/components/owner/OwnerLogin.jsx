import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const OwnerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();  

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(
                "http://localhost:5000/api/owner/owner-login",
                { email, password },
                { withCredentials: true } // ✅ Ensures session is stored
            );
    
            console.log("Login response:", response.data);
            navigate("/owner-dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid credentials!");
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Owner Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="p-2 border rounded"
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="p-2 border rounded"
                        required 
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </form>
                {message && <p className="mt-2 text-red-500">{message}</p>}
                <p className="text-center mt-4 text-sm">
                Don't have an account?{" "}
                <Link to="/owner-registration" className="text-blue-500 hover:underline">
                    Click here to Registration
                </Link>
            </p>
            </div>
        </div>
    );
};

export default OwnerLogin;
