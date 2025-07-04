import express from 'express';
import HappyHoursOffer from '../../models/Hourlyoffer.js'

const router = express.Router();
 
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
router.get('/get-happy-hour/:id',authenticateOwner,  async (req, res) => {
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