import express from 'express';
import Owner from "../models/Owner.js"
const router = express.Router();

router.get('/view-owner', async(req, res) => {
    try {
        const owners = await Owner.find({});
        res.json(owners);
    }catch(error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


export default router;

