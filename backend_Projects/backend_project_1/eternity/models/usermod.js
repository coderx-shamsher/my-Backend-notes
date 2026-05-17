const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/eternity")

const userSchema= mongoose.Schema({
    
    FullName: String,
    Email: String,
    Password:String,
    Cart: {
        type:Array,
        default:[]
    },
    isAdmin: Boolean,
    Orders: {
        type:Array,
        default: []
    },
    Contact_Number: Number,
    Picture_of_user : String

})
 
module.exports = mongoose.model("user",userSchema)
