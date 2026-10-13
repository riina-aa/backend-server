const express = require("express");
const router = express.Router();
const Products = require("../models/productSchema");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/products", async (req, res) => {

    try {

        let result = await Products.find({});
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json(error);
    }

});

router.post("/products", authenticateToken, async (req, res) => {

    try {

        let result = await Products.create(req.body);
        return res.status(201).json({ message: "The product has been added" });

    } catch (error) {
        return res.status(400).json(error);
    }

});

router.put("/products/:id", authenticateToken, async (req, res) => {

    try {

        const { productName, description, price, category, image, available, allergies } = req.body;
        let result = await Products.updateOne({ _id: req.params.id },
            {
                $set: {
                    productName, 
                    description, 
                    price, 
                    category, 
                    image, 
                    available, 
                    allergies
                }
            }
        )
        res.status(400).json({ message: "Product has been updated" + result}); 

    } catch (error) {
        res.status(500).json({ message: "Update failed due to: " + error}); 
    }

});

router.delete("/products/:id", authenticateToken, async (req, res) => {

    try {
        let result = await Products.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Product has been deleted" });

    } catch (error) {
        res.status(500).json({ message: "Failed due to: " + error });
    }

});

module.exports = router;