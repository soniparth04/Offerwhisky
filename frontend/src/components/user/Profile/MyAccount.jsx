import React, { useState } from "react";
import { ArrowLeft, User2, Mail, Phone, MapPin, Calendar, Camera, Save, Edit3 } from "lucide-react";

const MyAccount = ({ darkMode, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 1234567890",
    address: "123 Main Street, Ratlam, Madhya Pradesh",
    dateOfBirth: "1990-05-15",
    gender: "Male"
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving user data:", formData);
    setIsEditing(false);
  };

  return (
    <div className={`flex flex-col min-h-screen ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
    } pb-20`}>
      
      {/* Header */}
      <div className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b px-4 py-4 flex items-center gap-3`}>
        <button
          onClick={onBack}
          className={`p-2 rounded-xl ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors`}
        >
          <ArrowLeft className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-900"}`} />
        </button>
        <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          My Account
        </h1>
        <div className="flex-1" />
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            isEditing 
              ? darkMode ? "bg-red-500/20 text-red-400" : "bg-red-50 text-red-600"
              : darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"
          } transition-colors`}
        >
          <Edit3 className="w-4 h-4" />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Profile Picture Section */}
      <div className="p-4">
        <div className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-2xl p-6 shadow-lg`}>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                RK
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <h2 className={`mt-4 text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {formData.name}
            </h2>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Member since 2024
            </p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="px-4 space-y-4">
        <FormField
          icon={User2}
          label="Full Name"
          value={formData.name}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("name", value)}
          darkMode={darkMode}
        />
        
        <FormField
          icon={Mail}
          label="Email Address"
          value={formData.email}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("email", value)}
          darkMode={darkMode}
          type="email"
        />
        
        <FormField
          icon={Phone}
          label="Phone Number"
          value={formData.phone}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("phone", value)}
          darkMode={darkMode}
          type="tel"
        />
        
        <FormField
          icon={MapPin}
          label="Address"
          value={formData.address}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("address", value)}
          darkMode={darkMode}
          multiline={true}
        />
        
        <FormField
          icon={Calendar}
          label="Date of Birth"
          value={formData.dateOfBirth}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("dateOfBirth", value)}
          darkMode={darkMode}
          type="date"
        />

        <div className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-2xl p-4 shadow-lg`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl ${
              darkMode ? "bg-blue-500/20" : "bg-blue-50"
            } flex items-center justify-center`}>
              <User2 className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <label className={`text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Gender
            </label>
          </div>
          
          {isEditing ? (
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-white" 
                  : "bg-gray-50 border-gray-200 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <p className={`px-3 py-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {formData.gender}
            </p>
          )}
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="p-4 mt-6">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

const FormField = ({ icon: Icon, label, value, isEditing, onChange, darkMode, type = "text", multiline = false }) => {
  return (
    <div className={`${
      darkMode ? "bg-gray-800" : "bg-white"
    } rounded-2xl p-4 shadow-lg`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${
          darkMode ? "bg-blue-500/20" : "bg-blue-50"
        } flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
        </div>
        <label className={`text-sm font-medium ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          {label}
        </label>
      </div>
      
      {isEditing ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-3 rounded-xl border ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-white" 
                : "bg-gray-50 border-gray-200 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            rows={3}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-3 rounded-xl border ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-white" 
                : "bg-gray-50 border-gray-200 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        )
      ) : (
        <p className={`px-3 py-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {value}
        </p>
      )}
    </div>
  );
};

export default MyAccount;