import express from 'express';
import bcrypt from "bcryptjs";
import User from '../models/User.js';
import Coupon from "../models/Coupon.js";
import Owner from "../models/Owner.js"
import mongoose from 'mongoose';
import CommonOffer from '../models/CommonOffer.js';
import Catalog from '../models/Catalog.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import pkg from 'multer-storage-cloudinary';
const router = express.Router();

const { CloudinaryStorage } = pkg; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'common-offers',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      transformation: [{ width: 800, height: 800, crop: 'limit' }],
    },
  });

const upload = multer({ storage });

const authenticateOwner = (req, res, next) => {
    console.log("Session Data:", req.session); // Debugging: Check if session exists
    if (!req.session || !req.session.ownerId) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    req.ownerId = req.session.ownerId; // ✅ Store owner ID for easier access
    next();
};

// ✅ Default Offers
const defaultOffers = [
    { label: "Best of Luck", description: "Wishing you success in your new journey!", expiryDate: "2025-12-31" },
    { label: "Best of Luck", description: "Wishing you success in your new journey!", expiryDate: "2025-12-31" },
    { label: "Best of Luck", description: "Wishing you success in your new journey!", expiryDate: "2025-12-31" },
    { label: "Best of Luck", description: "Wishing you success in your new journey!", expiryDate: "2025-12-31" },
    { label: "Best of Luck", description: "Wishing you success in your new journey!", expiryDate: "2025-12-31" },
    { label: "Best of Luck", description: "Wishing you success in your new journey!", expiryDate: "2025-12-31" },
    { label: "Best of Luck", description: "Wishing you success in your new journey!", expiryDate: "2025-12-31" },
];

// Owner Registration Route
router.post("/owner-registration", upload.fields([
    { name: 'shopImage', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, phone, email, shopName, password, city, state, country, pinCode } = req.body;

        if (!name || !phone || !email || !shopName || !password || !city || !state || !country || !pinCode) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: "Owner already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Extract uploaded image URLs from Cloudinary
        const shopImage = req.files['shopImage'] ? req.files['shopImage'][0].path : null;
        const profileImage = req.files['profileImage'] ? req.files['profileImage'][0].path : null;

        const newOwner = new Owner({
            name,
            phone,
            email,
            shopName,
            password: hashedPassword,
            city,
            state,
            country,
            pinCode,
            shopImage,
            profileImage
        });

        await newOwner.save();
        req.session.ownerId = newOwner._id;

        // ✅ Insert Default Offers for New Owner
        const defaultOffersWithOwner = defaultOffers.map(offer => ({
            ...offer,
            ownerId: newOwner._id
        }));
        await Coupon.insertMany(defaultOffersWithOwner);

        res.status(201).json({
            message: "Owner registered successfully",
            ownerId: newOwner._id,
            shopImage,
            profileImage
        });

    } catch (error) {
        console.error("[Owner Registration] Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post('/owner-login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const owner = await Owner.findOne({ phone });
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.ownerId = owner._id;
        await req.session.save(); // Ensure session is saved properly

        console.log("Login Successful, Session Data:", req.session); // Debugging

        res.status(200).json({ message: "Login successful",
            ownerId: owner._id,
            shopName: owner.shopName });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/owner-logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid"); // Remove session cookie
        res.status(200).json({ message: "Logout successful" });
        console.log("logout successfull")
    });
});

