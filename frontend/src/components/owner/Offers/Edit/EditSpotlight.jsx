import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditSpotlight = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    StartDate: "",
    EndDate: "",
    MinimumPurchase: "",
    NuRedemption: "",
    image: "",
    boosted: false,
    boostAmount: "",
    boostReach: "",
    status: "inactive",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`https://offerwhisky.onrender.com/api/spotlight/get/${offerId}`);
        const offer = response.data;

        setFormData({
          title: offer.title || "",
          description: offer.description || "",
          category: offer.category || "",
          StartDate: offer.StartDate?.split("T")[0] || "",
          EndDate: offer.EndDate?.split("T")[0] || "",
          MinimumPurchase: offer.MinimumPurchase || "",
          NuRedemption: offer.NuRedemption || "",
          image: offer.image || "",
          boosted: offer.boosted || false,
          boostAmount: offer.boostAmount || "",
          boostReach: offer.boostReach || "",
          status: offer.status || "inactive",
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch offer:", err);
      }
    };

    fetchOffer();
  }, [offerId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://offerwhisky.onrender.com/api/spotlight/edit/${offerId}`, formData, {
        withCredentials: true,
      });
      alert("Offer updated successfully");
      navigate("/shop-owner/view-spotlight");
    } catch (err) {
      console.error("Error updating offer:", err);
      alert("Failed to update offer");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Spotlight Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="title" type="text" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border px-4 py-2 rounded" required />
        
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border px-4 py-2 rounded" rows="3" />

        <select name="category" value={formData.category} onChange={handleChange} className="w-full border px-4 py-2 rounded" required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Salon">Salon</option>
          <option value="Property">Property</option>
          <option value="Vehicle">Vehicle</option>
        </select>

        <input name="StartDate" type="date" value={formData.StartDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />

        <input name="EndDate" type="date" value={formData.EndDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />

        <input name="MinimumPurchase" type="number" value={formData.MinimumPurchase} onChange={handleChange} placeholder="Minimum Purchase Amount" className="w-full border px-4 py-2 rounded" />

        <input name="NuRedemption" type="number" value={formData.NuRedemption} onChange={handleChange} placeholder="Number of Redemptions" className="w-full border px-4 py-2 rounded" />

        <input name="image" type="text" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full border px-4 py-2 rounded" />
       

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Update Offer
        </button>
      </form>
    </div>
  );
};

export default EditSpotlight;
