import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const OwnerRegistration = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        shopName: "",
        password: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        latitude: "",
        longitude: ""
    });

    const [shopImage, setShopImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const [address, setAddress] = useState(localStorage.getItem("selectedAddress") || "");

    const handleOpenLocation = () => {
        localStorage.setItem("ownerFormData", JSON.stringify(formData));
        navigate('/select-location');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });
            data.append("address", address);
            if (shopImage) data.append("shopImage", shopImage);
            if (profileImage) data.append("profileImage", profileImage);

            const response = await axios.post("https://offerwhisky.onrender.com/api/owner/owner-registration", data, {
                headers: { "Content-Type": "multipart/form-data" }
            }, { withCredentials: true });

            setSuccess("Owner registered successfully!");
            localStorage.removeItem("selectedAddressDetails");
            localStorage.removeItem("ownerFormData");
            setTimeout(() => navigate("/shop-owner-dashboard"), 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            console.log
                (err.response?.data?.message);
        }
    };

    useEffect(() => {
        const storedForm = JSON.parse(localStorage.getItem("ownerFormData"));
        const storedDetails = JSON.parse(localStorage.getItem("selectedAddressDetails"));

        if (storedForm) {
            setFormData(prev => ({
                ...prev,
                ...storedForm
            }));
        }

        if (storedDetails) {
            setAddress(storedDetails.address || "");
            setFormData(prev => ({
                ...prev,
                city: storedDetails.city || "",
                state: storedDetails.state || "",
                country: storedDetails.country || "",
                pinCode: storedDetails.pinCode || "",
                latitude: storedDetails.latitude || "",
                longitude: storedDetails.longitude || ""
            }));
        }
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Shop Owner Registration</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input
                    type="text"
                    value={address}
                    placeholder="Click to select location"
                    readOnly
                    onClick={handleOpenLocation}
                    className="w-full p-2 border rounded"
                />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="pinCode" placeholder="Pin Code" value={formData.pinCode} onChange={handleChange} className="w-full p-2 border rounded" required />

                <div>
                    <label className="block text-sm font-medium mb-1">Shop Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => setShopImage(e.target.files[0])} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Profile Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} className="w-full p-2 border rounded" required />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
            </form>

            <p className="text-center mt-4 text-sm">
                Already have an account?{" "}
                <Link to="/shop-owner-login" className="text-blue-500 hover:underline">
                    Click here to login
                </Link>
            </p>
        </div>
    );
};

export default OwnerRegistration;
