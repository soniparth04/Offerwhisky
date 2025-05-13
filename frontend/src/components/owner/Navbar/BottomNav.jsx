import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, User, Plus } from 'lucide-react';
import QRCodeIcon from '../../../assets/OwnerDash/qrcode-scan.png'; // PNG image

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hidePlusButton = location.pathname === '/shop-owner/create-offers';

  return (
    <div className="fixed bottom-0 w-full mx-auto z-50">
      <nav className="flex items-center justify-between bg-white border-t border-gray-200 px-4 h-16">
        <NavLink
          to="/shop-owner-dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <Home size={25} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        <NavLink
          to="/shop-owner/my-ads"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <LayoutDashboard size={25} />
          <span className="text-xs mt-1">Ads</span>
        </NavLink>

        {!hidePlusButton && (
          <div className="relative -top-5">
            <button
              onClick={() => navigate('/shop-owner/create-offers')}
              className="flex items-center justify-center w-20 h-20 rounded-full bg-[#001CD3] text-white shadow-lg hover:bg-[#226EDA] transition-colors"
            >
              <Plus size={27} />
            </button>
          </div>
        )}

        <NavLink
          to="/shop-owner/scan-qr"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <img src={QRCodeIcon} alt="Scan QR" className="w-6 h-6" />
          <span className="text-xs mt-1">Scan QR</span>
        </NavLink>

        <NavLink
          to="/shop-owner/account"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <User size={25} />
          <span className="text-xs mt-1">Account</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNavigation;
