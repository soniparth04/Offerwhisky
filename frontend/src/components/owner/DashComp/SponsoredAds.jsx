import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import BottomNavigation from '../Navbar/BottomNav';
import axios from 'axios';

const SponsoredAds = () => {
  const navigate = useNavigate();
  const ownerId = sessionStorage.getItem("ownerId");
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('https://offerwhisky.onrender.com/api/ad/get-image-ads');
        const filteredAds = res.data.filter(ad => ad.ownerId === ownerId);
        setAds(filteredAds);
      } catch (err) {
        console.error('Error fetching image ads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [ownerId]);

  return (
    <div>
      <div>
        <div className="flex items-center mb-6 p-4">
          <button onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Active Sponsored Ads</h1>
        </div>

        {loading ? (
          <div className="text-center p-4 text-gray-500">Loading ads...</div>
        ) : ads.length === 0 ? (
          <div className="text-center p-4 text-gray-500">No Active Sponsored Ads found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 pb-24">
            {ads.map(ad => (
              <div key={ad._id} className="border rounded-lg p-3 shadow hover:shadow-md transition">
                <h1 className="text-lg font-semibold">Image Ads</h1>
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-40 object-cover rounded-md mb-2" />
                <h3 className="text-lg font-semibold">{ad.title}</h3>
                <p className="text-sm text-gray-600">{ad.description}</p>
                <div className="text-sm mt-2">Budget: ₹{ad.budget}</div>
                <div className="text-sm text-blue-600">Reach: {ad.estimatedReach} users</div>
              </div>
            ))}
          </div>
        )}

        <BottomNavigation />
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
  );
};

export default SponsoredAds;
