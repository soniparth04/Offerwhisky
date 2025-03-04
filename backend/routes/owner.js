import express from 'express';
import bcrypt from "bcryptjs";
import User from '../models/User.js';
import Coupon from "../models/Coupon.js";
import Owner from "../models/Owner.js"
import mongoose from 'mongoose';
const router = express.Router();


const authenticateOwner = (req, res, next) => {
    console.log("Session Data:", req.session); // Debugging: Check if session exists
    if (!req.session || !req.session.ownerId) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    req.ownerId = req.session.ownerId; // ✅ Store owner ID for easier access
    next();
};


// Owner Registration Route
router.post("/owner-registration", async (req, res) => {
    try {
        const { name, phone, email, shopName, password, city, state, country, pinCode } = req.body;

        if (!name || !phone || !email || !shopName || !password || !city || !state || !country || !pinCode) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if owner already exists
        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: "Owner already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new owner
        const newOwner = new Owner({
            name,
            phone,
            email,
            shopName,
            password: hashedPassword,
            city,
            state,
            country,
            pinCode
        });

        await newOwner.save();

        // Store owner ID in session
        req.session.ownerId = newOwner._id;

        res.status(201).json({
            message: "Owner registered successfully",
            ownerId: newOwner._id
        });

    } catch (error) {
        console.error("Registration error:", error);
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

router.get("/owner-info", authenticateOwner, async (req, res) => {
    try {
        const owner = await Owner.findById(req.ownerId);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }
        res.status(200).json({ shopName: owner.shopName });
    } catch (error) {
        console.error("Error fetching owner info:", error);
        res.status(500).json({ message: "Server error" });
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


// ✅ Get offer by ID for editing
router.get("/edit-offer/:id", async (req, res) => {
    try {
        const offer = await Coupon.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.json(offer);
    } catch (err) {
        console.error("Error fetching offer:", err);
        res.status(500).json({ message: "Error fetching offer details" });
    }
});

// ✅ Update an offer
router.put("/update-offer/:id", async (req, res) => {
    try {
        const { label, description, expiryDate } = req.body;

        const updatedOffer = await Coupon.findByIdAndUpdate(
            req.params.id,
            { label, description, expiryDate },
            { new: true }
        );

        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.json(updatedOffer);
    } catch (err) {
        console.error("Error updating offer:", err);
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


export default router;
