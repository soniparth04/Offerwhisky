import mongoose from "mongoose";

const ImageadSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  budget: { type: Number, required: true },
  estimatedReach: { type: Number }, // Can be calculated from budget
  createdAt: { type: Date, default: Date.now }
});

const ImageAd = mongoose.model("ImageAd", ImageadSchema);
export default ImageAd;
