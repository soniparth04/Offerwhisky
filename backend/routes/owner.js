const express = require('express');
const bcrypt = require("bcryptjs");
const User = require('../models/User');
const Coupon = require("../models/Coupon");
const Owner = require("../models/Owner");
const mongoose = require('mongoose');
const router = express.Router();

// ✅ Middleware to Authenticate Owners
const authenticateOwner = (req, res, next) => {
    console.log("[Auth Middleware] Session Data:", req.session); // Debugging

    if (!req.session || !req.session.ownerId) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    req.ownerId = req.session.ownerId;
    next();
};

// ✅ Owner Registration Route
router.post("/owner-registration", async (req, res) => {
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
        const newOwner = new Owner({
            name, phone, email, shopName, password: hashedPassword, city, state, country, pinCode
        });

        await newOwner.save();
        req.session.ownerId = newOwner._id;

        console.log("[Owner Registration] Session after setting ownerId:", req.session); // Debugging

        res.status(201).json({ message: "Owner registered successfully", ownerId: newOwner._id });

    } catch (error) {
        console.error("[Owner Registration] Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Owner Login Route
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
        console.log("[Owner Login] Session after login:", req.session); // Debugging

        res.status(200).json({ message: "Login successful", ownerId: owner._id, shopName: owner.shopName });

    } catch (error) {
        console.error("[Owner Login] Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Owner Logout Route
router.post("/owner-logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid");
        console.log("[Owner Logout] Logout successful");
        res.status(200).json({ message: "Logout successful" });
    });
});

// ✅ Owner Reset Password
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
        console.error("[Owner Reset Password] Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Fetch Owner Info
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

        res.json({ shopName: owner.shopName, ownerId: owner._id });
    } catch (error) {
        console.error("[Owner Info] Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ View Users Managed by Owner
router.get('/view-users', authenticateOwner, async (req, res) => {
    try {
        const users = await User.find({ ownerId: req.ownerId });
        res.json(users);
    } catch (error) {
        console.error("[View Users] Error:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

// ✅ View Offers of Logged-In Owner
router.get("/view-offers", authenticateOwner, async (req, res) => {
    try {
        const offers = await Coupon.find({ ownerId: req.ownerId });
        res.json(offers);
    } catch (err) {
        console.error("[View Offers] Error:", err);
        res.status(500).json({ message: "Error fetching offers" });
    }
});

// ✅ Add Offer
router.post("/add-offer", authenticateOwner, async (req, res) => {
    try {
        const { label, description, expiryDate } = req.body;
        if (!label || !description || !expiryDate) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newOffer = new Coupon({ label, description, expiryDate, ownerId: req.ownerId });
        await newOffer.save();
        res.status(201).json({ message: "Offer added successfully!" });

    } catch (error) {
        console.error("[Add Offer] Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Delete Offer
router.delete("/delete-offer/:id", authenticateOwner, async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({ message: "Offer deleted successfully" });
    } catch (err) {
        console.error("[Delete Offer] Error:", err);
        res.status(500).json({ message: "Error deleting offer" });
    }
});

// ✅ Get Claimed Offers of User
router.get('/users/:userId/claimed-offers', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            console.log("[Claimed Offers] User not found:", req.params.userId); // Debugging
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ claimedOffers: user.claimedOffers || [] });
    } catch (error) {
        console.error("[Claimed Offers] Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
