
const mongoose = require("mongoose")


const adminSchema= mongoose.Schema({
    
    fullname: String,
    email: String,
    password:String,
    products: {
        type:Array,
        default: []
    },
    contact_number: Number,
    picture_of_user : String,
    gstnumber : String

})
 
module.exports = mongoose.model("admin",adminSchema)
