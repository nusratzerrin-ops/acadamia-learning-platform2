const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: "সব field পূরণ করুন" });
    }
    
    res.json({ message: "Message sent successfully" });
});

module.exports = router;