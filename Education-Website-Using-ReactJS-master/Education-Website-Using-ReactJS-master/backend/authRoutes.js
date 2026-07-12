const express = require("express");
const router = express.Router();

// Register Route
router.post("/register", (req, res) => {
    res.json({ message: "Register route working!" });
});

// Login Route
router.post("/login", (req, res) => {
    res.json({ message: "Login route working!" });
});

module.exports = router;