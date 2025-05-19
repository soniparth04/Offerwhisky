import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TimePicker12Hour = ({ value, onChange }) => {
  const parseTime = (timeStr) => {
    if (!timeStr) return { hour: "12", minute: "00", meridian: "AM" };
    const [time, meridian] = timeStr.split(" ");
    const [hour, minute] = time.split(":");
    return { hour, minute, meridian };
  };

  const { hour, minute, meridian } = parseTime(value);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleHourChange = (e) => {
    onChange(`${e.target.value}:${minute} ${meridian}`);
  };  

  const handleMinuteChange = (e) => {
    onChange(`${hour}:${e.target.value} ${meridian}`);
  };

  const handleMeridianChange = (e) => {
    onChange(`${hour}:${minute} ${e.target.value}`);
  };

  return (
    <div className="flex space-x-2">
      <select value={hour} onChange={handleHourChange} className="border px-2 py-1 rounded">
        {hours.map((h) => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>
      <span>:</span>
      <select value={minute} onChange={handleMinuteChange} className="border px-2 py-1 rounded">
        {minutes.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <select value={meridian} onChange={handleMeridianChange} className="border px-2 py-1 rounded">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

const CreateHappyOffer = () => {
  const navigate = useNavigate();
  const [ownerId, setOwnerId] = useState("");
  const [offerTitle, setOfferTitle] = useState("");
  const [description, setDescription] = useState(""); // New field
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState("12:00 AM");
  const [endTime, setEndTime] = useState("12:00 AM");
  const [Date, setDate] = useState("");
  const [offerImage, setOfferImage] = useState(null);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const response = await axios.get("https://offerwhisky.onrender.com/api/owner/owner-info", {
          withCredentials: true,
        });
        setOwnerId(response.data._id);
      } catch (error) {
        console.error("Error fetching owner info:", error);
        navigate("/shop-owner-login");
      }
    };
    fetchOwnerInfo();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !offerTitle ||
      !description ||
      !category ||
      !startTime ||
      !endTime ||
      !Date ||
      !offerImage
    ) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("offerTitle", offerTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("Date", Date);
    formData.append("offerImage", offerImage);
    formData.append("ownerId", ownerId);

    try {
      await axios.post("https://offerwhisky.onrender.com/api/owner/create-happy-hours", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Happy Hours Offer added successfully!");
      navigate("/shop-owner-dashboard");
    } catch (error) {
      console.error("Error adding offer:", error);
      alert("Failed to add offer");
    }
  };

  return (
    <div className="p-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-4 mb-20">
        <div>
          <label className="block mb-1 font-medium">Offer Title</label>
          <input
            type="text"
            value={offerTitle}
            onChange={(e) => setOfferTitle(e.target.value)}
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
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <TimePicker12Hour value={startTime} onChange={setStartTime} />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <TimePicker12Hour value={endTime} onChange={setEndTime} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
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
            onChange={(e) => setOfferImage(e.target.files[0])}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Add Happy Hours Offer
        </button>
      </form>
    </div>
  );
};

export default CreateHappyOffer;
