import mongoose from "mongoose";

const VideoAdSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: { type: String, required: true }, 
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  budget: { type: Number, required: true },
  estimatedReach: { type: Number }, // Can be calculated from budget
  createdAt: { type: Date, default: Date.now }
});

const VideoAd = mongoose.model("VideoAd", VideoAdSchema);
export default VideoAd;
