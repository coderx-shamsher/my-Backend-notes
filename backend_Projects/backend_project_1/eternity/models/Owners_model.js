
const mongoose = require("mongoose")


const AdminSchema= mongoose.Schema({
    
    FullName: String,
    Email: String,
    Password:String,
    Products: {
        type:Array,
        default: []
    },
    Contact_Number: Number,
    Picture_of_user : String,
    gstIn : String

})
 
module.exports = mongoose.model("Admin",AdminSchema)
