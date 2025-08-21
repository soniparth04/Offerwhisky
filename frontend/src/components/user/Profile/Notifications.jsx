import React, { useState } from "react";
import { ArrowLeft, Bell, BellOff, Smartphone, Mail, MessageSquare, ShoppingBag, Tag, Zap, Clock, Volume2, VolumeX } from "lucide-react";

const Notifications = ({ darkMode, onBack }) => {
  const [settings, setSettings] = useState({
    // Push Notifications
    pushEnabled: true,
    orderUpdates: true,
    promotions: true,
    newFeatures: false,
    
    // Email Notifications
    emailEnabled: true,
    weeklyDigest: true,
    specialOffers: true,
    accountUpdates: true,
    
    // SMS Notifications
    smsEnabled: false,
    orderDelivery: false,
    importantUpdates: false,
    
    // Sound & Vibration
    soundEnabled: true,
    vibrationEnabled: true,
    
    // Quiet Hours
    quietHoursEnabled: false,
    quietStartTime: "22:00",
    quietEndTime: "07:00"
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTimeChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving notification settings:", settings);
    // Handle save logic
  };

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
            <Bell className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Notifications
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-6">
        
        {/* Quick Toggle */}
        <div className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border rounded-2xl p-4 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${
                settings.pushEnabled 
                  ? darkMode ? "bg-green-500/20" : "bg-green-50"
                  : darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}>
                {settings.pushEnabled ? (
                  <Bell className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                ) : (
                  <BellOff className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                )}
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  All Notifications
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {settings.pushEnabled ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.pushEnabled}
              onToggle={() => toggleSetting('pushEnabled')}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Push Notifications */}
        <NotificationSection
          title="Push Notifications"
          icon={Smartphone}
          darkMode={darkMode}
        >
          <NotificationOption
            title="Order Updates"
            description="Get notified about your order status"
            enabled={settings.orderUpdates}
            onToggle={() => toggleSetting('orderUpdates')}
            darkMode={darkMode}
            disabled={!settings.pushEnabled}
          />
          <NotificationOption
            title="Promotions & Deals"
            description="Special offers and discounts"
            enabled={settings.promotions}
            onToggle={() => toggleSetting('promotions')}
            darkMode={darkMode}
            disabled={!settings.pushEnabled}
          />
          <NotificationOption
            title="New Features"
            description="Updates about app improvements"
            enabled={settings.newFeatures}
            onToggle={() => toggleSetting('newFeatures')}
            darkMode={darkMode}
            disabled={!settings.pushEnabled}
          />
        </NotificationSection>

        {/* Email Notifications */}
        <NotificationSection
          title="Email Notifications"
          icon={Mail}
          darkMode={darkMode}
        >
          <NotificationOption
            title="Enable Email Notifications"
            description="Receive notifications via email"
            enabled={settings.emailEnabled}
            onToggle={() => toggleSetting('emailEnabled')}
            darkMode={darkMode}
          />
          <NotificationOption
            title="Weekly Digest"
            description="Summary of your weekly activity"
            enabled={settings.weeklyDigest}
            onToggle={() => toggleSetting('weeklyDigest')}
            darkMode={darkMode}
            disabled={!settings.emailEnabled}
          />
          <NotificationOption
            title="Special Offers"
            description="Exclusive deals via email"
            enabled={settings.specialOffers}
            onToggle={() => toggleSetting('specialOffers')}
            darkMode={darkMode}
            disabled={!settings.emailEnabled}
          />
          <NotificationOption
            title="Account Updates"
            description="Important account information"
            enabled={settings.accountUpdates}
            onToggle={() => toggleSetting('accountUpdates')}
            darkMode={darkMode}
            disabled={!settings.emailEnabled}
          />
        </NotificationSection>

        {/* SMS Notifications */}
        <NotificationSection
          title="SMS Notifications"
          icon={MessageSquare}
          darkMode={darkMode}
        >
          <NotificationOption
            title="Enable SMS Notifications"
            description="Receive notifications via text message"
            enabled={settings.smsEnabled}
            onToggle={() => toggleSetting('smsEnabled')}
            darkMode={darkMode}
          />
          <NotificationOption
            title="Order Delivery"
            description="Get SMS when your order is delivered"
            enabled={settings.orderDelivery}
            onToggle={() => toggleSetting('orderDelivery')}
            darkMode={darkMode}
            disabled={!settings.smsEnabled}
          />
          <NotificationOption
            title="Important Updates"
            description="Critical account and security updates"
            enabled={settings.importantUpdates}
            onToggle={() => toggleSetting('importantUpdates')}
            darkMode={darkMode}
            disabled={!settings.smsEnabled}
          />
        </NotificationSection>

        {/* Sound & Vibration */}
        <NotificationSection
          title="Sound & Vibration"
          icon={Volume2}
          darkMode={darkMode}
        >
          <NotificationOption
            title="Sound"
            description="Play sound for notifications"
            enabled={settings.soundEnabled}
            onToggle={() => toggleSetting('soundEnabled')}
            darkMode={darkMode}
            icon={settings.soundEnabled ? Volume2 : VolumeX}
          />
          <NotificationOption
            title="Vibration"
            description="Vibrate for notifications"
            enabled={settings.vibrationEnabled}
            onToggle={() => toggleSetting('vibrationEnabled')}
            darkMode={darkMode}
            icon={Zap}
          />
        </NotificationSection>

        {/* Quiet Hours */}
        <NotificationSection
          title="Quiet Hours"
          icon={Clock}
          darkMode={darkMode}
        >
          <NotificationOption
            title="Enable Quiet Hours"
            description="Disable notifications during specific hours"
            enabled={settings.quietHoursEnabled}
            onToggle={() => toggleSetting('quietHoursEnabled')}
            darkMode={darkMode}
          />
          
          {settings.quietHoursEnabled && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Start Time
                </span>
                <input
                  type="time"
                  value={settings.quietStartTime}
                  onChange={(e) => handleTimeChange('quietStartTime', e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  End Time
                </span>
                <input
                  type="time"
                  value={settings.quietEndTime}
                  onChange={(e) => handleTimeChange('quietEndTime', e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          )}
        </NotificationSection>
      </div>

      {/* Save Button */}
      <div className="px-4 py-4">
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

const NotificationSection = ({ title, icon: Icon, children, darkMode }) => (
  <div className={`${
    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
  } border rounded-2xl overflow-hidden shadow-sm`}>
    <div className={`px-4 py-3 ${
      darkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
    } border-b flex items-center gap-2`}>
      <Icon className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
      <h3 className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {title}
      </h3>
    </div>
    <div className="p-4 space-y-4">
      {children}
    </div>
  </div>
);

const NotificationOption = ({ title, description, enabled, onToggle, darkMode, disabled = false, icon: Icon }) => (
  <div className={`flex items-center justify-between ${disabled ? "opacity-50" : ""}`}>
    <div className="flex items-center gap-3 flex-1">
      {Icon && (
        <div className={`w-8 h-8 rounded-lg ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        } flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
        </div>
      )}
      <div>
        <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
          {title}
        </h4>
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {description}
        </p>
      </div>
    </div>
    <ToggleSwitch
      enabled={enabled}
      onToggle={onToggle}
      darkMode={darkMode}
      disabled={disabled}
    />
  </div>
);

const ToggleSwitch = ({ enabled, onToggle, darkMode, disabled = false }) => (
  <div
    onClick={disabled ? undefined : onToggle}
    className={`w-12 h-6 rounded-full transition-all duration-300 ${
      enabled && !disabled
        ? "bg-blue-500 shadow-blue-500/50 shadow-lg"
        : darkMode ? "bg-gray-600" : "bg-gray-300"
    } relative ${disabled ? "" : "cursor-pointer hover:scale-105"}`}
  >
    <div
      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow-lg ${
        enabled && !disabled
          ? "translate-x-6 shadow-blue-200/50"
          : "translate-x-0.5"
      }`}
    />
  </div>
)

export default Notifications;