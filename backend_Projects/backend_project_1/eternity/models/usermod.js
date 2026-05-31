const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/eternity")

const userSchema= mongoose.Schema({
    
    fullname: String,
    email: String,
    password:String,
    cart: {
        type:Array,
        default:[]
    },
    isAdmin: Boolean,
    orders: {
        type:Array,
        default: []
    },
    contact_number: Number,
    picture_of_user : String

})
 
module.exports = mongoose.model("user",userSchema)
