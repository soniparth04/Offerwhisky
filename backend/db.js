import dotenv from "dotenv";
dotenv.config(); // Load .env variables

import mongoose from "mongoose";

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI,{})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

export default mongoose;
