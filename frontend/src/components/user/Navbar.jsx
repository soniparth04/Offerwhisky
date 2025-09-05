import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Home, Flame, ShoppingBag, User } from "lucide-react";
import { gsap } from "gsap";

const Navbar = () => {
  const [rippleEffect, setRippleEffect] = useState(null);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollThreshold = 10; // More forgiving threshold for smoother show/hide
  const isAnimating = useRef(false);

  useEffect(() => {
    let ticking = false;

    let lastDirection = null;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
          if (scrollDifference > scrollThreshold && !isAnimating.current) {
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
              // Scrolling down - hide navbar
              if (lastDirection !== 'down') {
                isAnimating.current = true;
                gsap.to(navRef.current, {
                  y: "100%",
                  duration: 0.3,
                  ease: "power3.out",
                  onComplete: () => {
                    isAnimating.current = false;
                  }
                });
                lastDirection = 'down';
              }
            } else if (currentScrollY < lastScrollY.current) {
              // Scrolling up - show navbar
              if (lastDirection !== 'up') {
                isAnimating.current = true;
                gsap.to(navRef.current, {
                  y: "0%",
                  duration: 0.25,
                  ease: "power2.inOut",
                  onComplete: () => {
                    isAnimating.current = false;
                  }
                });
                lastDirection = 'up';
              }
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
      className="flex flex-col items-center py-0.5 px-3 min-w-0 relative overflow-hidden"
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
          {/* Background fade effect for active state - pink */}
          <div className={`absolute inset-0 transition-all duration-200 rounded-lg ${
            isActive ? 'bg-pink-100' : 'bg-transparent'
          }`} />
          {/* Icon - pink when active */}
          <div className={`p-1 relative z-10 transition-all duration-200 ${
            isActive ? 'text-pink-500 scale-110' : 'text-gray-600'
          }`}>
            <Icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          {/* Label - pink when active */}
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
      
      <nav 
        ref={navRef}
        className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-1 z-20"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          minHeight: '48px'
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