import React, { useState } from "react";
import { ArrowLeft, Languages, MapPin, Globe, CheckCircle, Calendar, Clock, DollarSign } from "lucide-react";

const LanguageRegions = ({ darkMode, onBack }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedRegion, setSelectedRegion] = useState("india");
  const [selectedCurrency, setSelectedCurrency] = useState("inr");
  const [selectedTimeZone, setSelectedTimeZone] = useState("asia_kolkata");
  const [selectedDateFormat, setSelectedDateFormat] = useState("dd_mm_yyyy");

  const languages = [
    { id: "english", name: "English", native: "English", flag: "🇺🇸" },
    { id: "hindi", name: "Hindi", native: "हिंदी", flag: "🇮🇳" },
    { id: "gujarati", name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
    { id: "marathi", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
    { id: "bengali", name: "Bengali", native: "বাংলা", flag: "🇮🇳" },
    { id: "tamil", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
    { id: "spanish", name: "Spanish", native: "Español", flag: "🇪🇸" },
    { id: "french", name: "French", native: "Français", flag: "🇫🇷" },
    { id: "german", name: "German", native: "Deutsch", flag: "🇩🇪" },
    { id: "chinese", name: "Chinese", native: "中文", flag: "🇨🇳" }
  ];

  const regions = [
    { id: "india", name: "India", flag: "🇮🇳" },
    { id: "usa", name: "United States", flag: "🇺🇸" },
    { id: "uk", name: "United Kingdom", flag: "🇬🇧" },
    { id: "canada", name: "Canada", flag: "🇨🇦" },
    { id: "australia", name: "Australia", flag: "🇦🇺" },
    { id: "germany", name: "Germany", flag: "🇩🇪" },
    { id: "france", name: "France", flag: "🇫🇷" },
    { id: "japan", name: "Japan", flag: "🇯🇵" }
  ];

  const currencies = [
    { id: "inr", name: "Indian Rupee", symbol: "₹", code: "INR" },
    { id: "usd", name: "US Dollar", symbol: "$", code: "USD" },
    { id: "eur", name: "Euro", symbol: "€", code: "EUR" },
    { id: "gbp", name: "British Pound", symbol: "£", code: "GBP" },
    { id: "jpy", name: "Japanese Yen", symbol: "¥", code: "JPY" },
    { id: "cad", name: "Canadian Dollar", symbol: "C$", code: "CAD" }
  ];

  const timeZones = [
    { id: "asia_kolkata", name: "Asia/Kolkata (IST)", offset: "+05:30" },
    { id: "america_new_york", name: "America/New_York (EST)", offset: "-05:00" },
    { id: "europe_london", name: "Europe/London (GMT)", offset: "+00:00" },
    { id: "asia_tokyo", name: "Asia/Tokyo (JST)", offset: "+09:00" },
    { id: "australia_sydney", name: "Australia/Sydney (AEST)", offset: "+11:00" },
    { id: "europe_paris", name: "Europe/Paris (CET)", offset: "+01:00" }
  ];

  const dateFormats = [
    { id: "dd_mm_yyyy", format: "DD/MM/YYYY", example: "15/01/2024" },
    { id: "mm_dd_yyyy", format: "MM/DD/YYYY", example: "01/15/2024" },
    { id: "yyyy_mm_dd", format: "YYYY-MM-DD", example: "2024-01-15" },
    { id: "dd_mon_yyyy", format: "DD Mon YYYY", example: "15 Jan 2024" },
    { id: "mon_dd_yyyy", format: "Mon DD, YYYY", example: "Jan 15, 2024" }
  ];

  const handleSave = () => {
    const settings = {
      language: selectedLanguage,
      region: selectedRegion,
      currency: selectedCurrency,
      timeZone: selectedTimeZone,
      dateFormat: selectedDateFormat
    };
    console.log("Saving language and region settings:", settings);
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
            <Languages className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Language & Regions
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-6">
        
        {/* Language Selection */}
        <SettingsSection
          title="Language"
          icon={Languages}
          darkMode={darkMode}
        >
          <div className="space-y-2">
            {languages.map((lang) => (
              <SettingsOption
                key={lang.id}
                selected={selectedLanguage === lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                darkMode={darkMode}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {lang.name}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {lang.native}
                    </p>
                  </div>
                </div>
              </SettingsOption>
            ))}
          </div>
        </SettingsSection>

        {/* Region Selection */}
        <SettingsSection
          title="Region"
          icon={MapPin}
          darkMode={darkMode}
        >
          <div className="space-y-2">
            {regions.map((region) => (
              <SettingsOption
                key={region.id}
                selected={selectedRegion === region.id}
                onClick={() => setSelectedRegion(region.id)}
                darkMode={darkMode}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{region.flag}</span>
                  <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {region.name}
                  </p>
                </div>
              </SettingsOption>
            ))}
          </div>
        </SettingsSection>

        {/* Currency Selection */}
        <SettingsSection
          title="Currency"
          icon={DollarSign}
          darkMode={darkMode}
        >
          <div className="space-y-2">
            {currencies.map((currency) => (
              <SettingsOption
                key={currency.id}
                selected={selectedCurrency === currency.id}
                onClick={() => setSelectedCurrency(currency.id)}
                darkMode={darkMode}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${
                    darkMode ? "bg-green-500/20" : "bg-green-50"
                  } flex items-center justify-center`}>
                    <span className={`font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}>
                      {currency.symbol}
                    </span>
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {currency.name}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {currency.code}
                    </p>
                  </div>
                </div>
              </SettingsOption>
            ))}
          </div>
        </SettingsSection>

        {/* Time Zone Selection */}
        <SettingsSection
          title="Time Zone"
          icon={Clock}
          darkMode={darkMode}
        >
          <div className="space-y-2">
            {timeZones.map((tz) => (
              <SettingsOption
                key={tz.id}
                selected={selectedTimeZone === tz.id}
                onClick={() => setSelectedTimeZone(tz.id)}
                darkMode={darkMode}
              >
                <div className="flex items-center justify-between">
                  <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {tz.name}
                  </p>
                  <span className={`text-sm px-2 py-1 rounded ${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                  }`}>
                    {tz.offset}
                  </span>
                </div>
              </SettingsOption>
            ))}
          </div>
        </SettingsSection>

        {/* Date Format Selection */}
        <SettingsSection
          title="Date Format"
          icon={Calendar}
          darkMode={darkMode}
        >
          <div className="space-y-2">
            {dateFormats.map((format) => (
              <SettingsOption
                key={format.id}
                selected={selectedDateFormat === format.id}
                onClick={() => setSelectedDateFormat(format.id)}
                darkMode={darkMode}
              >
                <div className="flex items-center justify-between">
                  <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {format.format}
                  </p>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {format.example}
                  </span>
                </div>
              </SettingsOption>
            ))}
          </div>
        </SettingsSection>
      </div>

      {/* Save Button */}
      <div className="px-4 py-4">
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

const SettingsSection = ({ title, icon: Icon, children, darkMode }) => (
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
    <div className="p-4">
      {children}
    </div>
  </div>
);

const SettingsOption = ({ selected, onClick, children, darkMode }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
      selected
        ? darkMode ? "bg-blue-500/20 border-blue-500/50" : "bg-blue-50 border-blue-200"
        : darkMode ? "hover:bg-gray-700 border-transparent" : "hover:bg-gray-50 border-transparent"
    } border`}
  >
    <div className="flex-1">
      {children}
    </div>
    {selected && (
      <CheckCircle className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
    )}
  </div>
);

export default LanguageRegions;