
//Hämtar paket
const express = require("express");
const jwt = require("jsonwebtoken"); 
const cors = require("cors"); 
const mongoose = require("mongoose"); 
require("dotenv").config(); 

//Hämtar routes 
const prodRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes"); 
const messRoutes = require("./routes/messageRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express(); 
const port = process.env.PORT || 3001; 

app.use(cors()); 
app.use(express.json()); 

//Ansluter till MongoDb
mongoose.connect("mongodb://localhost:27017/greenhouse").then(() => {
    console.log("Connected to database")
}).catch((error) => {
    console.log("Failed to connect to database: " + error)
}); 

//Routes 
app.use("/greenhouse", prodRoutes);
app.use("/greenhouse", userRoutes); 
app.use("/greenhouse", messRoutes); 
app.use("/greenhouse", orderRoutes);  

//Startar server
app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`)
}); 