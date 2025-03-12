import dotenv from "dotenv";
dotenv.config(); // Load .env variables

import express from "express";
import session from "express-session";
import cors from "cors";
import connectMongoDBSession from "connect-mongodb-session";

const MongoDBStore = connectMongoDBSession(session);
import path from "path";


const app = express();
const PORT = 5000;

const _dirname = path.resolve();

// Import the DB connection setup
import "./db.js"; // Use .js explicitly for ES modules

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});
store.on('error', (error) => console.error('Session Store Error:', error));

const allowedOrigins = [
    "http://localhost:5173",
    "https://offerwhisky.onrender.com"
];

// Middleware setup
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { 
        secure: false,
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.get("/", (req, res) => {
    res.send("app is running")
})
// ✅ Add the test session route here
app.get('/api/test-session', (req, res) => {
    console.log('Session data:', req.session);
    res.json(req.session);
});

// Example route for user signup
import userRoutes from './routes/user.js';
import ownerRoutes from './routes/owner.js';
const adminRoutes = require("./routes/admin")
app.use('/api/user', userRoutes); // Prefix API routes with /api
app.use("/api/owner", ownerRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
