const express = require("express");
const router = express.Router();
const Orders = require("../models/ordersSchema");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/orders", authenticateToken, async (req, res) => {

    try {

        let result = await Orders.find({});
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json(error);
    }

});

router.post("/orders", async (req, res) => {

    try {

        await Orders.create(req.body);
        return res.status(201).json({ message: "The order has been recieved" });

    } catch (error) {
        return res.status(400).json({ message: "The order was not recieved"});
    }

});

router.put("/orders/:id", authenticateToken, async (req, res) => {

    try {

        const { staffNotes, status } = req.body;

        let result = await Orders.updateOne({ _id: req.params.id },
            {
                $set: {
                    staffNotes, 
                    status
                }
            }
        )
        res.status(200).json({ message: "Order has been updated" + result}); 

    } catch (error) {
        res.status(500).json({ message: "Update failed due to: " + error}); 
    }

});

router.delete("/orders/:id", authenticateToken, async (req, res) => {

    try {
        let result = await Orders.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Order has been deleted" });

    } catch (error) {
        res.status(500).json({ message: "Failed due to: " + error });
    }

});

module.exports = router;