import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true }, // 🔹 Link user to owner
    claimedOffers: [
        {
            label: String,
            description: String,
            claimedAt: { type: Date, default: Date.now },
            expiry: { type: Date, expires: 0 },
        },
    ],
},
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
