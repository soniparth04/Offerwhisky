import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; 
import Coupon from "../models/Coupon.js";
import Owner from "../models/Owner.js"; 
import CommonOffer from "../models/CommonOffer.js"
import Catalog from '../models/Catalog.js';

const router = express.Router();

// 🔹 Authentication Middleware
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized! Please log in first." });
    }
    next();
};


router.get("/all-shops", async (req, res) => {
    try {
        const owners = await Owner.find({}, "shopName _id city state profileImage "); // select only needed fields
        res.json(owners); // sending array of shop owners
    } catch (error) {
        console.error("Error fetching all shops:", error);
        res.status(500).json({ message: "Failed to fetch shops" });
    }
});

router.get('/shop/:id', async (req, res) => {
    try {
      const shop = await Owner.findById(req.params.id);
      if (!shop) return res.status(404).json({ message: "Shop not found" });
      res.json(shop);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

router.get("/common-offers/:ownerId", async (req, res) => {
    try {
      const offers = await CommonOffer.find({ ownerId: req.params.ownerId, isCommon: true });
      res.status(200).json(offers);
    } catch (error) {
      console.error("Error fetching common offers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Get all offers for a specific owner/shop
router.get('/owner/:ownerId', async (req, res) => {
    try {
      const offers = await CommonOffer.find({ ownerId: req.params.ownerId });
      res.json(offers);
    } catch (error) {
      console.error('Error fetching offers:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Get all catalog items for a specific owner
router.get('/catalog/:ownerId', async (req, res) => {
  try {
    const items = await Catalog.find({ ownerId: req.params.ownerId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching catalog items' });
  }
});

  router.get('/latest-offers', async (req, res) => {
    try {
      const offers = await CommonOffer.find()
        .populate('ownerId', 'shopName') // Populating the 'shopName' field from the 'Owner' model
      res.status(200).json(offers);
    } catch (err) {
      console.error("Error fetching common offers:", err);
      res.status(500).json({ error: "Failed to fetch offers" });
    }
  });

  router.get('/offer/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const offer = await CommonOffer.findById(id)
        .populate('ownerId', 'shopName') // populate shopName from owner
        .exec();
  
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }
  
      res.status(200).json(offer);
    } catch (error) {
      console.error('Error fetching offer by ID:', error);
      res.status(500).json({ message: "Server error while fetching offer" });
    }
  });

router.get("/spinner/:ownerId", async (req, res) => {
    const { ownerId } = req.params;

    try {
        const coupons = await SpinToWin.find({ ownerId });

        const canSpin = coupons.length >= 6; // Check if there are at least 6 offers

        if (!coupons.length) {
            return res.status(404).json({ message: "No offers found for this owner." });
        }

        res.json({ coupons, canSpin }); // Send both offers and spinner availability
    } catch (error) {
        console.error("Error fetching spinner data:", error);
        res.status(500).json({ message: "Server error fetching offers." });
    }
});



// Example of clearing session on logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Error destroying session" });
        }
        res.status(200).json({ message: 'Logged out successfully' });
        console.log("logout successfully");
    });
});

router.post("/claim-offer/:ownerId", async (req, res) => {
    console.log("Session data on claim-offer:", req.session);
    
    if (!req.session.user) {
        console.log("User not found in session!");
        return res.status(401).json({ message: "User not logged in" });
    }

    console.log("User in session:", req.session.user); // Log session user data

    const { phone } = req.session.user;
    const { offerLabel } = req.body;
    const { ownerId } = req.params; // Get ownerId from URL

    try {
        // Find the user and ensure they are linked to this owner
        const user = await User.findOne({ phone, ownerId });
        if (!user) {
            console.log("User not found in DB or not linked to ownerId:", ownerId);
            return res.status(404).json({ message: "User not found or not linked to this owner" });
        }

        // Find the coupon that belongs to this owner
        const coupon = await Coupon.findOne({ label: offerLabel, ownerId });
        if (!coupon) {
            console.log("Offer not found for owner:", ownerId, "Offer label:", offerLabel);
            return res.status(404).json({ message: "Offer not found for this owner" });
        }


        user.claimedOffers.push({
            label: coupon.label,
            description: coupon.description
        });

        await user.save();

        console.log("Offer claimed successfully for user:", phone);
        res.status(200).json({ message: "Offer claimed successfully!" });
    } catch (error) {
        console.error("Error claiming offer:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


router.get("/test-session", (req, res) => {
    if (req.session && req.session.user) {
        res.json({ sessionActive: true, user: req.session.user });
    } else {
        res.json({ sessionActive: false, message: "No active session" });
    }
});

router.get("/:ownerId", async (req, res) => {
    const { ownerId } = req.params;

    try {
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        res.json({ shopName: owner.shopName }); // ✅ Return shop name
    } catch (error) {
        console.error("Error fetching owner details:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/user-offers/:shopName/:ownerId", async (req, res) => {
    if (!req.session.user || !req.session.user.userId) {
        return res.status(401).json({ message: "Unauthorized: No user session found" });
    }

    const { shopName, ownerId } = req.params;
    const userId = req.session.user.userId; // ✅ Fetch correct userId

    try {
        const user = await User.findOne({ _id: userId, ownerId });

        if (!user) {
            return res.status(404).json({ message: "User not found or unauthorized" });
        }

        res.json({ claimedOffers: user.claimedOffers });
    } catch (error) {
        console.error("Error fetching claimed offers:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});


router.post('/spin', async (req, res) => {
    try {
        if (!req.session.user?.userId) {
            return res.status(401).json({ error: "Not logged in" });
        }

        const user = await User.findById(req.session.user.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Check cooldown only (don't update lastSpinTime yet)
        const cooldownMs = 60 * 1000; // 1 minute
        const now = new Date();
        
        if (user.lastSpinTime && (now - user.lastSpinTime) < cooldownMs) {
            const timeLeftMs = cooldownMs - (now - user.lastSpinTime);
            return res.status(403).json({
                cooldown: true,
                timeLeftMs
            });
        }

        // Return permission to spin without saving yet
        res.json({ canSpin: true });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/confirm-spin', async (req, res) => {
    try {
        const user = await User.findById(req.session.user.userId);
        user.lastSpinTime = new Date();
        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
