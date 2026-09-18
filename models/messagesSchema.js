const mongoose = require("mongoose"); 

//Schema för meddelanden
const messageSchema = new mongoose.Schema({
    message: {
        type: String, 
        required: [true, "You need to add a message"]
    }, 

    senderEmail: {
        type: String, 
        required: [true, "You need to add an email"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Insert a valid email-adress"]
    }, 

    senderName: {
        type: String, 
        required: [true, "You need to add a name"]
    } 
}, {
    timestamps: true
}); 

const Messages = mongoose.model("message", messageSchema); 

module.exports = Messages; 