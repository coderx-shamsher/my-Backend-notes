const mongoose = require("mongoose")

// connect the mongodb with mongoose or use the port number 27017 yeh ek default port number hai
mongoose.connect('mongodb://localhost:27017/mini_project_1')

// creating schema 
const userSchema = mongoose.Schema({
     username: String,
     password: String,
     email: String,
     age: Number,
     post: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "post"
          }
     ]
})


// lets create and export the model 
module.exports = mongoose.model("user", userSchema)
