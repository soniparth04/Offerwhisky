import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, X, Clock, Heart } from "lucide-react";

export default function Wishlist() {
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      brand: "Nike",
      name: "Nike Air Max 270 Sneakers",
      price: "₹7,499",
      originalPrice: "₹11,999",
      discount: "38% off",
      image:
        "https://static.nike.com/a/images/t_default/przhlilttuqiis7no3rr/W+AIR+MAX+270.png",
      hasOffer: "EXTRA ₹500 OFF",
    },
    {
      id: 2,
      brand: "Zara",
      name: "Zara Slim Fit Blazer",
      price: "₹4,299",
      originalPrice: "₹7,999",
      discount: "46% off",
      image:
        "https://static.zara.net/assets/public/c7d3/d251/a1f4457eaebf/d41184da0ad4/09722605800-e1/09722605800-e1.jpg?ts=1730736855095",
      hasOffer: "BUY 1 GET 1",
    },
    {
      id: 3,
      brand: "Fossil",
      name: "Fossil Grant Chronograph Watch",
      price: "₹8,999",
      originalPrice: "₹14,495",
      discount: "38% off",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    },
    {
      id: 4,
      brand: "Levi's",
      name: "Levi’s Blue Slim Fit Jeans",
      price: "₹2,199",
      originalPrice: "₹3,999",
      discount: "45% off",
      image:
        "https://davesnewyork.com/cdn/shop/products/19_H1_04511-3621_Front_209_c6ded6a9-fe2d-4f05-9021-520153303ad7_584x700.jpg?v=1603913668",
    },
    {
      id: 5,
      brand: "Adidas",
      name: "Adidas Black Training T-shirt",
      price: "₹1,199",
      originalPrice: "₹2,499",
      discount: "52% off",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
      hasOffer: "EXTRA 10% OFF",
    },
    {
      id: 6,
      brand: "Arctic Fox",
      name: "Arctic Fox Pureview Transparent Mouse",
      price: "₹699",
      originalPrice: "₹1099",
      discount: "60% off",
      image: "https://m.media-amazon.com/images/I/613dyv2wXdL.jpg",
      hasOffer: "LIMITED TIME DEAL",
    },
  ]);

  const handleBack = () => {
    window.history.back();
  };

  const handleDeleteItem = (itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Header shrink effect
  const headerScale = Math.max(0.8, 1 - scrollY * 0.001);
  const headerHeight = Math.max(80, 120 - scrollY * 0.2);
  const isHeaderCompact = scrollY > 60;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div
        className="sticky top-0 z-50 bg-white border-b border-gray-200 transition-all duration-300"
        style={{
          height: `${headerHeight}px`,
        }}
      >
        <div className="px-4 h-full flex flex-col justify-center">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBack}
                onMouseEnter={() => setIsBackHovered(true)}
                onMouseLeave={() => setIsBackHovered(false)}
                className="group w-8 h-8 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <ArrowLeft
                  className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
                    isBackHovered ? "-translate-x-0.5" : ""
                  }`}
                />
              </button>

              {/* Logo */}
              <div className="w-10 h-10 rounded-lg flex items-center">
                <span className="text-white text-sm font-bold">
                  <img src="./NewLogo.png" alt="Logo" />
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <button className="transition-all duration-200 hover:scale-110">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Title */}
          <div
            className="transition-all duration-300"
            style={{
              transform: `scale(${headerScale})`,
              transformOrigin: "left center",
            }}
          >
            <h1
              className={`font-bold text-black transition-all duration-300 ${
                isHeaderCompact ? "text-xl text-gray-500" : "text-2xl text-gray-500"
              }`}
            >
              WISHLIST
            </h1>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="p-4">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110 group-hover:shadow-md"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Offer Badge */}
                  {item.hasOffer && (
                    <div className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.hasOffer}</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {item.brand}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1 truncate">
                      {item.name}
                    </p>
                  </div>

                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col absolute inset-0">
            <div className="bg-white border-b border-gray-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleBack}
                    onMouseEnter={() => setIsBackHovered(true)}
                    onMouseLeave={() => setIsBackHovered(false)}
                    className="group w-8 h-8 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <ArrowLeft
                      className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
                        isBackHovered ? "-translate-x-0.5" : ""
                      }`}
                    />
                  </button>

                  {/* Logo placeholder */}
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">K</span>
                  </div>
                </div>

                <button className="transition-all duration-200 hover:scale-110">
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Empty Wishlist Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="relative group">
                    <Heart
                      className="w-16 h-16 text-gray-300 stroke-2 transition-all duration-500 group-hover:text-pink-300 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-20 h-20 border-2 border-pink-200 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4 mb-8 max-w-sm">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your wishlist is empty
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  Start adding items you love and they'll appear here
                </p>
              </div>

              <div className="group flex items-center justify-center space-x-2 text-sm text-gray-500 bg-gray-50 rounded-full px-6 py-3 border border-gray-100 transition-all duration-300 hover:bg-gray-100 hover:shadow-md cursor-pointer">
                <Heart className="w-4 h-4 text-red-400 group-hover:fill-red-400 transition-all duration-300" />
                <span>Tap the heart icon on any item to save it</span>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4 opacity-40">
                <div className="w-16 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-sm"></div>
                <div className="w-16 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-sm"></div>
                <div className="w-16 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-sm"></div>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Your saved items will appear like this
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}