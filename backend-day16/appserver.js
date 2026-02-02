const express = require('express')
const usermod = require('./Models/usermod')
const posts  = require("./Models/posts")
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello backend... !')
})

app.get('/create' , async (req,res)=>{
     let user = await usermod.create({
          username : "coderY",
          email: "coderY@gmail.com"
     })
     // checking 
     res.send(user)
     console.log(user)
}) 

// lets create post
app.get('/post/create', async (req,res)=>{
     let post = await posts.create({
        postdata: "this is the post1, hello backend ! ",
        user: "69803d3fe34d8fc6544bff63"
     })

     // now ham manually set krenge user id post mein 
     // first find the user with id 
     let user =  await usermod.findOne({_id:"69803d3fe34d8fc6544bff63"})
     user.posts.push(post._id)  // user k posts array mein push krdi hai post id 
     await user.save() // its manuall save ager fineOneandupdate nhi rk rahe to

     res.send({user,post})
     // console.log(user)
     // now ager ham dekhne to post k pass user ki id hai but user k pass post id nhi hai 

})

// hamne do diff models ko reference kiya hai dono k pass ek dusare ka reference hai so this is DATA ASSCOSIATION

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

