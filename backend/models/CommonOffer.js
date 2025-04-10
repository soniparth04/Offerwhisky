const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  validTill: Date,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  isCommon: { type: Boolean, default: false }  // this marks if the offer is for all users
}, { timestamps: true });

module.exports = mongoose.model('CommonOffer', offerSchema);
