import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Home, Flame, ShoppingBag, User } from "lucide-react";
import { gsap } from "gsap";

const Navbar = () => {
  const [rippleEffect, setRippleEffect] = useState(null);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollThreshold = 2;
  const isAnimating = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
          
          // Only animate if scroll difference is above threshold and not currently animating
          if (scrollDifference > scrollThreshold && !isAnimating.current) {
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
              // Scrolling down - hide navbar
              isAnimating.current = true;
              gsap.to(navRef.current, {
                y: "100%",
                duration: 0.4,
                ease: "power3.out",
                onComplete: () => {
                  isAnimating.current = false;
                }
              });
            } else if (currentScrollY < lastScrollY.current) {
              // Scrolling up - show navbar
              isAnimating.current = true;
              gsap.to(navRef.current, {
                y: "0%",
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: () => {
                  isAnimating.current = false;
                }
              });
            }
            
            lastScrollY.current = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll event listener with better options
    window.addEventListener("scroll", handleScroll, { passive: true, capture: false });

    // Initial setup with smooth entry
    if (navRef.current) {
      gsap.set(navRef.current, { 
        y: "0%",
        force3D: true // Enable hardware acceleration
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            isActive ? 'bg-purple-100' : 'bg-transparent'
          }`} />
          
          {/* Icon */}
          <div className={`p-1 relative z-10 transition-all duration-200 ${
            isActive ? 'text-purple-500 scale-110' : 'text-gray-600'
          }`}>
            <Icon className="w-6 h-6" strokeWidth={1.5} />
            {/* Notification Badge for Bag removed */}
          </div>
          
          {/* Label */}
          <span className={`text-xs font-medium mt-1 relative z-10 transition-all duration-200 ${
            label === 'Store Nearby' ? 'text-center leading-tight' : ''
          } ${
            isActive ? 'text-purple-500' : 'text-gray-600'
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
      
      <nav 
        ref={navRef}
        className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 z-20"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        <div className="flex justify-between items-center max-w-md mx-auto">
          <NavItem 
            to="/home" 
            index={0} 
            icon={Home} 
            label="Home" 
            isEnd={true} 
          />
          <NavItem 
            to="/coming-soon" 
            index={1} 
            icon={Flame} 
            label="Hots"
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