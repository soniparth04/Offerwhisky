import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../Navbar/BottomNav';

const SponsoredAds = () => {
    const navigate = useNavigate();
    const ownerId = sessionStorage.getItem("ownerId");

    return (
        <div>
             <div >
            <div className="flex items-center mb-6 p-4">
                <button onClick={() => navigate(-1)} className="mr-2">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Active Sponsored Ads</h1>
                <div className="ml-auto">
                </div>
            </div>
            <div className="text-center p-4 text-gray-500">No Active Sponsored Ads found</div>
            <BottomNavigation/>
        </div>
          <div className="fixed bottom-24 right-6 z-10">
                <button
                     onClick={() => navigate(`/shop-owner/Select-ads?ownerId=${ownerId}`)}
                    className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
                    aria-label="Create a new ad"
                >
                    <Plus size={28} className="text-white" />
                </button>
            </div>
        </div>
    )
}

export default SponsoredAds;