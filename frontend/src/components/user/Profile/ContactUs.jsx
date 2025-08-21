import React, { useState } from "react";
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Clock, Send, User, MessageSquare } from "lucide-react";

const ContactUs = ({ darkMode, onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      subtitle: "Speak with our support team",
      info: "1800-XXX-XXXX (Toll Free)",
      status: "Available 24/7",
      action: () => console.log("Calling support")
    },
    {
      icon: Mail,
      title: "Email Support",
      subtitle: "Send us a detailed message",
      info: "support@yourapp.com",
      status: "Response within 24 hours",
      action: () => console.log("Opening email client")
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      subtitle: "Chat with our agents",
      info: "Available in app",
      status: "Response in 5 minutes",
      action: () => console.log("Starting live chat")
    }
  ];

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Issue" },
    { value: "billing", label: "Billing & Payments" },
    { value: "orders", label: "Orders & Delivery" },
    { value: "account", label: "Account Issues" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "business", label: "Business Partnership" },
    { value: "other", label: "Other" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Submitting contact form:", formData);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general"
    });
    
    setIsSubmitting(false);
    
    // Show success message (you can replace this with proper notification)
    alert("Your message has been sent successfully! We'll get back to you soon.");
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
            <Phone className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-6">
        
        {/* Contact Methods */}
        <div>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Get in Touch
          </h2>
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                onClick={method.action}
                className={`${
                  darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-100 hover:bg-gray-50"
                } border rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-sm`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${
                    darkMode ? "bg-blue-500/20" : "bg-blue-50"
                  } flex items-center justify-center`}>
                    <method.icon className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {method.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {method.subtitle}
                    </p>
                    <p className={`text-sm font-medium ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}>
                      {method.info}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className={`text-xs ${darkMode ? "text-green-400" : "text-green-600"}`}>
                        {method.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Send us a Message
          </h2>
          <div className={`${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
          } border rounded-2xl p-6 shadow-sm`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Full Name *
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      darkMode 
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      darkMode 
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              {/* Category Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Brief description of your inquiry"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare className={`absolute left-3 top-3 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please provide detailed information about your inquiry..."
                    rows={5}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border resize-none ${
                      darkMode 
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? darkMode ? "bg-gray-600 text-gray-400" : "bg-gray-300 text-gray-500"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98]"
                } transition-transform shadow-lg`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Office Information */}
        <div className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Our Office
            </h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Head Office
              </p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                123 Tech Park, Cyber City<br />
                Ratlam, Madhya Pradesh 457001<br />
                India
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Business Hours: Mon - Fri, 9:00 AM - 6:00 PM (IST)
              </span>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className={`${
          darkMode ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30" : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
        } border rounded-2xl p-4`}>
          <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Response Time
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
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
        </div>
      </div>
    </div>
  );
};

export default ContactUs;