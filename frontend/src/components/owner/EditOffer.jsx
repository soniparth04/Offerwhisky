import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditOffer = () => {
    const { id } = useParams(); // Get offer ID from URL
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await axios.get(`https://offerwhisky.onrender.com/api/edit-offer/${id}`);
                setLabel(response.data.label);
                setDescription(response.data.description);
                setExpiryDate(response.data.expiryDate.split("T")[0]); // Format date for input
            } catch (err) {
                setError("Failed to fetch offer details");
                console.error("Error fetching offer:", err);
            }
        };
        fetchOffer();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.put(`http://localhost:5000/api/update-offer/${id}`, {
                label,
                description,
                expiryDate,
            });

            if (response.status === 200) {
                alert("Offer updated successfully!");
                navigate("/view-offers"); // Redirect to view offers page
            }
        } catch (err) {
            setError("Failed to update offer. Please try again.");
            console.error("Error updating offer:", err);
        }
    };

    return (
        <div className="container mx-auto mt-10 p-5">
            <h1 className="text-2xl font-bold mb-4">Edit Offer</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Offer Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Expiry Date</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update Offer
                    </button>
                    <Link to="/view-offers" className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditOffer;
