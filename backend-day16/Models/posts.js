const mongoose = require("mongoose")

const postschema = mongoose.Schema({
     postdata: String, // har post ka post data hoga 
     user :{ 
            type:mongoose.Schema.Types.ObjectId,
            ref : "usermod"  // yeh hai reference usermod model ka k user kon hai post ka 
        },  
      // kise user ne post kiya hai 

     date : {
         type: Date ,
         default : Date.now
     }

})

// exporting as post model name 
module.exports = mongoose.model("post",postschema)