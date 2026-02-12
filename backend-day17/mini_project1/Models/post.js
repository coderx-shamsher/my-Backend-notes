const mongoose = require("mongoose")

// connect the mongodb with mongoose or use the port number 27017 yeh ek default port number hai
mongoose.connect('mongodb://localhost:27017/mini_project_1')

// creating schema 
const postSchema = mongoose.Schema({
    username: String,
    email: String,
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    date: {
        type: Date,
        default: Date.now
    },

    content: String,

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]

})


// lets create and export the model 
module.exports = mongoose.model("post", postSchema)
