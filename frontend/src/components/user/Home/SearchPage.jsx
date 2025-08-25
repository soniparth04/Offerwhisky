import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Star,
  Heart,
  ShoppingCart,
  Mic,
  ChevronRight,
  Flame,
  Tag,
  TrendingUp,
  Clock,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock product data
const mockProducts = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: "₹2,999",
    originalPrice: "₹4,999",
    discount: "40% OFF",
    rating: 4.5,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
    category: "Electronics",
    brand: "TechBrand",
  },
  {
    id: 2,
    title: "Men's Casual Cotton Shirt",
    price: "₹899",
    originalPrice: "₹1,599",
    discount: "44% OFF",
    rating: 4.2,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop&crop=center",
    category: "Fashion",
    brand: "StyleHub",
  },
  {
    id: 3,
    title: "High-Speed Kitchen Blender",
    price: "₹1,899",
    originalPrice: "₹3,199",
    discount: "41% OFF",
    rating: 4.7,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop&crop=center",
    category: "Home & Kitchen",
    brand: "KitchenPro",
  },
];

const popularSearches = [
  "Headphones",
  "Shirts",
  "Shoes",
  "Phone Cases",
  "Watches",
  "Bags",
  "Sunglasses",
  "Electronics",
  "Fashion",
  "Home Decor",
  "Laptops",
  "Skincare",
  "Books",
  "Gaming",
];

const recentSearches = [
  "Bluetooth earbuds",
  "Summer dress",
  "Running shoes",
  "Coffee maker",
  "Smartphone",
  "Backpack",
  "Wireless mouse",
  "Jacket",
  "Tablet",
];

const trendingBrands = [
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    color: "bg-transparent",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    color: "bg-transparent",
  },
  {
    name: "Samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Samsung_logo_blue.png",
    color: "bg-transparent",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    color: "bg-transparent",
  },
  {
    name: "Sony",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHlZbblmQbin3rXPA2vV7Xd68J9BMKgGUwww&s",
    color: "bg-transparent",
  },
  {
    name: "H&M",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
    color: "bg-transparent",
  },
];

const hotDeals = [
  {
    title: "Mega Discounts",
    subtitle: "Flat 50% OFF on Top Brands",
    icon: "🔥",
    color: "bg-rose-400", // calm warm pink/red
  },
  {
    title: "Cashback Offers",
    subtitle: "Earn Upto ₹500 Cashback",
    icon: "💰",
    color: "bg-sky-400", // fresh light blue
  },
  {
    title: "Exclusive Coupons",
    subtitle: "Extra Savings with Vouchers",
    icon: "🎟️",
    color: "bg-emerald-400", // calm green
  },
  {
    title: "Reward Points",
    subtitle: "Collect & Redeem Instantly",
    icon: "🏆",
    color: "bg-violet-400", // smooth purple
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const categories = [
    "all",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Sports",
    "Accessories",
  ];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBack = () => {
    navigate(-1); // go back to previous page
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value === "");
    if (e.target.value.length > 0) {
      setIsSearching(true);
    }
  };

  const handlePopularSearch = (term) => {
    setSearchQuery(term);
    setShowSuggestions(false);
    setIsSearching(true);
  };

  const removeRecentSearch = (index) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((_, i) => i !== index)
    );
  };

  // Optional: clear all searches
  const clearAllSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-3">
          {/* Search Bar */}
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-200 hover:bg-gray-200 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex-1 relative">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white transition-all duration-200 focus-within:border-[#6678FF] focus-within:shadow-md">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1 outline-none text-sm bg-transparent text-black placeholder-gray-500"
                />
                <button className="text-gray-400 hover:text-gray-500 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {showSuggestions && searchQuery === "" ? (
          <div className="p-4 space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    Recent Searches
                  </h2>
                  <button
                    className="text-sm text-[#6678FF] font-medium"
                    onClick={clearAllSearches}
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                  {recentSearches.map((term, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 border shadow-sm min-w-fit group hover:shadow-md transition-all duration-200"
                    >
                      <button
                        onClick={() => handlePopularSearch(term)}
                        className="flex items-center space-x-2"
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700 whitespace-nowrap">
                          {term}
                        </span>
                      </button>
                      <button
                        onClick={() => removeRecentSearch(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-gray-500" />
                  Popular Searches
                </h2>
              </div>
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearch(term)}
                    className="flex items-center space-x-2 rounded-full px-4 py-2 border border-gray-200 transition-all duration-200 min-w-fit group hover:shadow-md"
                  >
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center transition-colors">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-700">{term}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Brands */}
            {/* <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-red-500" />
                  Trending Brands
                </h2>
                <button className="text-sm text-blue-600 font-medium">
                  View All
                </button>
              </div>
              <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                {trendingBrands.map((brand, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearch(brand.name)}
                    className="flex flex-col items-center space-y-2 min-w-fit group"
                  >
                    <div
                      className={`w-16 h-16 ${brand.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg`}
                    >
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {brand.name}
                    </span>
                  </button>
                ))}
              </div>
            </div> */}

            {/* Hot Deals */}
            {/* <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-green-500" />
                  Hot Deals & Offers
                </h2>
                <button className="text-sm text-blue-600 font-medium">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {hotDeals.map((deal, index) => (
                  <button
                    key={index}
                    className={`${deal.color} rounded-2xl p-4 text-white text-left group hover:shadow-xl transition-all duration-300 hover:scale-105`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">{deal.icon}</span>
                      <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{deal.title}</h3>
                    <p className="text-sm opacity-90">{deal.subtitle}</p>
                  </button>
                ))}
              </div>
            </div> */}

            {/* Categories */}
            {/* <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Shop by Categories
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {categories.slice(1).map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      handlePopularSearch(category);
                    }}
                    className="bg-white rounded-xl p-4 border hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-3 overflow-hidden  mx-auto transition-all duration-200">
                      <img
                        src={
                          category === "Electronics"
                            ? "https://img.icons8.com/color/96/000000/smartphone.png"
                            : category === "Fashion"
                            ? "https://img.icons8.com/color/96/000000/t-shirt.png"
                            : category === "Home & Kitchen"
                            ? "https://img.icons8.com/color/96/000000/kitchen-room.png"
                            : category === "Sports"
                            ? "https://img.icons8.com/color/96/000000/sports.png"
                            : "https://img.icons8.com/color/96/000000/backpack.png"
                        }
                        alt={category}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {category}
                    </span>
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        ) : (
          /* Search Results */
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden"
                >
                  <div className="relative aspect-square">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
                        {product.discount}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2 text-sm mb-2">
                      {product.title}
                    </h3>

                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-200 fill-current"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {product.rating}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && searchQuery.length > 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any products matching "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(true);
                    setIsSearching(false);
                  }}
                  className="text-[#6678FF] hover:text-indigo-600 font-medium"
                >
                  Clear search and try again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
