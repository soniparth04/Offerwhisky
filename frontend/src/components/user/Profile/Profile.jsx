import React, { useState } from "react";
import {
  User2,
  ChevronRight,
  Receipt,
  Briefcase,
  ShieldCheck,
  Languages,
  Bell,
  MessageCircleQuestion,
  UserRound,
  Edit,
  Star,
  Moon,
  Sun,
  Phone,
  FileText,
  Shield,
  LogOut,
  Award,
  Sparkles,
  Crown,
  Home,
  MapPin,
  ShoppingBag,
  User,
} from "lucide-react";

// Import the individual page components
import MyAccount from "./MyAccount";
import CouponHistory from "./CouponHistory";
import BusinessAccount from "./BusinessAccount";
import LanguageRegions from "./LanguageRegions";
import Notifications from "./Notifications";
import HelpSupport from "./HelpSupport";
import FAQs from "./FAQs";
import ContactUs from "./ContactUs";
import AboutApp from "./AboutApp";
import { Terms, PrivacyPolicy } from "./Terms";
import Navbar from "../Navbar.jsx";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile");

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const goBackToProfile = () => {
    setCurrentPage("profile");
  };

  // Render different pages based on current page
  if (currentPage === "myAccount") {
    return <MyAccount darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "couponHistory") {
    return <CouponHistory darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "businessAccount") {
    return <BusinessAccount darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "languageRegions") {
    return <LanguageRegions darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "notifications") {
    return <Notifications darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "helpSupport") {
    return <HelpSupport darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "faqs") {
    return <FAQs darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "contactUs") {
    return <ContactUs darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "aboutApp") {
    return <AboutApp darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "terms") {
    return <Terms darkMode={darkMode} onBack={goBackToProfile} />;
  }

  if (currentPage === "PrivacyPolicy") {
    return <PrivacyPolicy darkMode={darkMode} onBack={goBackToProfile} />;
  }

  const MenuSection = ({ title, children }) => (
    <div
      className={`${
        darkMode ? "bg-gray-800 shadow-gray-900/20" : "bg-white shadow-gray-100"
      } rounded-2xl mx-4 mb-4 overflow-hidden shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-100"
      } transition-all duration-300`}
    >
      <div
        className={`px-4 py-3 ${
          darkMode
            ? "bg-gray-750 border-gray-700"
            : "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
        } border-b`}
      >
        <h3
          className={`text-sm font-semibold ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } uppercase tracking-wide`}
        >
          {title}
        </h3>
      </div>
      <div
        className={`divide-y ${
          darkMode ? "divide-gray-700" : "divide-gray-100"
        }`}
      >
        {children}
      </div>
    </div>
  );

  const MenuItem = ({
    icon: Icon,
    title,
    subtitle,
    onClick,
    rightElement,
    premium = false,
  }) => (
    <div
      className={`flex items-center justify-between p-4 ${
        darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
      } transition-all duration-200 cursor-pointer group relative overflow-hidden`}
      onClick={onClick}
    >
      {premium && (
        <div className="absolute top-0 right-0 w-6 h-6">
          <Crown className="w-3 h-3 text-yellow-500 absolute top-1 right-1" />
        </div>
      )}
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-2xl ${
            darkMode
              ? "bg-blue-500/10 group-hover:bg-blue-500/20"
              : "bg-blue-50 group-hover:bg-blue-100"
          } flex items-center justify-center transition-all duration-200 group-hover:scale-105`}
        >
          <Icon
            className={`w-5 h-5 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            } transition-colors duration-200`}
          />
        </div>
        <div>
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-gray-100" : "text-gray-900"
            } transition-colors duration-200`}
          >
            {title}
          </p>
          {subtitle && (
            <p
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } transition-colors duration-200`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {rightElement || (
        <ChevronRight
          className={`w-5 h-5 ${
            darkMode
              ? "text-gray-500 group-hover:text-gray-400"
              : "text-gray-400 group-hover:text-gray-600"
          } transition-all duration-200 group-hover:translate-x-1`}
        />
      )}
    </div>
  );

  return (
    <div
      className={`flex flex-col min-h-screen overflow-hidden ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      } w-full pb-20 transition-all duration-300`}
    >
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-10 -right-10 w-40 h-40 ${
            darkMode ? "bg-blue-500/5" : "bg-blue-200/30"
          } rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute top-1/2 -left-10 w-32 h-32 ${
            darkMode ? "bg-purple-500/5" : "bg-purple-200/30"
          } rounded-full blur-3xl animate-pulse delay-1000`}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-24 h-24 ${
            darkMode ? "bg-pink-500/5" : "bg-pink-200/30"
          } rounded-full blur-3xl animate-pulse delay-2000`}
        ></div>
      </div>

      {/* Header */}
      <div className="m-4 text-center">
        <h1
          className={`text-3xl font-bold transition-all duration-500 
      ${
        darkMode
          ? "bg-indigo-600 text-transparent bg-clip-text"
          : "bg-indigo-600 text-transparent bg-clip-text"
      }`}
        >
          Your Profile
        </h1>
      </div>

      {/* Profile Card */}
      <div className="relative mx-4 mb-6">
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20"
              : "bg-gradient-to-br from-blue-600/10 to-purple-600/10"
          } rounded-3xl blur-xl`}
        ></div>
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-6 text-white shadow-2xl border border-white/10 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 blur-2xl"></div>

          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center">
              <div>
                <h2 className="text-2xl font-bold">Rajesh Kumar</h2>
                <p className="text-blue-100 text-sm">+91 1234567890</p>
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-105 active:scale-95"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Completion */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-blue-100 font-medium">
                Profile Completion
              </span>
              <span className="text-sm font-bold">75%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm border border-white/20">
              <div
                className="bg-gradient-to-r from-white to-blue-100 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-xs text-blue-100 mt-2 opacity-80">
              Complete your profile to unlock more features
            </p>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <MenuSection title="Account">
        <MenuItem
          icon={User2}
          title="My Account"
          subtitle="Manage your personal information"
          onClick={() => navigateToPage("myAccount")}
        />
        <MenuItem
          icon={Receipt}
          title="Coupon History"
          subtitle="View all your previous coupons"
          onClick={() => navigateToPage("couponHistory")}
        />
      </MenuSection>

      {/* Business Section */}
      <MenuSection title="Business">
        <MenuItem
          icon={Briefcase}
          title="Switch To Business Account"
          subtitle="Unlock business features and benefits"
          onClick={() => navigateToPage("businessAccount")}
          premium={true}
        />
      </MenuSection>

      {/* App Settings */}
      <MenuSection title="App Settings">
        <MenuItem
          icon={Languages}
          title="Language & Regions"
          subtitle="Set app language and formats"
          onClick={() => navigateToPage("languageRegions")}
        />
        <MenuItem
          icon={Bell}
          title="Notifications"
          subtitle="Manage your notification preferences"
          onClick={() => navigateToPage("notifications")}
        />

        {/* Dark Mode Section Commented */}

        {/* <MenuItem
          icon={darkMode ? Sun : Moon}
          title="Dark Mode"
          subtitle={`Currently ${darkMode ? "enabled" : "disabled"}`}
          onClick={toggleDarkMode}
          rightElement={
            <div
              className={`w-14 h-7 rounded-full transition-all duration-300 ${
                darkMode
                  ? "bg-blue-500 shadow-blue-500/50 shadow-lg"
                  : "bg-gray-300"
              } relative cursor-pointer hover:scale-105`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow-lg ${
                  darkMode
                    ? "translate-x-7 shadow-blue-200/50"
                    : "translate-x-0.5"
                } flex items-center justify-center`}
              >
                {darkMode ? (
                  <Moon className="w-3 h-3 text-blue-600" />
                ) : (
                  <Sun className="w-3 h-3 text-amber-500" />
                )}
              </div>
            </div>
          }
        /> */}
      </MenuSection>

      {/* Support Section */}
      <MenuSection title="Support">
        <MenuItem
          icon={MessageCircleQuestion}
          title="Help & Support"
          subtitle="Get help with any issues"
          onClick={() => navigateToPage("helpSupport")}
        />
        <MenuItem
          icon={FileText}
          title="FAQs"
          subtitle="Frequently asked questions"
          onClick={() => navigateToPage("faqs")}
        />
        <MenuItem
          icon={Phone}
          title="Contact Us"
          subtitle="Reach out to our support team"
          onClick={() => navigateToPage("contactUs")}
        />
        <MenuItem
          icon={MessageCircleQuestion}
          title="About App"
          subtitle="Learn more about the application"
          onClick={() => navigateToPage("aboutApp")}
        />
      </MenuSection>

      {/* Legal Section */}
      <MenuSection title="Legal">
        <MenuItem
          icon={FileText}
          title="Terms of Use"
          subtitle="Read our terms and conditions"
          onClick={() => navigateToPage("terms")}
        />
        <MenuItem
          icon={Shield}
          title="Privacy Policy"
          subtitle="Learn how we protect your data"
          onClick={() => navigateToPage("PrivacyPolicy")}
        />
      </MenuSection>

      {/* Logout Button */}
      <div className="mx-4 mb-8">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center justify-center gap-3 p-4 cursor-pointer ${
            darkMode
              ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
              : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300"
          } border-2 rounded-2xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      {/* Navbar */}
      <Navbar darkMode={darkMode} />
    </div>
  );
};

export default Profile;
