import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, User, Mail } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    // For now, navigate to OTP verification
    navigate('/otp-verification');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Welcome Text */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 text-lg">
              sign up to get started
            </p>
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full px-4 py-4 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            {/* Phone Input */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-4 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Smartphone className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-4 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Mail className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with button and login link */}
      <div className="max-w-md mx-auto w-full pb-8">
        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mb-6"
        >
          Register
        </button>

        {/* Login Link */}
        <div className="text-center">
          <button
            onClick={handleLogin}
            className="text-gray-700 text-lg hover:text-gray-900 transition-colors duration-200"
          >
            Already have an account? <span className="font-semibold text-gray-900">Sign in</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
