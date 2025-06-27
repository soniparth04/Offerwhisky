import express from 'express';
const router = express.Router();
import ImageAd from '../models/ImageAd.js';
import { upload } from '../utils/cloudinary.js';

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { ownerId, budget, title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    if (!title || !description || !ownerId || !budget) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const estimatedReach = parseInt(budget) * 17; // Updated multiplier to match frontend

    const newAd = new ImageAd({
      title,
      description,
      imageUrl: req.file.path,
      ownerId,
      budget,
      estimatedReach,
    });

    await newAd.save();

    res.status(201).json({ message: 'Ad created successfully', ad: newAd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
