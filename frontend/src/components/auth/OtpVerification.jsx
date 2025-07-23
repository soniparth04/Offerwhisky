import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = () => {
    // For now, navigate to home page
    navigate('/');
  };

  const handleResend = () => {
    // Reset timer
    setTimer(30);
    setIsResendDisabled(true);
    setOtp(['', '', '', '', '', '']);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Almost there
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Please enter the 6-digit code sent to your phone number{' '}
              <span className="font-semibold text-gray-900">70xxxxxxx21</span>{' '}
              for verification.
            </p>
          </div>

          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 bg-gray-100 rounded-xl text-center text-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                maxLength="1"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="max-w-md mx-auto w-full pb-8">
        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mb-6"
        >
          Verify
        </button>

        {/* Resend Section */}
        <div className="text-center">
          <p className="text-gray-700 text-lg mb-1">
            Didn't receive any code?{' '}
            <button
              onClick={handleResend}
              disabled={isResendDisabled}
              className={`font-semibold ${
                isResendDisabled 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-900 hover:text-blue-600'
              } transition-colors duration-200`}
            >
              Resend Again
            </button>
          </p>
          <p className="text-gray-500 text-sm">
            Request new code in {formatTimer(timer)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
