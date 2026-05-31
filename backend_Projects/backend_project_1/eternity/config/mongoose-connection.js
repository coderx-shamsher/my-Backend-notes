const mongoose = require("mongoose")

// config package 
const config = require("config")


// require te debug 
const dbgr = require("debug")("development:mongoose");


mongoose
.connect(`${config.get("MONGODB_URI")}/eternity`)
// adding backtick to use te config with dynamic value 

.then(function(){
    dbgr("Connected Done")
    
})
.catch(function(error){
    dbgr(error)
})

module.exports = mongoose.connection