router.post("/owner-reset-password", async (req, res) => {
    try {
        const { phone, newPassword } = req.body;

        if (!phone || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const owner = await Owner.findOne({ phone });
        if (!owner) {
            return res.status(404).json({ message: "Owner not found with this phone number" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        owner.password = hashedPassword;
        await owner.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/owner-info", async (req, res) => {
    console.log("[Owner Info] Session Data:", req.session); // Debugging

    if (!req.session.ownerId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const owner = await Owner.findById(req.session.ownerId);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        res.json({ shopName: owner.shopName, shopImage: owner.shopImage, ownerId: owner._id });
    } catch (error) {
        console.error("[Owner Info] Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// ✅ Protected Route Example (Only Authenticated Owners Can Access)
router.get("/owner-dashboard", authenticateOwner, async (req, res) => {
    try {
        const owner = await Owner.findById(req.ownerId); // ✅ Fix
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }
        res.status(200).json({ message: "Welcome to the owner dashboard", owner });
    } catch (error) {
        console.error("Error fetching owner:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get('/view-users', async (req, res) => {
    console.log("Session data on /view-users:", req.session);  // Debugging log

    if (!req.session.ownerId) {
        return res.status(401).json({ message: "Owner not logged in" });
    }

    try {
        const users = await User.find({ ownerId: req.session.ownerId });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});


// Example backend route
router.get("/view-offers", authenticateOwner, async (req, res) => {
    try {
        const ownerId = req.ownerId; // ✅ Fetch the logged-in owner's ID
        const offers = await Coupon.find({ ownerId }); // ✅ Get only offers of this owner
        res.json(offers);
    } catch (err) {
        res.status(500).json({ message: "Error fetching offers" });
    }
});
// ✅ Create a new offer
router.post("/add-offer", authenticateOwner, async (req, res) => {
    try {
        const { label, description, expiryDate } = req.body;

        if (!label || !description || !expiryDate) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newOffer = new Coupon({
            label,
            description,
            expiryDate,
            ownerId: req.ownerId // Ensure the ownerId is correctly linked
        });

        await newOffer.save();
        res.status(201).json({ message: "Offer added successfully!" });

    } catch (error) {
        console.error("Error adding offer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.post('/create-offer', upload.single('image'), async (req, res) => {
    const { title, description, validTill, ownerId, category } = req.body;

    try {
        const imagePath = req.file ? req.file.path : null;

        const newOffer = new CommonOffer({
            title,
            description,
            validTill,
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


  // GET all common offers
router.get('/common-offers',authenticateOwner, async (req, res) => {
    try {
      const offers = await CommonOffer.find({ownerId: req.ownerId});
      res.status(200).json(offers);
    } catch (err) {
      console.error("Error fetching common offers:", err);
      res.status(500).json({ error: "Failed to fetch common offers" });
    }
  });


// ✅ Fetch Single Offer by ID
router.get("/view-offer/:id", authenticateOwner, async (req, res) => {
    try {
        const offer = await Coupon.findOne({ _id: req.params.id, ownerId: req.ownerId });
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.json(offer);
    } catch (error) {
        console.error("[View Single Offer] Error:", error);
        res.status(500).json({ message: "Error fetching offer" });
    }
});

// ✅ Update Offer
router.put("/edit-offer/:id", authenticateOwner, async (req, res) => {
    try {
        const { label, description, expiryDate } = req.body;
        if (!label || !description || !expiryDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedOffer = await Coupon.findOneAndUpdate(
            { _id: req.params.id, ownerId: req.ownerId },
            { label, description, expiryDate },
            { new: true }
        );

        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.json({ message: "Offer updated successfully!", updatedOffer });
    } catch (error) {
        console.error("[Edit Offer] Error:", error);
        res.status(500).json({ message: "Error updating offer" });
    }
});

// ✅ Delete an offer
router.delete("/delete-offer/:id", async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({ message: "Offer deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting offer" });
    }
});


// add catalog
router.post("/add-catalog", upload.array('images', 5), async (req, res) => {
    const { title, description, ownerId, price } = req.body;
  
    try {
      // Check if images were uploaded and log the result
      console.log('Uploaded Files:', req.files);
  
      // Extract URLs from uploaded files
      const imageUrls = req.files.map(file => file.path);
  
      console.log('Image URLs:', imageUrls);
  
      const newCatalog = new Catalog({
        title,
        description,
        ownerId,
        price,
        image: imageUrls, // Store array of URLs
      });
  
      const savedCatalog = await newCatalog.save();
      res.status(201).json(savedCatalog);
    } catch (err) {
      console.error("Error adding catalog:", err);
      res.status(500).json({ error: "Failed to add catalog" });
    }
  });

// get catalog 
router.get('/view-catalog', authenticateOwner, async(req, res) => {
    try{
        const catalogs = await Catalog.find({ ownerId: req.ownerId});
        res.status(200).json(catalogs);
    } catch (err) {
        console.error("Error fetching catalog:", err);
        res.status(500).json({ error: "Failed to fetch  catalog" });
    }
})


router.get('/users/:userId/claimed-offers', async (req, res) => {
    const { userId } = req.params; // `userId` is actually `_id` in MongoDB


    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        const user = await User.findById(userId); // Find by `_id`, not `userId`
        if (!user) {
            console.log("User not found in DB:", userId); // Debugging log
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure `claimedOffers` exists in the response
        const claimedOffers = user.claimedOffers || [];

        res.status(200).json({ claimedOffers });
    } catch (error) {
        console.error("Error fetching claimed offers:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

router.get("/offers/:ownerId", async (req, res) => {
    try {
        const { ownerId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return res.status(400).json({ message: "Invalid owner ID format" });
        }

        const offers = await Coupon.find({ ownerId });

        if (!offers.length) {
            return res.status(404).json({ message: "No offers found for this owner" });
        }

        res.status(200).json(offers);
    } catch (err) {
        console.error("Error fetching offers:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Get Users Managed by a Specific Owner
router.get("/users/:ownerId", async (req, res) => {
    try {
        const { ownerId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return res.status(400).json({ message: "Invalid owner ID format" });
        }

        const users = await User.find({ ownerId });

        if (!users.length) {
            return res.status(404).json({ message: "No users found for this owner" });
        }

        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/users/:userId/claimed-offers/:offerId", async (req, res) => {
    const { userId, offerId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.claimedOffers = user.claimedOffers.filter(offer => offer._id.toString() !== offerId);
        await user.save();

        res.json({ message: "Offer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


export default router;
