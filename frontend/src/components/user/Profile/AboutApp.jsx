import React from "react";
import { ArrowLeft, Smartphone, Heart, Users, Award, Star, Shield, Zap, Globe, ExternalLink } from "lucide-react";

const AboutApp = ({ darkMode, onBack }) => {
  const appInfo = {
    name: "OfferWhisky",
    version: "2.1.4",
    buildNumber: "2024.1.15",
    releaseDate: "January 15, 2024",
    size: "25.8 MB"
  };

  const features = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for seamless mobile experience"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with industry-standard encryption"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for quick loading and smooth navigation"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Available in multiple languages and regions"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "App Rating", value: "4.8", icon: Star },
    { label: "Countries", value: "15+", icon: Globe },
    { label: "Downloads", value: "100K+", icon: Award }
  ];

  return (
    <div className={`flex flex-col min-h-screen ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
    } pb-20`}>
      
      {/* Header */}
      <div className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b px-4 py-4`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2 rounded-xl ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } transition-colors`}
          >
            <ArrowLeft className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-900"}`} />
          </button>
          <div className="flex items-center gap-2">
            <Smartphone className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              About App
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-6 max-w-md mx-auto">
        
        {/* App Hero */}
        <div className="text-center">
          <div className="mx-auto mb-4 rounded-3xl flex items-center justify-center p-3 ">
            <img src="OfferWhisky.png" alt="OfferWhisky Logo" className="w-20 h-20 object-cover rounded-2xl" />
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            {appInfo.name}
          </h2>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your gateway to local shopping and services
          </p>
        </div>

        {/* App Information */}
        <div className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border rounded-2xl p-6 shadow-sm`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            App Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Version</p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{appInfo.version}</p>
            </div>
            <div>
              <p className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Build</p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{appInfo.buildNumber}</p>
            </div>
            <div>
              <p className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Released</p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{appInfo.releaseDate}</p>
            </div>
            <div>
              <p className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Size</p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{appInfo.size}</p>
            </div>
          </div>
        </div>

        {/* App Statistics */}
        <div>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            App Statistics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                } border rounded-2xl p-4 text-center shadow-sm`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl ${
                  darkMode ? "bg-blue-500/20" : "bg-blue-50"
                } flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`} />
                </div>
                <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Key Features
          </h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                } border rounded-2xl p-4 shadow-sm`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${
                    darkMode ? "bg-blue-500/20" : "bg-blue-50"
                  } flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {feature.title}
                    </h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unified Mission Section */}
        <div className={`${
          darkMode ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30" : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
        } border rounded-2xl p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <Heart className={`w-6 h-6 ${darkMode ? "text-red-400" : "text-red-500"}`} />
            <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Our Vision
            </h3>
          </div>
          <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            At OfferWhisky, we envision a world where local businesses thrive and communities stay connected through trust, convenience, and technology. We are committed to empowering shop owners with powerful tools to reach more customers, while giving users a seamless way to discover, book, and enjoy exclusive offers nearby. Our focus is on simplicity, security, and creating meaningful connections that make every shopping experience rewarding.
          </p>
        </div>

        {/* Legal Links */}
        <div className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border rounded-2xl p-4 shadow-sm`}>
          <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Legal & Policies
          </h3>
          <div className="space-y-2">
            <a href="#" className={`w-full block text-left p-2 rounded-lg ${
              darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-50 text-gray-700"
            } flex items-center justify-between transition-colors`}>
              <span>Privacy Policy</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#" className={`w-full block text-left p-2 rounded-lg ${
              darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-50 text-gray-700"
            } flex items-center justify-between transition-colors`}>
              <span>Terms of Service</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#" className={`w-full block text-left p-2 rounded-lg ${
              darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-50 text-gray-700"
            } flex items-center justify-between transition-colors`}>
              <span>Open Source Licenses</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            © 2025 {appInfo.name}. All rights reserved.
          </p>
          <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
