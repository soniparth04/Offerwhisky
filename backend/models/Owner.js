import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    shopName: { type: String, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String }, 
    shopImage: { type: String },
    profileImage: { type: String },
}, { timestamps: true });

const Owner = mongoose.model('Owner', OwnerSchema);
export default Owner;
