import React, { useState } from "react";
import { ArrowLeft, FileText, Search, ChevronDown, ChevronUp, HelpCircle, BookOpen, MessageCircle } from "lucide-react";

const FAQs = ({ darkMode, onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      icon: "❓",
      questions: [
        {
          id: 1,
          question: "What is this app about?",
          answer: "This app is a comprehensive platform that connects you with local stores and businesses, allowing you to discover products, compare prices, and make purchases conveniently from your mobile device."
        },
        {
          id: 2,
          question: "Is the app free to use?",
          answer: "Yes, the basic features of the app are completely free. We offer premium business accounts with additional features for store owners and businesses."
        },
        {
          id: 3,
          question: "How do I create an account?",
          answer: "You can create an account by downloading the app and clicking 'Sign Up'. You can register using your email address, phone number, or social media accounts like Google or Facebook."
        }
      ]
    },
    {
      id: "shopping",
      title: "Shopping & Orders",
      icon: "🛒",
      questions: [
        {
          id: 4,
          question: "How do I place an order?",
          answer: "Browse products, add items to your bag, proceed to checkout, select payment method, confirm delivery address, and place your order. You'll receive an order confirmation via email and app notification."
        },
        {
          id: 5,
          question: "Can I modify or cancel my order?",
          answer: "You can cancel your order within 30 minutes of placing it. For modifications, contact our support team immediately after placing the order. Once the order is processed, changes may not be possible."
        },
        {
          id: 6,
          question: "What are the delivery charges?",
          answer: "Delivery charges vary by location and order value. Orders above ₹500 usually qualify for free delivery. Exact charges are displayed at checkout before payment."
        },
        {
          id: 7,
          question: "How long does delivery take?",
          answer: "Standard delivery takes 2-5 business days. Express delivery (1-2 days) is available for select areas at additional cost. Same-day delivery may be available for certain products and locations."
        }
      ]
    },
    {
      id: "payments",
      title: "Payments & Refunds",
      icon: "💳",
      questions: [
        {
          id: 8,
          question: "What payment methods are accepted?",
          answer: "We accept credit/debit cards, UPI payments, net banking, digital wallets (Paytm, PhonePe, Google Pay), and cash on delivery for eligible orders."
        },
        {
          id: 9,
          question: "Is my payment information secure?",
          answer: "Yes, all payment information is encrypted using industry-standard SSL technology. We don't store your complete card details on our servers."
        },
        {
          id: 10,
          question: "How do refunds work?",
          answer: "Refunds are processed within 5-7 business days after we receive the returned item. The amount is credited back to your original payment method."
        },
        {
          id: 11,
          question: "What if my payment fails?",
          answer: "If payment fails, you can retry with the same or different payment method. If issues persist, try clearing app cache, checking internet connection, or contact your bank."
        }
      ]
    },
    {
      id: "account",
      title: "Account & Profile",
      icon: "👤",
      questions: [
        {
          id: 12,
          question: "How do I update my profile information?",
          answer: "Go to Profile → My Account → Edit Profile. You can update your name, email, phone number, and address. Some changes may require verification."
        },
        {
          id: 13,
          question: "How do I change my password?",
          answer: "Go to Profile → My Account → Security Settings → Change Password. You'll need to enter your current password and choose a new one."
        },
        {
          id: 14,
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account from Profile → My Account → Delete Account. Note that this action is irreversible and all data will be permanently removed."
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Issues",
      icon: "⚙️",
      questions: [
        {
          id: 15,
          question: "The app is running slowly. What should I do?",
          answer: "Try closing other apps, restart the app, clear app cache, ensure you have enough storage space, and check your internet connection. Update to the latest app version if available."
        },
        {
          id: 16,
          question: "I'm not receiving notifications. How to fix this?",
          answer: "Check notification settings in the app and your device settings. Ensure notifications are enabled for the app. Try logging out and back in, or reinstalling the app."
        },
        {
          id: 17,
          question: "The app crashes frequently. What should I do?",
          answer: "Update to the latest app version, restart your device, clear app cache and data. If the issue persists, uninstall and reinstall the app, or contact support with your device details."
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, categoryTitle: category.title }))
  );

  const filteredQuestions = searchQuery 
    ? allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedQuestion(null); // Close any open question when switching categories
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
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
            <FileText className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              FAQs
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
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              darkMode 
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Search Results ({filteredQuestions.length})
            </h2>
            {filteredQuestions.length === 0 ? (
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
                  Try different keywords or browse categories below
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredQuestions.map((question) => (
                  <div
                    key={`search-${question.id}`}
                    className={`${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                    } border rounded-2xl overflow-hidden shadow-sm`}
                  >
                    <button
                      onClick={() => toggleQuestion(`search-${question.id}`)}
                      className={`w-full p-4 text-left flex items-center justify-between ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      } transition-colors`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"
                          }`}>
                            {question.categoryTitle}
                          </span>
                        </div>
                        <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {question.question}
                        </span>
                      </div>
                      {expandedQuestion === `search-${question.id}` ? (
                        <ChevronUp className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                      ) : (
                        <ChevronDown className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                      )}
                    </button>
                    {expandedQuestion === `search-${question.id}` && (
                      <div className={`px-4 pb-4 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      } border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                        <p className="pt-4 text-sm leading-relaxed">
                          {question.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        {!searchQuery && (
          <div>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Browse by Category
            </h2>
            <div className="space-y-3">
              {faqCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                  } border rounded-2xl overflow-hidden shadow-sm`}
                >
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full p-4 flex items-center justify-between ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div className="text-left">
                        <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {category.title}
                        </h3>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {category.questions.length} questions
                        </p>
                      </div>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                    )}
                  </button>

                  {expandedCategory === category.id && (
                    <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                      {category.questions.map((question) => (
                        <div key={question.id} className={`border-b last:border-b-0 ${
                          darkMode ? "border-gray-700" : "border-gray-100"
                        }`}>
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className={`w-full p-4 pl-6 text-left flex items-center justify-between ${
                              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                            } transition-colors`}
                          >
                            <div className="flex items-center gap-3">
                              <HelpCircle className={`w-4 h-4 ${
                                darkMode ? "text-blue-400" : "text-blue-600"
                              }`} />
                              <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                {question.question}
                              </span>
                            </div>
                            {expandedQuestion === question.id ? (
                              <ChevronUp className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                            ) : (
                              <ChevronDown className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                            )}
                          </button>
                          {expandedQuestion === question.id && (
                            <div className={`px-6 pb-4 ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}>
                              <p className="text-sm leading-relaxed">
                                {question.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Still need help section */}
        <div className={`${
          darkMode ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30" : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
        } border rounded-2xl p-4`}>
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Still have questions?
            </h3>
          </div>
          <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <button className={`w-full py-3 px-4 rounded-xl font-medium ${
            darkMode ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          } transition-colors`}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;