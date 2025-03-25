import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // ✅ Change require to import
import Coupon from "../models/Coupon.js";
import Owner from "../models/Owner.js"; // ✅ Import the Owner model

const router = express.Router();

// 🔹 Authentication Middleware
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized! Please log in first." });
    }
    next();
};

router.post('/signup/:shopName/:ownerId', async (req, res) => {
    const { name, phone, password } = req.body;
    const { ownerId } = req.params; // Get ownerId from URL

    try {
        const existingUser = await User.findOne({ phone, ownerId });
        if (existingUser) {
            return res.status(400).json({ message: 'Phone number already exists for this owner' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            phone,
            password: hashedPassword,
            ownerId 
        });

        await newUser.save();

        // 🔹 Store user data in session
        req.session.user = {
            phone: newUser.phone,
            ownerId: newUser.ownerId,
            name: newUser.name
        };

        console.log("User session before save:", req.session);

        // 🔹 Manually save the session to persist it immediately
        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ message: 'Session save failed' });
            }
            console.log("Session saved successfully:", req.session.user);
            res.status(201).json({ message: 'User created and session started', user: req.session.user });
        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/login/:shopName/:ownerId', async (req, res) => {
    const { phone, password } = req.body;
    const { ownerId } = req.params;

    try {
        // 🔹 Check if ownerId exists in the database
        const ownerExists = await Owner.findById(ownerId);
        if (!ownerExists) {
            return res.status(404).json({ message: "Invalid owner ID" });
        }

        // 🔹 Find user who is a customer of the given owner
        const user = await User.findOne({ phone, ownerId });

        if (!user) {
            return res.status(404).json({ message: "Invalid phone number" });
        }

        // 🔹 Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // 🔹 Store user session
        req.session.user = {userId: user._id, phone: user.phone, ownerId: user.ownerId };
        await req.session.save();
        console.log("User logged in, session updated:", req.session.user);

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// router.post('/send-otp', async (req, res) => {
//     const { phone } = req.body;

//     try {
//         // Check if user exists
//         const user = await User.findOne({ phone });
//         if (!user) {
//             return res.status(404).json({ message: "User doesn't exist" });
//         }

//         // Send OTP using MSG91 widget API
//         const response = await fetch("https://control.msg91.com/api/v5/widget/sendOTP", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 authkey: "MSG91_AUTH_KEY", // Replace with your MSG91 auth key
//                 widgetId: "35626562327a373630363233", // Replace with your widget ID
//                 phone: phone
//             })
//         });

//         const data = await response.json();

//         if (data.type === "success") {
//             // OTP sent successfully, return response to frontend
//             res.status(200).json({ message: "OTP sent successfully. Please verify." });
//         } else {
//             return res.status(400).json({ message: "Failed to send OTP. Please try again." });
//         }
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// Route to verify OTP
// Route to verify OTP
// router.post('/verify-otp', async (req, res) => {
//     const { phone, otp } = req.body; // Receive OTP from frontend

//     try {
//         // Make the API request to verify OTP
//         const response = await fetch("https://control.msg91.com/api/v5/widget/verifyOTP", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 authkey: MSG91_AUTH_KEY, // Replace with your actual MSG91 auth key
//                 phone: phone, // Phone number
//                 otp: otp // Received OTP from frontend
//             })
//         });

//         const data = await response.json();

//         if (data.type === "success") {
//             // OTP Verified - Check if the user exists in DB
//             let user = await User.findOne({ phone });
//             if (!user) {
//                 return res.status(404).json({ message: "User doesn't exist" });
//             }

//             // Store user info in session (if needed)
//             req.session.user = { id: user._id, phone: user.phone };

//             return res.status(200).json({ message: "Login successful" });
//         } else {
//             return res.status(400).json({ message: "Invalid OTP" });
//         }
//     } catch (error) {
//         console.error("Error verifying OTP:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });



// Fetch offers for a specific owner
router.get("/spinner/:shopName/:ownerId", async (req, res) => {
    const { ownerId } = req.params;

    try {
        const coupons = await Coupon.find({ ownerId });
        if (!coupons.length) {
            return res.status(404).json({ message: "No offers found for this owner." });
        }
        res.json(coupons);
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
