import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

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
     const [loading, setLoading] = useState(false);

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
        setLoading(true);

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
        finally {
        setLoading(false); // stop loading
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


            {(error || success) && (
                <div className={`mt-6 w-full max-w-md text-center px-4 py-3 rounded-md font-medium 
      ${error ? "bg-red-100 text-red-700 border border-red-300" : "bg-green-100 text-green-700 border border-green-300"}`}>
                    {error || success}
                </div>
            )}

            {step === 1 && (
                <StepOne formData={formData} handleChange={handleChange} nextStep={nextStep} />

            )}
            {step === 2 && (
                <StepTwo formData={formData} setFormData={setFormData} handleChange={handleChange} nextStep={nextStep} showBusinessHours={showBusinessHours}
                    setShowBusinessHours={setShowBusinessHours} showOpeningDays={showOpeningDays} setShowOpeningDays={setShowOpeningDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} handleOpenLocation={handleOpenLocation} address={address} prevStep={prevStep} />
            )}
            {step === 3 && (
                <StepThree prevStep={prevStep} handleSubmit={handleSubmit} setShopImage={setShopImage}
                    setProfileImage={setProfileImage} loading={loading} />
            )}

        </div>
    );
};

export default OwnerRegistration;
