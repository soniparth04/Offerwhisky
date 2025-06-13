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
        <div className="flex flex-col items-center w-full bg-gradient-to-b from-blue-50 to-white min-h-screen px-2 sm:px-2 md:px-2 lg:px-2">


            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            {step === 1 && (
                <div className="w-full max-w-md" >
                    <div className="text-center mb-8 mt-20">
                        <h1 className="text-5xl font-bold mb-3 text-gray-800 tracking-tight">Get Started</h1>
                        <p className="text-gray-600 text-lg">by creating a free account.</p>
                    </div>
                    <div className="space-y-5">
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                <User size={20} strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />

                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                        </div>
                        <button type="button" onClick={nextStep} className="w-full bg-blue-500 text-white py-2 rounded">Next</button>
                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/shop-owner-login" className="text-blue-500 hover:underline">
                                Click here to login
                            </Link>
                        </p>
                    </div>
                </div>

            )}
            {step === 2 && (
                <div className="flex items-center justify-center min-h-screen w-full mb-4">
                    <div className="w-full max-w-sm px-2 space-y-5">
                        <div className="text-center mb-8 mt-20">
                            <h1 className="text-3xl font-bold mb-3 text-gray-800 tracking-tight">Great! You’re Almost There!
                            </h1>
                            <p className="text-gray-600 text-l">Let’s complete your business profile.
                            </p>
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full p-4 bg-transparent rounded-xl flex justify-between items-center cursor-pointer border border-gray-100 ${formData.category === "" ? "text-gray-500" : "text-black"
                                    }`}
                                required
                            >
                                <option value="" className="text-gray-500">Select Category</option>
                                <option value="Restaurant" className="text-black">Restaurant</option>
                                <option value="Salon" className="text-black">Salon</option>
                                <option value="Retail" className="text-black">Retail</option>
                                <option value="Cafe" className="text-black">Cafe</option>
                                <option value="Gym" className="text-black">Gym</option>
                                <option value="Spa" className="text-black">Spa</option>
                                <option value="Electronics" className="text-black">Electronics</option>
                                <option value="Fashion" className="text-black">Fashion</option>
                                <option value="Grocery" className="text-black">Grocery</option>
                                <option value="Bakery" className="text-black">Bakery</option>
                                <option value="Pharmacy" className="text-black">Pharmacy</option>
                                <option value="Other" className="text-black">Other</option>
                            </select>
                        </div>
                        <div>
                            {!showBusinessHours ? (
                                <div
                                    onClick={() => setShowBusinessHours(true)}
                                    className="flex border items-center justify-between  px-4 py-3 rounded cursor-pointer"
                                >
                                    <span className={formData.openingHours && formData.closingHours ? "text-black-500" : "text-gray-500"}>
                                        {formData.openingHours && formData.closingHours
                                            ? `${formData.openingHours} - ${formData.closingHours}`
                                            : "Business Hours"}
                                    </span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <label className="min-w-[100px] text-sm">Opening Time</label>
                                        <TimePicker12Hour
                                            value={formData.openingHours}
                                            onChange={(val) => setFormData({ ...formData, openingHours: val })}
                                        />
                                    </div>


                                    <div className="flex items-center gap-4">
                                        <label className="min-w-[100px] text-sm">Closing Time</label>
                                        <TimePicker12Hour
                                            value={formData.closingHours}
                                            onChange={(val) => setFormData({ ...formData, closingHours: val })}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-1 text-sm rounded hover:bg-blue-600"
                                        onClick={() => setShowBusinessHours(false)}
                                    >
                                        Done
                                    </button>

                                </div>
                            )}

                        </div>
                        <div >
                            {!showOpeningDays ? (
                                <div
                                    onClick={() => setShowOpeningDays(true)}
                                    className="flex border items-center justify-between px-4 py-3 rounded cursor-pointer"
                                >
                                    <span className={formData.openingDays.length > 0 ? "text-black-600" : "text-gray-500"}>
                                        {formData.openingDays.length > 0
                                            ? formData.openingDays.join(", ")
                                            : "Select Opening Days"}
                                    </span>
                                </div>

                            ) : (
                                <div className="space-y-2">
                                    <div className="flex gap-2 flex-wrap ml-8">
                                        {["Su", "M", "Tu", "We", "Th", "Fri", "Sa"].map((day, index) => {
                                            const isSelected = selectedDays.includes(day);
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedDays(prev =>
                                                            isSelected
                                                                ? prev.filter(d => d !== day)
                                                                : [...prev, day]
                                                        );
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            openingDays: isSelected
                                                                ? prev.openingDays.filter(d => d !== day)
                                                                : [...prev.openingDays, day]
                                                        }));
                                                    }}
                                                    className={`w-10 ml-2 h-10 rounded-full border-2 text-sm font-semibold transition
                                ${isSelected
                                                            ? "bg-blue-500 text-white border-blue-500"
                                                            : "bg-transparent text-black-500 border-black-500"
                                                        }`}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowOpeningDays(false)}
                                        className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="text" name="addressline" placeholder="Shop address" value={formData.addressline} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                        </div>

                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input
                                type="text"
                                value={address}
                                placeholder="pin location from Google Map"
                                readOnly
                                onClick={handleOpenLocation}
                                className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100"
                            />
                        </div>

                        <div className="flex justify-between gap-2">
                            <button type="button" onClick={prevStep} className="w-full bg-gray-300 py-2 rounded">Back</button>
                            <button type="button" onClick={nextStep} className="w-full bg-blue-500 text-white py-2 rounded">Next</button>
                        </div>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="flex items-center justify-center min-h-screen ">
                    <div className="space-y-4">
                        <div className="text-center mb-8 mt-20">
                            <h1 className="text-3xl font-bold mb-3 text-gray-800 tracking-tight">
                                Just One Last Step!
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Upload images to finish setting up your store.
                            </p>
                        </div>

                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <label className="block text-sm font-medium mb-1">Profile Image:</label>
                            <input type="file" accept="image/*" onChange={(e) => setShopImage(e.target.files[0])} className="w-full p-2 border rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Shop Image:</label>
                            <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} className="w-full p-2 border rounded" required />
                        </div>
                        <button type="button" onClick={prevStep} className="w-full bg-gray-300 py-2 rounded">Back</button>

                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded" onClick={handleSubmit}>Register</button>
                    </div>
                </div>

            )}

        </div>
    );
};

export default OwnerRegistration;
