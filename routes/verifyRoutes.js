const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/verify", authenticateToken, (req, res) => {
    res.status(200).json({
        message: "Authenticated"
    });
});

module.exports = router;