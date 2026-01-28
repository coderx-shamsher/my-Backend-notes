// add the mongoose 
const mongoose = require("mongoose")

// connecting with the mongoose with mongodb this is the format for now lets follow for now 
mongoose.connect("mongodb://localhost:27017/testapp")

// add Schema 
// eh kuch info ham users say ly rahe hai 
const my_users_Schema = mongoose.Schema({
       
     username : String,
     password : String,
     email    : String

}) 

// export and use model
// and model name string value mein pass kiya or then , schema pass kiya hai jo maine create kiya hai 

// module.exports = say export kiya tan k use use kr sakun in the server.js file main 
module.exports =  mongoose.model('users', my_users_Schema)

