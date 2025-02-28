import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    label: { type: String, required: true },
    description: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true}, // 🔹 Link coupon to owner
    createdDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true }
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
