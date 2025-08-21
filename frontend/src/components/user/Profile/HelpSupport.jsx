import React, { useState } from "react";
import { ArrowLeft, MessageCircleQuestion, Search, Phone, Mail, MessageCircle, BookOpen, HelpCircle, ChevronRight, ExternalLink, Clock } from "lucide-react";

const HelpSupport = ({ darkMode, onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const quickActions = [
    {
      id: "chat",
      title: "Live Chat",
      description: "Chat with our support team",
      icon: MessageCircle,
      status: "Online",
      action: () => console.log("Starting live chat")
    },
    {
      id: "call",
      title: "Call Support",
      description: "Speak directly with an agent",
      icon: Phone,
      status: "24/7 Available",
      action: () => console.log("Initiating call")
    },
    {
      id: "email",
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      status: "Response in 24h",
      action: () => console.log("Opening email")
    }
  ];

  const helpCategories = [
    {
      title: "Account & Profile",
      icon: "👤",
      items: [
        "How to update my profile information",
        "Changing password and security settings",
        "Managing account preferences",
        "Deleting or deactivating account"
      ]
    },
    {
      title: "Orders & Shopping",
      icon: "🛒",
      items: [
        "How to place an order",
        "Tracking my orders",
        "Canceling or modifying orders",
        "Returns and refunds"
      ]
    },
    {
      title: "Payments & Billing",
      icon: "💳",
      items: [
        "Payment methods and security",
        "Understanding charges",
        "Refund processing times",
        "Payment failure troubleshooting"
      ]
    },
    {
      title: "Technical Issues",
      icon: "⚙️",
      items: [
        "App crashes or freezing",
        "Login problems",
        "Notification issues",
        "Performance optimization"
      ]
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I track my order?",
      answer: "You can track your order by going to 'My Orders' in your profile section. Each order will show its current status and expected delivery time. You'll also receive notifications for important updates."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI payments, net banking, and digital wallets like Paytm, PhonePe, and Google Pay. All transactions are secured with industry-standard encryption."
    },
    {
      id: 3,
      question: "How can I cancel my order?",
      answer: "You can cancel your order within 30 minutes of placing it by going to 'My Orders' and clicking the 'Cancel' button. After this window, please contact our support team for assistance."
    },
    {
      id: 4,
      question: "Do you offer refunds?",
      answer: "Yes, we offer refunds for eligible items within 7 days of delivery. The item should be unused and in original packaging. Refunds are processed within 5-7 business days after we receive the returned item."
    },
    {
      id: 5,
      question: "How do I change my delivery address?",
      answer: "You can change your delivery address in the 'My Account' section under 'Saved Addresses'. For orders already placed, contact support within 2 hours of ordering to modify the address."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <MessageCircleQuestion className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Help & Support
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              darkMode 
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Get Instant Help
          </h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <div
                key={action.id}
                onClick={action.action}
                className={`${
                  darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-100 hover:bg-gray-50"
                } border rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-sm`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${
                    darkMode ? "bg-blue-500/20" : "bg-blue-50"
                  } flex items-center justify-center`}>
                    <action.icon className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {action.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {action.description}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className={`text-xs ${darkMode ? "text-green-400" : "text-green-600"}`}>
                        {action.status}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className={`${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                } border rounded-2xl overflow-hidden shadow-sm`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className={`w-full p-4 text-left flex items-center justify-between ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`} />
                    <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    expandedFaq === faq.id ? "rotate-90" : ""
                  } ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                </button>
                {expandedFaq === faq.id && (
                  <div className={`px-4 pb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <p className="pt-4 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredFaqs.length === 0 && (
            <div className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl p-8 text-center`}>
              <BookOpen className={`w-12 h-12 mx-auto mb-4 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`} />
              <p className={`text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                No FAQs found
              </p>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Try a different search term or contact support
              </p>
            </div>
          )}
        </div>

        {/* Help Categories */}
        <div>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {helpCategories.map((category, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-100 hover:bg-gray-50"
                } border rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-sm`}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {category.title}
                </h3>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {category.items.length} articles
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className={`${
          darkMode ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30" : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
        } border rounded-2xl p-4`}>
          <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Still Need Help?
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Support Hours: 24/7
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                support@yourapp.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                1800-XXX-XXXX (Toll Free)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;