const mongoose = require('mongoose')

// setup this mongodb string 
mongoose.connect(`mongodb://localhost:27017/backend_day15`)


// create schema 
const myuserschema = mongoose.Schema({
     username : String,
     password: String,
     email : String, 
     age : Number

    })




module.exports = mongoose.model("myuser",myuserschema)    