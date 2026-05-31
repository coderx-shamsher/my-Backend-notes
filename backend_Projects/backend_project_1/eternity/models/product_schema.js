const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/eternity")

const ProductSchema= mongoose.Schema({
    
    productname: String,
    image : String,
    price: Number,
    discount: {
        type:Number,
        default: 0
    },
    bgcolor: String,
    panlecolor: String,
    Textcolor : String
})
 
module.exports = mongoose.model("products",ProductSchema)
