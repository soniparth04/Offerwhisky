import express from 'express';
import HappyHoursOffer from '../../models/Hourlyoffer.js'
import { upload } from '../../utils/cloudinary.js';

const router = express.Router();


router.post('/create-happy-hours', upload.single('offerImage'), async (req, res) => {
    const { offerTitle, description, category, startTime, endTime, Date, MinimumPurchase, NuRedemption, ownerId } = req.body;

    try {
        const imagePath = req.file ? req.file.path : null;

        const newhappyoffer = new HappyHoursOffer({
            offerTitle,
            description,
            category,
            startTime,
            endTime,
            MinimumPurchase,
            NuRedemption,
            offerImage: imagePath,
            Date,
            ownerId
        }); 

        const savedhappyoffers = await newhappyoffer.save();
        res.status(201).json(savedhappyoffers);
    } catch (err) {
        console.error('Error creating offer:', err);
        res.status(500).json({ error: 'Failed to create offer' });
    }
});

// Get All Happy Hours Offers
router.get('/get-all-happy-hours',   async (req, res) => {
    try {
        const offers = await HappyHoursOffer.find().sort({ Date: -1 }); // newest first
        res.status(200).json(offers);
    } catch (error) {
        console.error('Error fetching happy hour offers:', error);
        res.status(500).json({ error: 'Failed to fetch happy hour offers' });
    }
});

router.put('/update-happy-offer/:id',  upload.single('offerImage'), async (req, res) => {
    try {
        const offerId = req.params.id;

        const { offerTitle, description, category, startTime, endTime, Date } = req.body;

        const updateData = {
            offerTitle,
            description,
            category,
            startTime,
            endTime,
            Date,
        };

        // If new image uploaded
        if (req.file) {
            updateData.offerImage = `http://localhost:5000/uploads/${req.file.filename}`; // or Cloudinary URL
        }

        const updatedOffer = await HappyHoursOffer.findByIdAndUpdate(offerId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedOffer) {
            return res.status(404).json({ error: "Offer not found" });
        }

        return res.status(200).json({ message: "Offer updated", offer: updatedOffer });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: "Failed to update offer" });
    }
});

// ✅ DELETE Happy Hour Offer
router.delete('/delete-happy-hour/:id', async (req, res) => {
    try {
        const deletedOffer = await HappyHoursOffer.findByIdAndDelete(req.params.id);
        if (!deletedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Server error while deleting' });
    }
});

// Get single Happy Hour offer by ID
router.get('/get-happy-hour/:id',  async (req, res) => {
    try {
        const offer = await HappyHoursOffer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (err) {
        console.error('Error fetching offer:', err);
        res.status(500).json({ message: 'Server error while fetching offer' });
    }
});

export default router;