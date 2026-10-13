const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Users = require("../models/userSchema");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/users", authenticateToken, async (req, res) => {

    try {

        let result = await Users.find({});
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json(error);
    }

});

router.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;

        //Validerar input
        if (!username || !password) {
            return res.status(400).json({ message: "You need to add a username or password" });
        }

        //Om korrekt input = spara användare
        const user = new Users({ username, password });
        await user.save();

        res.status(200).json({ message: "User details are created" });

    } catch (error) {
        res.json({ message: "Fel:" + error });
    }

});

router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        //Validerar input
        if (!username || !password) {
            return res.status(400).json({ message: "You need to enter your username and password" });
        }

        //Kontrollerar inloggningsuppgifter 
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Username or password are incorrect" });
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Username or password are incorrect" });
        } else {
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            const response = {
                message: "Login was succesful",
                token: token
            }
            res.status(200).json({ response });
        }

    } catch (error) {
        console.log("Fel: " + error)

        return res.status(500).json({ message: "Ett fel uppstod"});
    }

}); 

router.delete("/users/:id", authenticateToken, async (req, res) => {

    try {
        let result = await Users.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "User has been deleted" });

    } catch (error) {
        res.status(500).json({ message: "Failed due to: " + error });
    }

});

module.exports = router;