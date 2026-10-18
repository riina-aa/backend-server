const mongoose = require("mongoose"); 

//Schema för meddelanden
const productSchema = new mongoose.Schema({
    productName: {
        type: String, 
        required: [true, "You need to add a product name"]
    }, 

    description: {
        type: String, 
        required: [true, "You need to add a description"]
    }, 

    price: {
        type: Number, 
        required: [true, "You need to add a price"]
    }, 

    category: {
        type: String, 
        enum: [
            "brunch", 
            "bakery", 
            "sourdough",
            "hotDrinks",
            "coldDrinks",
            "cocktails"
        ]
    }, 

    available: {
        type: Boolean, 
        default: true
    }, 

    allergies: {
        type: String, 
        required: false 
    }, 
}, {
    timestamps: true
}); 

const Products = mongoose.model("product", productSchema); 

module.exports = Products; 