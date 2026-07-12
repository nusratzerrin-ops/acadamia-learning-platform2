const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const Course = require("../models/Course");

// সব Course দেখা
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Course Add (Admin only)
router.post("/add", verifyAdmin, async (req, res) => {
    try {
        const { title, description, price, instructor, image } = req.body;
        const course = new Course({ title, description, price, instructor, image });
        await course.save();
        res.status(201).json({ message: "Course যোগ করা হয়েছে!", course });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Course Update (Admin only)
router.put("/update/:id", verifyAdmin, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Course আপডেট হয়েছে!", course });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Course Delete (Admin only)
router.delete("/delete/:id", verifyAdmin, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: "Course মুছে ফেলা হয়েছে!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Course Enroll (Login করা User)
router.post("/enroll", verifyToken, (req, res) => {
    res.json({ message: "Course Enroll সফল!", user: req.user });
});

module.exports = router;