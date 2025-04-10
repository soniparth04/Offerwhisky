import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCommonOffer = () => {
    const navigate = useNavigate();
    const [ownerId, setOwnerId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [validTill, setValidTill] = useState("");

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

        if (!title || !description || !validTill) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.post("https://offerwhisky.onrender.com/api/owner/create-offer", {
                title,
                description,
                validTill,
                ownerId,
                isCommon: true // <== Key part
            }, {
                withCredentials: true
            });

            alert("Common offer added successfully!");
            navigate("/shop-owner-dashboard");
        } catch (error) {
            console.error("Error adding common offer:", error);
            alert("Failed to add common offer");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Common Offer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
