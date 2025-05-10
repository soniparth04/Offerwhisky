import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCommonOffer = () => {
    const navigate = useNavigate();
    const [ownerId, setOwnerId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [validTill, setValidTill] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [category, setCategory] = useState(""); 

    useEffect(() => {
        const fetchOwnerInfo = async () => {
            try {
                const response = await axios.get("https://offerwhisky.onrender.com/api/owner/owner-info", {
                    withCredentials: true,
                });
                setOwnerId(response.data.ownerId);
            } catch (error) {
                console.error("Error fetching owner info:", error);
                navigate("/shop-owner-login");
            }
        };
        fetchOwnerInfo();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !validTill || !imageFile || !category) {
            alert("Please fill in all fields including category and image");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("validTill", validTill);
        formData.append("ownerId", ownerId);
        formData.append("image", imageFile);
        formData.append("category", category); formData

        try {
            await axios.post("https://offerwhisky.onrender.com/api/owner/create-offer", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Common offer added successfully!");
            navigate("/shop-owner-dashboard");
        } catch (error) {
            console.error("Error adding common offer:", error);
            alert("Failed to add common offer");
        }
    };

    return (
        <div className="p-6 bg-white ">
            <form onSubmit={handleSubmit} className="space-y-4 mb-20">
                <div>
                    <label className="block mb-1 font-medium">Offer Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                        placeholder="e.g. 10% OFF on all services"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                        placeholder="Enter offer details..."
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Valid Till</label>
                    <input
                        type="date"
                        value={validTill}
                        onChange={(e) => setValidTill(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    >
                        <option value="">Select category</option>
                        <option value="Food">Food</option>
                        <option value="Salon">Salon</option>
                        <option value="Property">Property</option>
                        <option value="Vehicle">Vehicle</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full"
                >
                    Add Common Offer
                </button>
            </form>
        </div>
    );
};

export default AddCommonOffer;
