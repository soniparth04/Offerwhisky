import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCatalogs = () => {
    const navigate = useNavigate();
    const [ownerId, setOwnerId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [price, setPrice] = useState("");

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

        if (!title || ! description || !imageFile || !price) {
            alert("please fill in all fileds");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("ownerId", ownerId);
        formData.append("image", imageFile);
        formData.append("price", price); formData

        try {
            await axios.post("https://offerwhisky.onrender.com/api/owner/add-catalog", formData, { withCredentials: true, 
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Catalog  added successfully!");
            navigate("/shop-owner-dashboard");
        } catch (error) {
            console.error("Error adding catalog:", error);
            alert("Failed to add catalog");
        }
    }

return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Add Catalog</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block mb-1 font-medium">Catalog Title</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                placeholder="eg. your product "
            />
        </div>
        <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                placeholder="Enter product details..."
                rows="4"
            ></textarea>
        </div>
        <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
                type="Number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                placeholder="eg. your product "
            />
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
            Add Catalog
        </button>
    </form>
</div>
)
}

export default AddCatalogs;
