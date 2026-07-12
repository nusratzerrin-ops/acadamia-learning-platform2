const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET all users
router.get("/all", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        res.json({ token: "token-" + user._id, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;