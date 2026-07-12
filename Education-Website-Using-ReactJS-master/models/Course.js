const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: { type: String, required: true },
    image: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);