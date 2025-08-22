import React, { useState } from "react";
import { ArrowLeft, Search, Filter, Grid, List, Star, Heart, ShoppingCart, Mic } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
    category: "Electronics",
    brand: "TechBrand"
  },
  {
    id: 2,
    title: "Men's Casual Cotton Shirt",
    price: "₹899",
    originalPrice: "₹1,599",
    discount: "44% OFF",
    rating: 4.2,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop&crop=center",
    category: "Fashion",
    brand: "StyleHub"
  },
  {
    id: 3,
    title: "High-Speed Kitchen Blender",
    price: "₹1,899",
    originalPrice: "₹3,199",
    discount: "41% OFF",
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop&crop=center",
    category: "Home & Kitchen",
    brand: "KitchenPro"
  },
  {
    id: 4,
    title: "Professional Running Shoes",
    price: "₹2,199",
    originalPrice: "₹3,999",
    discount: "45% OFF",
    rating: 4.4,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center",
    category: "Sports",
    brand: "SportMax"
  },
  {
    id: 5,
    title: "Premium Smartphone Case",
    price: "₹599",
    originalPrice: "₹1,199",
    discount: "50% OFF",
    rating: 4.0,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop&crop=center",
    category: "Accessories",
    brand: "ProCase"
  },
  {
    id: 6,
    title: "Automatic Coffee Maker",
    price: "₹3,499",
    originalPrice: "₹5,999",
    discount: "42% OFF",
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop&crop=center",
    category: "Home & Kitchen",
    brand: "BrewMaster"
  },
  {
    id: 7,
    title: "Wireless Gaming Mouse",
    price: "₹1,599",
    originalPrice: "₹2,499",
    discount: "36% OFF",
    rating: 4.3,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center",
    category: "Electronics",
    brand: "GameTech"
  },
  {
    id: 8,
    title: "Women's Denim Jacket",
    price: "₹1,299",
    originalPrice: "₹2,199",
    discount: "41% OFF",
    rating: 4.1,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=300&fit=crop&crop=center",
    category: "Fashion",
    brand: "TrendyWear"
  }
];

const popularSearches = [
  "Headphones", "Shirts", "Shoes", "Phone Cases", "Watches", 
  "Bags", "Sunglasses", "Electronics", "Fashion", "Home Decor"
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const categories = ["all", "Electronics", "Fashion", "Home & Kitchen", "Sports", "Accessories"];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBack = () => {
    // In React Router, you would use navigate(-1) or navigate("/")
    window.history.back();
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

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all duration-200">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1 outline-none text-sm bg-transparent text-black placeholder-gray-500"
                  autoFocus
                />
                <button className="text-gray-400 hover:text-purple-600 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Categories - Only show when searching */}
          {(isSearching || !showSuggestions) && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Filters and View Toggle - Only show when searching */}
        {(isSearching || !showSuggestions) && (
          <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors shadow-sm">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <span className="text-sm text-gray-500">
                {filteredProducts.length} results found
              </span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {showSuggestions && searchQuery === "" ? (
          /* Popular Searches */
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h2>
            <div className="grid grid-cols-2 gap-3">
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(term)}
                  className="flex items-center space-x-3 p-4 bg-white rounded-xl border hover:border-purple-200 hover:bg-purple-50 transition-all duration-200 text-left group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Search className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-900">{term}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Products Grid/List */
          <div>
            <div className={`grid gap-4 ${
              viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 group cursor-pointer ${
                    viewMode === "list" ? "flex space-x-4 p-4" : "overflow-hidden"
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-24 h-24 flex-shrink-0" : "aspect-square"}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
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
                  
                  <div className={`${viewMode === "list" ? "flex-1" : "p-4"}`}>
                    <div className="mb-2">
                      <h3 className={`font-medium text-gray-900 line-clamp-2 ${
                        viewMode === "list" ? "text-base" : "text-sm"
                      }`}>
                        {product.title}
                      </h3>
                    </div>
                    
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
                      <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{product.brand}</span>
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-1 shadow-md hover:shadow-lg">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && searchQuery.length > 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">We couldn't find any products matching "{searchQuery}"</p>
                <button 
                  onClick={() => {setSearchQuery(""); setShowSuggestions(true); setIsSearching(false);}}
                  className="text-purple-600 hover:text-purple-700 font-medium"
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