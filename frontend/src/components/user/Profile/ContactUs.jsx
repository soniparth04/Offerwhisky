import React, { useState } from "react";
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

const ContactUs = ({ darkMode, onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      subtitle: "Speak with our support team",
      info: "1800-XXX-XXXX (Toll Free)",
      status: "Available 24/7",
      action: () => console.log("Calling support"),
    },
    {
      icon: Mail,
      title: "Email Support",
      subtitle: "Send us a detailed message",
      info: "support@offerwhisky.com",
      status: "Response within 24 hours",
      action: () => console.log("Opening email client"),
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      subtitle: "Chat with our agents",
      info: "Available in app",
      status: "Response in 5 minutes",
      action: () => console.log("Starting live chat"),
    },
  ];

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "booking", label: "Booking & Redemption" },
    { value: "wallet", label: "Wallet & Payments" },
    { value: "kyc", label: "KYC & Verification" },
    { value: "offers", label: "Offers & Boosts" },
    { value: "spinwin", label: "Spin & Win Issues" },
    { value: "technical", label: "Technical Issue" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    console.log("Submitting contact form:", formData);

    setFormData({ name: "", email: "", subject: "", message: "", category: "general" });
    setIsSubmitting(false);
    setToast({ type: "success", message: "Your message has been sent. We'll get back to you soon." });

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      } pb-28`}
    >
      {/* Header */}
      <div
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b px-3 py-3 sm:px-4 sm:py-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBack}
            aria-label="Go back"
            className={`p-2 rounded-xl ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } transition-colors`}
          >
            <ArrowLeft
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <Phone
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h1
              className={`text-lg sm:text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-3 py-4 sm:px-4 space-y-6 max-w-md mx-auto w-full">
        {/* Contact Methods */}
        <section aria-label="Contact methods">
          <h2
            className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Get in Touch
          </h2>
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                onClick={method.action}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && method.action()}
                className={`${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-100 hover:bg-gray-50"
                } border rounded-xl sm:rounded-2xl p-3 sm:p-4 cursor-pointer transition-all hover:scale-[1.01] sm:hover:scale-[1.02] shadow-sm`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${
                      darkMode ? "bg-blue-500/20" : "bg-blue-50"
                    } flex items-center justify-center`}
                  >
                    <method.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-sm sm:text-base truncate ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {method.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm truncate ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {method.subtitle}
                    </p>
                    <p
                      className={`text-xs sm:text-sm font-medium ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {method.info}
                    </p>
                  </div>
                  <div className="hidden sm:block text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span
                        className={`text-xs ${
                          darkMode ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        {method.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section aria-label="Contact form">
          <h2
            className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Send us a Message
          </h2>
          <div
            className={`${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
            } border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm`}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full pl-9 pr-3 py-2 sm:pl-10 sm:pr-4 sm:py-3 rounded-lg sm:rounded-xl border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full pl-9 pr-3 py-2 sm:pl-10 sm:pr-4 sm:py-3 rounded-lg sm:rounded-xl border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  />
                </div>
              </div>

              {/* Category Field */}
              <div>
                <label
                  htmlFor="category"
                  className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Category *
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Brief description"
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare
                    className={`absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Provide details..."
                    rows={4}
                    enterKeyHint="send"
                    className={`w-full pl-9 pr-3 py-2 sm:pl-10 sm:pr-4 sm:py-3 rounded-lg sm:rounded-xl border resize-none ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? darkMode
                      ? "bg-gray-600 text-gray-400"
                      : "bg-gray-300 text-gray-500"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.98]"
                } transition-transform shadow-md sm:shadow-lg text-sm sm:text-base`}
                aria-live="polite"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Office Information */}
        <section aria-label="Office information"
          className={`${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
          } border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm`}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <MapPin
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h3
              className={`font-semibold text-sm sm:text-base ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              OfferWhisky HQ
            </h3>
          </div>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div>
              <p className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Head Office
              </p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                123 Tech Park, Cyber City
                <br /> Ratlam, Madhya Pradesh 457001
                <br /> India
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Clock className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Mon - Fri, 9:00 AM - 6:00 PM (IST)
              </span>
            </div>
          </div>
        </section>

        {/* Response Time Info */}
        <section
          aria-label="Expected response times"
          className={`${
            darkMode
              ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30"
              : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
          } border rounded-xl sm:rounded-2xl p-3 sm:p-4`}
        >
          <h3
            className={`font-semibold mb-2 text-sm sm:text-base ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Response Time
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <p className={`font-medium ${darkMode ? "text-green-400" : "text-green-700"}`}>
                Live Chat
              </p>
              <p className={`${darkMode ? "text-green-300" : "text-green-600"}`}>
                Within 5 minutes
              </p>
            </div>
            <div>
              <p className={`font-medium ${darkMode ? "text-green-400" : "text-green-700"}`}>
                Email Support
              </p>
              <p className={`${darkMode ? "text-green-300" : "text-green-600"}`}>
                Within 24 hours
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-4 inset-x-0 px-4 z-20`}
        >
          <div
            className={`max-w-md mx-auto rounded-xl px-4 py-3 shadow-lg ${
              toast.type === "success"
                ? darkMode
                  ? "bg-emerald-700 text-white"
                  : "bg-emerald-600 text-white"
                : darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-900 text-white"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
