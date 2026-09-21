const express = require("express");
const router = express.Router();
const Messages = require("../models/messagesSchema");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/messages", authenticateToken, async (req, res) => {

    try {

        let result = await Messages.find({});
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json(error);
    }

});

router.post("/messages", async (req, res) => {

    try {

        let result = await Messages.create(req.body);
        return res.status(201).json({ message: "Message is recieved" });

    } catch (error) {
        return res.status(400).json(error);
    }

});

router.put("/messages/:id", authenticateToken, async (req, res) => {

    try {

        const { status } = req.body;
        let result = await Messages.updateOne({ _id: req.params.id },
            {
                $set: {
                    status: status
                }
            }
        )
        res.status(400).json({ message: "Message status has been updated"}); 

    } catch (error) {
        res.status(500).json({ message: "Update failed due to: " + error}); 
    }

});

router.delete("/messages/:id", authenticateToken, async (req, res) => {

    try {
        let result = await Messages.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Message has been deleted" });

    } catch (error) {
        res.status(500).json({ message: "Failed due to: " + error });
    }

});