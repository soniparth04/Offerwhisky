import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, MapPin, ShoppingBag, User } from "lucide-react";

const Navbar = () => {
  const [rippleEffect, setRippleEffect] = useState(null);

  const handleTap = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setRippleEffect({ index, x, y });
    
    // Remove ripple effect after animation
    setTimeout(() => setRippleEffect(null), 500);
  };

  const NavItem = ({ to, index, icon: Icon, label, isEnd = false }) => (
    <NavLink
      to={to}
      end={isEnd}
      className="flex flex-col items-center py-1 px-3 min-w-0 relative overflow-hidden"
      onClick={(e) => handleTap(index, e)}
    >
      {({ isActive }) => (
        <>
          {/* Ripple Effect */}
          {rippleEffect && rippleEffect.index === index && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${rippleEffect.x}px ${rippleEffect.y}px, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.1) 40%, transparent 70%)`,
                animation: 'ripple 0.5s ease-out'
              }}
            />
          )}
          
          {/* Background fade effect for active state */}
          <div className={`absolute inset-0 transition-all duration-200 rounded-lg ${
            isActive ? 'bg-pink-50' : 'bg-transparent'
          }`} />
          
          {/* Icon */}
          <div className={`p-1 relative z-10 transition-all duration-200 ${
            isActive ? 'text-pink-500 scale-110' : 'text-gray-600'
          }`}>
            <Icon className="w-6 h-6" strokeWidth={1.5} />
            {/* Notification Badge for Bag */}
            {index === 2 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                3
              </span>
            )}
          </div>
          
          {/* Label */}
          <span className={`text-xs font-medium mt-1 relative z-10 transition-all duration-200 ${
            label === 'Store Nearby' ? 'text-center leading-tight' : ''
          } ${
            isActive ? 'text-pink-500' : 'text-gray-600'
          }`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );

  return (
    <>
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 z-20">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <NavItem 
            to="/home" 
            index={0} 
            icon={Home} 
            label="Home" 
            isEnd={true} 
          />
          <NavItem 
            to="/All-shops" 
            index={1} 
            icon={MapPin} 
            label="Store Nearby" 
          />
          <NavItem 
            to="/bag" 
            index={2} 
            icon={ShoppingBag} 
            label="Bag" 
          />
          <NavItem 
            to="/youraccount" 
            index={3} 
            icon={User} 
            label="Profile" 
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
