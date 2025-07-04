import express from 'express';
import CommonOffer from '../../models/CommonOffer.js';

const router = express.Router();

router.get('/common-offers/:ownerId',  async (req, res) => {
    try {
        const offers = await CommonOffer.find({ ownerId: req.params.ownerId });
        res.status(200).json(offers);
    } catch (err) {
        console.error("Error fetching common offers:", err);
        res.status(500).json({ error: "Failed to fetch  offers" });
    }
});

router.patch('/toggle-offer-status/:id', async (req, res) => {
  try {
    const offer = await CommonOffer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    offer.status = offer.status === 'active' ? 'inactive' : 'active';
    await offer.save();

    res.json({ message: 'Status updated', status: offer.status });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;