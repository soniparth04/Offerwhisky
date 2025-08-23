import React, { useState } from "react";
import { ArrowLeft, FileText, Search, ChevronDown, ChevronUp, HelpCircle, BookOpen, MessageCircle } from "lucide-react";

const FAQs = ({ darkMode, onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const faqCategories = [
    {
      id: "booking",
      title: "Booking & Redemption",
      icon: "🎟️",
      questions: [
        {
          id: 1,
          question: "How do I book an offer?",
          answer: "Browse offers in your feed, tap 'Grab Now', and your coupon will be reserved instantly. You’ll see a booking timer if the offer is time-limited."
        },
        {
          id: 2,
          question: "How do I redeem at the shop?",
          answer: "Go to 'My Bookings', open your coupon, and either let the shop scan the QR code or share the alphanumeric code. Shop staff can also confirm with their PIN."
        },
        {
          id: 3,
          question: "What if the QR code doesn’t scan?",
          answer: "Shops can always use the manual code entry + shop PIN to redeem securely."
        },
        {
          id: 4,
          question: "Can I cancel a booking?",
          answer: "Booked coupons cannot be canceled, but if unused they will automatically expire once the time runs out."
        }
      ]
    },
    {
      id: "spin",
      title: "Spin & Wallet",
      icon: "🎰",
      questions: [
        {
          id: 5,
          question: "What is Spin & Win?",
          answer: "Spin & Win lets you spin daily for rewards like wallet credits or exclusive offers. Each user has a daily spin limit."
        },
        {
          id: 6,
          question: "How are wallet credits used?",
          answer: "Credits from spins or rewards are added to your OfferWhisky wallet and can be applied towards eligible offers."
        },
        {
          id: 7,
          question: "Is Spin & Win fair?",
          answer: "Yes, outcomes are randomly generated within set odds. We also keep audit logs for transparency."
        }
      ]
    },
    {
      id: "account",
      title: "Account & Login",
      icon: "👤",
      questions: [
        {
          id: 8,
          question: "How do I sign up?",
          answer: "You can sign up with your phone number via OTP or continue with Google."
        },
        {
          id: 9,
          question: "I can’t log in. What should I do?",
          answer: "Check your OTP or try Google login. If issues persist, clear cache or reinstall the app."
        },
        {
          id: 10,
          question: "How do I delete my account?",
          answer: "Go to Profile → My Account → Delete Account. Note that this action is permanent."
        }
      ]
    },
    {
      id: "owner",
      title: "Shop Owner Help",
      icon: "🏬",
      questions: [
        {
          id: 11,
          question: "How does KYC verification work?",
          answer: "Upload documents like PAN, Aadhaar, shop proof, GST, or electricity bill. Verification is usually completed within 24 hours."
        },
        {
          id: 12,
          question: "How do I publish an offer?",
          answer: "After verification, go to your dashboard, create an offer draft, and click Publish."
        },
        {
          id: 13,
          question: "What is Boost and how do I use it?",
          answer: "Boost allows you to promote your offer. Set a budget and duration to get more impressions and bookings. Analytics are shown in your dashboard."
        }
      ]
    },
    {
      id: "payments",
      title: "Payments & Ads",
      icon: "💳",
      questions: [
        {
          id: 14,
          question: "What payment methods are accepted for ads?",
          answer: "We support credit/debit cards, UPI, net banking, and wallets like Paytm, PhonePe, Google Pay."
        },
        {
          id: 15,
          question: "How do refunds work for ad campaigns?",
          answer: "Refunds are only issued if a campaign fails to launch due to system errors. Otherwise, budget is consumed as impressions/clicks are delivered."
        },
        {
          id: 16,
          question: "My payment failed. What do I do?",
          answer: "Retry with the same or different method. If issues persist, contact your bank or our support team."
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Issues",
      icon: "⚙️",
      questions: [
        {
          id: 17,
          question: "The app is running slowly.",
          answer: "Ensure you have a good internet connection, close other apps, and check for updates."
        },
        {
          id: 18,
          question: "I’m not receiving notifications.",
          answer: "Check app and device notification settings. Ensure OfferWhisky notifications are allowed."
        },
        {
          id: 19,
          question: "The app crashes frequently.",
          answer: "Update to the latest version, clear cache, or reinstall. Contact support if it continues."
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
    setExpandedQuestion(null);
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
              <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl p-8 text-center`}>
                <BookOpen className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
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
                    className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border rounded-2xl overflow-hidden shadow-sm`}
                  >
                    <button
                      onClick={() => toggleQuestion(`search-${question.id}`)}
                      className={`w-full p-4 text-left flex items-center justify-between ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded ${darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
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
                      <div className={`px-4 pb-4 ${darkMode ? "text-gray-300" : "text-gray-600"} border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                        <p className="pt-4 text-sm leading-relaxed">{question.answer}</p>
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
                  className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border rounded-2xl overflow-hidden shadow-sm`}
                >
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full p-4 flex items-center justify-between ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors`}
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
                        <div key={question.id} className={`border-b last:border-b-0 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className={`w-full p-4 pl-6 text-left flex items-center justify-between ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors`}
                          >
                            <div className="flex items-center gap-3">
                              <HelpCircle className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
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
                            <div className={`px-6 pb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                              <p className="text-sm leading-relaxed">{question.answer}</p>
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
        <div className={`${darkMode ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30" : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"} border rounded-2xl p-4`}>
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Still have questions?
            </h3>
          </div>
          <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <button className={`w-full py-3 px-4 rounded-xl font-medium ${darkMode ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" : "bg-blue-100 text-blue-700 hover:bg-blue-200"} transition-colors`}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
