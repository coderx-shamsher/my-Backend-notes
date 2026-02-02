<!-- data association 

1) referencing  jis mein data id hoti hai product nhi us ki id 
 emmbading  jis mein pura data hota hai 
-->
## npm setup 

```sh 
npm init -y 

# install these packages 
npm install express mongoose 
```
- make a js file 

```js setup the express server 

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello backend day 16 .... !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

``` 

- also craete script to run js file 

- create new folder name models with filename usermod.js 

```js 

const mongoose = require("mongoose")

// connect 
mongoose.connect('mongodb://localhost:27017/backend_day16')

// create schema 

const userschema = mongoose.Schema({
     email: String,
      username : String,
     // har use k kuch posts hai or vo ham ek array mein ly rahe hain 
     posts : Array
})

// export krna tn k server code mein use ho sake. 
module.exports = mongoose.model("usermod",userschema)
```

- now create now file name posts.js 

```js 

const mongoose = require("mongoose")

const postschema = mongoose.Schema({
     postdata: String, // har post ka post data hoga 
     user : String,   // kise user ne post kiya hai 
     date : {
         type: Date ,
         default : Date.now
     }

})

// exporting as post model name 
module.exports = mongoose.model("post",postschema)

```
> now hamne kuch changes krne hai posts , jo k usermod mein hai or user jo ki post model k ander hai .. 

> 1. change the posts array with this code 
``` js 
   posts : [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref : "post"  // yehan pr vo name lihkna hai jis name say hamne model ko export kra.. 
         } 
     ]
     // posts ek array hai ki cheej ka array of objectid 
```

> 2. change the user with this -> 
```js 
user : [
        {
          type:mongoose.Schema.Types.ObjectId,
          ref : "usermod"  // yeh hai reference usermod model ka k user kon hai post ka 
        }
         
     ],
```

#### hamne yeh kiya keo ? 
hamne 1. usermod mein post id set kri k jo bhi posts user post krega to uski id say us post ka reference lya ja sake.. 
2. post k pass user ki id hai jo hamne set kri hai.. 
yeh dono he ek dusare ko referer kr rahe hain... 
bs hamne yehi kra hai .. dono ki ek dusare ki id say reference kiya hai.. 


```js code of usermod
app.get('/create' , async (req,res)=>{
     let user = await usermod.create({
          username : "coderY",
          email: "coderY@gmail.com"
     })
     // checking 
     res.send(user)
     console.log(user)
}) 

```
- now lets create post/create route to create post 

```js code of posts   

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

```