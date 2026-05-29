const mongoose = require("mongoose")

mongoose
.connect("mongodb://localhost:27017/eternity")
.then(function(){
    console.log("Connected Done ")
})
.catch(function(error){
    console.log(error)
})

module.exports = mongoose.connection