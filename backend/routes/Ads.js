import express from 'express';
const router = express.Router();
import ImageAd from '../models/ImageAd.js';
import VideoAd from '../models/VideoAd.js';
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


// Get all Image Ads
router.get('/get-image-ads', async (req, res) => {
  try {
    const imageAds = await ImageAd.find().sort({ createdAt: -1 }); // Most recent first
    res.status(200).json(imageAds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch image ads' });
  }
});


router.post('/create-video-ads', uploadVideo.single("video"),  async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.file);

    const { title, description, budget, ownerId } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'Video upload failed.' });
    }

    const estimatedReach = Math.floor(budget * 10);

    const newAd = new VideoAd({
      title,
      description,
      videoUrl: req.file.path,
      ownerId,
      budget,
      estimatedReach,
    });

    await newAd.save();

    return res.status(201).json({ message: 'Video ad created', ad: newAd });
  } catch (err) {
   console.error('🔥 Video upload error:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));

    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Get all Video Ads
router.get('/get-video-ads', async (req, res) => {
  try {
    const videoAds = await VideoAd.find().sort({ createdAt: -1 }); // Most recent first
    res.status(200).json(videoAds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch video ads' });
  }
});


export default router;
