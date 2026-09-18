const mongoose = require("mongoose"); 

//Schema för användarkonton
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "You need to add a username"], 
        unique: true
    }, 

    password: {
        type: String, 
        required: [true, "You need to add a password"]
    }
}, {
    timestamps: true
}); 

const Users = mongoose.model("user", userSchema); 

model.exports = Users; 