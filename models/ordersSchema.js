const mongoose = require("mongoose"); 

//Schema för beställningar
const orderSchema = new mongoose.Schema({
    customer: {
        name: {
            type: String,
            required: [true, "You need to add a name"]
        }, 
        email: {
            type: String, 
            required: [true, "You need to add an email"],
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Insert a valid email-adress"]
        },
        phone: {
            type: String, 
            required: [true, "You need to add a telephone number"]
        }
    }, 

    product: {
        productType: {
            type: String, 
            required: [true, "You need to add a product"]
        }, 

        servings: {
            type: Number, 
            required: [true, "You need to specify the amount of servings"]
        }, 

        message: {
            type: String, 
            required: false
        }
    
    }, 

    deliveryDate: {
        type: Date, 
        required: [true, "You need to add a delivery date"]
    },   

    comment: {
        type: String, 
        default: "",
        required: false
    },

    status: {
        type: String, 
        enum: [
            "new", 
            "confirmed",
            "inProgress", 
            "ready", 
            "completed",
            "cancelled"
        ], 
        default: "new"
    }, 

    staffNotes: {
        type: String, 
        default: ""
    }

}, {
    timestamps: true
}); 

const Orders = mongoose.model("Order", orderSchema); 

module.exports = Orders; 