const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1]; //Token 

    if(token == null) res.status(400).json({ message: "Åtkomst nekad"}); 

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Din token är inte giltig" + err}); 

        req.username = username; 

        next(); 
    });
}; 

module.exports = authenticateToken; 