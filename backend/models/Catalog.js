import mongoose from "mongoose";

const CatalogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  image: [{ type: String }],
  price: { type: String}
}, { timestamps: true });

const Catalog = mongoose.model("Catalog", CatalogSchema);

export default Catalog;