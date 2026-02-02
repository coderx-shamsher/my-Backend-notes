const mongoose = require("mongoose")

// connect 
mongoose.connect('mongodb://localhost:27017/backend_day16')

// create schema 

const userschema = mongoose.Schema({
     email: String,
     username : String,
     // har use k kuch posts hai or vo ham ek array mein ly rahe hain 
     posts : [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref : "post"
        } 
     ]
     // posts ek array hai ki cheej ka array of objectid 
})

// export krna tn k server code mein use ho sake. 
module.exports = mongoose.model("usermod",userschema)