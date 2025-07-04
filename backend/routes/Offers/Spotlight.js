import express from 'express';
import CommonOffer from '../../models/CommonOffer.js';
import { upload } from '../../utils/cloudinary.js';

const router = express.Router();

router.post('/create-offer', upload.single('image'), async (req, res) => {
    const { title, description, StartDate, EndDate, MinimumPurchase, NuRedemption, ownerId, category } = req.body;

    try {
        const imagePath = req.file ? req.file.path : null;

        const newOffer = new CommonOffer({
            title,
            description,
            StartDate,
            EndDate,
            MinimumPurchase,
            NuRedemption,
            ownerId,
            image: imagePath,
            category
        });

        const savedOffer = await newOffer.save();
        res.status(201).json(savedOffer);
    } catch (err) {
        console.error('Error creating offer:', err);
        res.status(500).json({ error: 'Failed to create offer' });
    }
});

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


router.put('/edit/:id', async (req, res) => {
  try {
    const updatedOffer = await CommonOffer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json({ message: 'Offer updated', offer: updatedOffer });
  } catch (err) {
    console.error("Edit error:", err);
    res.status(500).json({ message: 'Failed to update offer', error: err.message });
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    const offer = await CommonOffer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch offer', error: err.message });
  }
});



// ✅ DELETE an offer by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedOffer = await CommonOffer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: 'Failed to delete offer', error: err.message });
  }
});



export default router;