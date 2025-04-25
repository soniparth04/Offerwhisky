import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  validTill: Date,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  image: { type: String },
  category: { 
    type: String, 
    enum: ['Food', 'Salon', 'Property', 'Vehicle'], 
    required: true 
  },
}, { timestamps: true });

const CommonOffer = mongoose.model('CommonOffer', offerSchema);
export default CommonOffer;