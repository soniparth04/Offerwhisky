import express from 'express';
import HappyHoursOffer from '../models/Hourlyoffer.js'

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


export default router;