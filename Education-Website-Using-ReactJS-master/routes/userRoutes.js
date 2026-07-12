const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin বানানোর জন্য (temporary)
router.post("/make-admin", async (req, res) => {
    const User = require("../models/User");
    const user = await User.findOneAndUpdate(
        { email: req.body.email },
        { role: "admin" },
        { new: true }
    );
    res.json({ message: "Admin করা হয়েছে!", user });
});

module.exports = router;