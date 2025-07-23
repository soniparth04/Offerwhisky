import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone } from 'lucide-react';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    // For now, just navigate to the next screen
    // Later this will include actual authentication logic
    navigate('/otp-verification');
  };

  const handleRegister = () => {
    // Navigate to registration page
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Welcome Text */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600 text-lg">
              sign in to access your account
            </p>
          </div>

          {/* Phone Input */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                className="w-full px-4 py-4 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Smartphone className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with button and register link */}
      <div className="max-w-md mx-auto w-full pb-8">
        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center mb-6"
        >
          Next
          <svg 
            className="w-5 h-5 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>

        {/* Register Link */}
        <div className="text-center">
          <button
            onClick={handleRegister}
            className="text-gray-700 text-lg hover:text-gray-900 transition-colors duration-200"
          >
            New Member? <span className="font-semibold text-gray-900">Register now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
