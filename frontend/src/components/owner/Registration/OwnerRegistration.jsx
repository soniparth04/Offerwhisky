import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import TimePicker12Hour from "./TimePicker";
import { Clock, Calendar, User, MapPin, Image, Upload, ChevronDown } from 'lucide-react';

const OwnerRegistration = () => {
    const [step, setStep] = useState(1);
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
        longitude: "",
        category: "",
        openingHours: "",
        closingHours: "",
        addressline: "",
        openingDays: []
    });

    const [shopImage, setShopImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showBusinessHours, setShowBusinessHours] = useState(false);
    const [showOpeningDays, setShowOpeningDays] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
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
        const locationSelected = localStorage.getItem("locationSelected");
        if (storedForm) {
            setFormData(prev => ({
                ...prev,
                ...storedForm
            }));
        }
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

        if (locationSelected === "true") {
            setStep(2);
            localStorage.removeItem("locationSelected");
        }
    }, []);

    return (
        <div>
            <div className="bg-gradient-to-b from-indigo-200 to-white pl-2 rounded-b-xl shadow-sm">
                <div className="flex justify-between items-center">
                    {/* Left side: Store image + name */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => navigate('/shop-owner/my-store')}
                    >
                        <div className="w-14 h-14 mb-4 rounded-full overflow-hidden shadow-md border-2 border-white transition-all transform group-hover:scale-105 group-hover:shadow-lg">
                            <img
                                src={shopImage}
                                alt="Store Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="ml-5 mt-6">
                            <h2 className="text-2xl ml-2 font-extrabold text-gray-800 tracking-tight group-hover:text-indigo-800 transition-colors">
                                {shopName ? `${shopName} ` : "Loading..."}
                            </h2>
                            <div className="flex items-center text-gray-500 ml-2 mt-1">
                                <MapPin size={14} className="mr-1" />
                                <span className="text-sm">Merchant Dashboard</span>
                            </div>
                            <p className="-ml-14 pb-4 font-extrabold text-[10px] text-gray-500 leading-none">
                                My Store
                            </p>
                        </div>
                    </div>

                    {/* Right side: Help button */}
                    <button
                        className="relative p-2.5 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-all hover:shadow-md mr-2"
                        onClick={() => navigate('/help-support')}
                    >
                        <HelpCircle size={20} className="text-gray-600" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </div>
            <StatGrid />
            <Management />
            <BottomNavigation />
        </div>
    );
};

export default OwnerRegistration;
