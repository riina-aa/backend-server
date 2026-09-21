const express = require("express"); 
const router = express.Router();
const Messages = require("../models/messagesSchema");
const authenticateToken = require("../middleware/authenticateToken");  

router.get("/messages", authenticateToken, async (req, res) => {

});

router.post("/messages", async (req, res) => {

});

router.put("/messages", authenticateToken, async (req, res) => {

});

router.delete("/messages", authenticateToken, async (req, res) => {

});