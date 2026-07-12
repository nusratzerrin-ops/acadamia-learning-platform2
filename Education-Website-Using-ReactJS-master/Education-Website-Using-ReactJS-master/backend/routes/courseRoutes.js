const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post("/add", async (req, res) => {
    try {
        const { title, description, price, instructor, classTime } = req.body;
        const course = new Course({ title, description, price, instructor, classTime });
        await course.save();
        res.status(201).json(course);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { title, description, price, instructor, classTime } = req.body;
        const course = await Course.findByIdAndUpdate(req.params.id, { title, description, price, instructor, classTime }, { new: true });
        res.json(course);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: "Course deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;