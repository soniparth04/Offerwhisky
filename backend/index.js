require('dotenv').config(); // Load .env variables

const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Import the DB connection setup
require('./db'); // Assuming the db.js file is in the same directory

// Middleware setup
app.use(cors({
    origin: "https://offerwhisky-3scj.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true, maxAge: 2 * 60 * 60 * 1000 } // 2 hours
    })
);

// ✅ Add the test session route here
app.get('/api/test-session', (req, res) => {
    console.log('Session data:', req.session);
    res.json(req.session);
});

// Example route for user signup
const userRoutes = require('./routes/user');
const ownerRoutes = require('./routes/owner')
app.use('/api/user', userRoutes); // Prefix API routes with /api
app.use("/api/owner", ownerRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
