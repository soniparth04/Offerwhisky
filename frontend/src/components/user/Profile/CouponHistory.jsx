import React, { useState } from "react";
import { ArrowLeft, Tag, Calendar, CheckCircle, XCircle, Clock, Gift, Search, Filter } from "lucide-react";

const CouponHistory = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const coupons = [
    {
      id: 1,
      code: "SAVE20",
      title: "20% Off on Electronics",
      discount: "20%",
      usedDate: "2024-01-15",
      expiryDate: "2024-01-31",
      status: "used",
      storeName: "TechMart",
      savedAmount: "₹500"
    },
    {
      id: 2,
      code: "WELCOME50",
      title: "Welcome Bonus",
      discount: "₹50 Off",
      usedDate: null,
      expiryDate: "2024-12-31",
      status: "active",
      storeName: "FashionHub",
      savedAmount: null
    },
    {
      id: 3,
      code: "EXPIRED10",
      title: "10% Off on Groceries",
      discount: "10%",
      usedDate: null,
      expiryDate: "2024-01-10",
      status: "expired",
      storeName: "FreshMart",
      savedAmount: null
    },
    {
      id: 4,
      code: "FLASH30",
      title: "Flash Sale Special",
      discount: "30%",
      usedDate: "2024-01-12",
      expiryDate: "2024-01-20",
      status: "used",
      storeName: "QuickShop",
      savedAmount: "₹1200"
    },
    {
      id: 5,
      code: "NEWUSER25",
      title: "New User Discount",
      discount: "25%",
      usedDate: null,
      expiryDate: "2024-06-30",
      status: "active",
      storeName: "MegaStore",
      savedAmount: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "used":
        return darkMode ? "text-green-400 bg-green-500/20" : "text-green-600 bg-green-50";
      case "active":
        return darkMode ? "text-blue-400 bg-blue-500/20" : "text-blue-600 bg-blue-50";
      case "expired":
        return darkMode ? "text-red-400 bg-red-500/20" : "text-red-600 bg-red-50";
      default:
        return darkMode ? "text-gray-400 bg-gray-500/20" : "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "used":
        return <CheckCircle className="w-4 h-4" />;
      case "active":
        return <Clock className="w-4 h-4" />;
      case "expired":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || coupon.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalSaved = coupons
    .filter(c => c.status === "used" && c.savedAmount)
    .reduce((total, c) => total + parseInt(c.savedAmount.replace("₹", "")), 0);

  return (
    <div className={`flex flex-col min-h-screen ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
    } pb-20`}>
      
      {/* Header */}
      <div className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b px-4 py-4`}>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className={`p-2 rounded-xl ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } transition-colors`}
          >
            <ArrowLeft className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-900"}`} />
          </button>
          <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Coupon History
          </h1>
        </div>

        {/* Stats Card */}
        <div className={`${
          darkMode ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30" : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
        } border rounded-2xl p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-700"}`}>Total Saved</p>
              <p className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>₹{totalSaved}</p>
            </div>
            <div className={`p-3 rounded-2xl ${darkMode ? "bg-green-500/20" : "bg-green-100"}`}>
              <Gift className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`} />
          <input
            type="text"
            placeholder="Search coupons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              darkMode 
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "active", "used", "expired"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl font-medium capitalize whitespace-nowrap transition-colors ${
                filterStatus === status
                  ? darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"
                  : darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons List */}
      <div className="flex-1 px-4 space-y-3">
        {filteredCoupons.length === 0 ? (
          <div className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl p-8 text-center`}>
            <Tag className={`w-12 h-12 mx-auto mb-4 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`} />
            <p className={`text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              No coupons found
            </p>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          filteredCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} darkMode={darkMode} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
          ))
        )}
      </div>
    </div>
  );
};

const CouponCard = ({ coupon, darkMode, getStatusColor, getStatusIcon }) => {
  return (
    <div className={`${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
    } border rounded-2xl p-4 hover:scale-[1.02] transition-transform shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {coupon.code}
            </h3>
            <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${getStatusColor(coupon.status)}`}>
              {getStatusIcon(coupon.status)}
              {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
            </span>
          </div>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {coupon.title}
          </p>
          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {coupon.storeName}
          </p>
        </div>
        <div className={`text-right`}>
          <p className={`text-lg font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
            {coupon.discount}
          </p>
          {coupon.savedAmount && (
            <p className={`text-xs ${darkMode ? "text-green-400" : "text-green-600"}`}>
              Saved {coupon.savedAmount}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <Calendar className={`w-3 h-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
          </span>
        </div>
        {coupon.usedDate && (
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Used: {new Date(coupon.usedDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default CouponHistory;