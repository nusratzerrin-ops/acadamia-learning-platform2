const Contact = require("../models/Contact");

exports.sendMessage = async (req, res) => {

    try {

        const { name, email, message } = req.body;

        const newMessage = new Contact({
            name,
            email,
            message
        });

        await newMessage.save();

        res.status(201).json({
            message: "Message sent successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};