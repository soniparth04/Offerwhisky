import React, { useState } from "react";
import { ArrowLeft, Crown, Store, BarChart3, Users, Megaphone, Shield, CheckCircle, ArrowRight } from "lucide-react";

const BusinessAccount = ({ darkMode, onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState("basic");

  const features = [
    {
      icon: Store,
      title: "Business Dashboard",
      description: "Comprehensive analytics and store management tools"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed insights into customer behavior and sales"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build and manage your customer relationships"
    },
    {
      icon: Megaphone,
      title: "Marketing Tools",
      description: "Create campaigns and promotions to boost sales"
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "24/7 dedicated support for business accounts"
    }
  ];

  const plans = [
    {
      id: "basic",
      name: "Basic Business",
      price: "₹999",
      period: "/month",
      features: [
        "Up to 100 products",
        "Basic analytics",
        "Email support",
        "Standard dashboard"
      ],
      popular: false
    },
    {
      id: "premium",
      name: "Premium Business",
      price: "₹1999",
      period: "/month",
      features: [
        "Unlimited products",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "Marketing tools",
        "API access"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      features: [
        "Everything in Premium",
        "Dedicated account manager",
        "Custom integrations",
        "White-label solution",
        "Advanced security",
        "SLA guarantee"
      ],
      popular: false
    }
  ];

  const handleUpgrade = () => {
    console.log(`Upgrading to ${selectedPlan} plan`);
    // Handle upgrade logic
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
            <Crown className="w-6 h-6 text-yellow-500" />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Business Account
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="p-4">
        <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-6 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold">Unlock Business Power</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Take Your Business to the Next Level
            </h2>
            <p className="text-blue-100 text-sm mb-6">
              Access powerful tools and insights to grow your business faster
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-xs text-blue-200">Active Businesses</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">₹50L+</p>
                <p className="text-xs text-blue-200">Monthly Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-xs text-blue-200">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 mb-6">
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          What You'll Get
        </h3>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
              } border rounded-2xl p-4 hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-2xl ${
                  darkMode ? "bg-blue-500/20" : "bg-blue-50"
                } flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className={`w-6 h-6 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`} />
                </div>
                <div className="flex-1">
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

      {/* Pricing Plans */}
      <div className="px-4 mb-6">
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Choose Your Plan
        </h3>
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
              } border rounded-2xl p-4 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "border-blue-500 bg-blue-50/50"
                  : "hover:border-gray-300"
              } ${plan.popular ? "ring-2 ring-purple-500" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-2 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h4>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 ${
                  selectedPlan === plan.id
                    ? "border-blue-500 bg-blue-500"
                    : darkMode ? "border-gray-600" : "border-gray-300"
                } flex items-center justify-center`}>
                  {selectedPlan === plan.id && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`} />
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Button */}
      <div className="px-4 mt-auto">
        <button
          onClick={handleUpgrade}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
        >
          <Crown className="w-5 h-5" />
          Upgrade to Business
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <p className={`text-center text-xs mt-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          No setup fees • Cancel anytime • 30-day money back guarantee
        </p>
      </div>
    </div>
  );
};

export default BusinessAccount;