## step setup npm project 

-> follow the concept speration of conserense 

```bash

 npm init -y 

```
-> ek package json file create hogi.. 


## now install some needed packages 

```bash

npm install express mongoose

```

```bash 

npm install jsonwebtoken cookie-parser bcrypt 

npm i multer 
```

## now create folders 
 1) models -> for database models 
 2) config -> multer configration 
 3) public -> 
       images 
       styles
       javascripts

 4) middlewares / or hame ager middlewares functions nhi create kr rahe to rename utils jisme utility function create krte hain.. but meine ek new folder  he  create kr diya utils  name ka.. 

 5) routes  
 6) controller 
 7) views 
 8) utils 
-> we are also tracking our project so install and setup git and create github account 

## create some files 
-> .env 
->  .gitignore  for those file jinko hamne track nhi krna yan push nhi krna git par.. 


### today 

-> create src folder and then create file name app.js  

-> or git empty folders ko github par push nhi krta to hame har empty folder mein ke file create krni pardit hai name .gitkeep or maine ek extension yeh kam easy kr liya or ager ham empty folder mein ek file create krte hain to gitkeep file delete hojegi.. 



#### -> aap.js file 
-> Step 1 done setting up the app server backend basic express app 

```js 

const express = require('express')
const app = express()
const port = 3000

// 
const cookie_parser = require("cookie-parser")
const path = require("path")

// setting  ejs view engine 
app.set("view engine","ejs")

// url data parser setting in app to get user inputs from forms
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// static pages / public folder configuration 
app.use(express.static(path.join(__dirname,"public")))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
``` 

#### user model creation --> in models 
-> create a file name usermodel.js

```js
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/eternity")

const userSchema= mongoose.Schema({
    
    FullName: String,
    Email: String,
    Password:String,
    Cart: {
        type:Array,
        default:[]
    },
    isAdmin: Boolean,
    Orders: {
        type:Array,
        default: []
    },
    Contact_Number: Number,
    Picture_of_user : String

})
 
module.exports = mongoose.model("user",userSchema)

```
--<> ham connection k liye ek configuration file create kr k use sperate krdenge... next task<>

--> Create product Schema with name of productsSchema.js file name 
```js 
const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/eternity")

const ProductSchema= mongoose.Schema({
    
    ProductName: String,
    Image : String,
    Price: Number,
    discount: {
        type:Number,
        default: 0
    },
    bgcolor: String,
    panlecolor: String,
    Textcolor : String
})
 
module.exports = mongoose.model("products",ProductSchema)


```


<!-- # Separation of concerns todays topic with modifications and code (29/5-"may"/26) -->

#### create owners model 
"create admin or owners_model.js file to seprate admins from normal users

```js 
const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/eternity")

const AdminSchema= mongoose.Schema({
    
    FullName: String,
    Email: String,
    Password:String,
    Products: {
        type:Array,
        default: []
    },
    Contact_Number: Number,
    Picture_of_user : String,
    gstIn : String

})
 
module.exports = mongoose.model("Admin",AdminSchema)
```

> now create separate file tn ki ham mongoose connection ko alag kr k save kren na ki models mein..
"in the config folder create mongoose_connection.js file -->"

```js mongoose_connection.js

const mongoose = require("mongoose")

mongoose
.connect("mongodb://localhost:27017/eternity")
.then(function(){
    console.log("Connected Done ")
}) // console.log ki jagah par debuggers use krna hota hai...
.catch(function(error){
    console.log(error)
})

// ham app_server js main file ko include tab he kr sakte hain jab hamne file ko export kiya hoga like this 
module.exports = mongoose.connection
```
>>> also find how to create or use debuggers instead of console.log... 

>> NOTE app-server file he run hoti hai or baki files us k ander link kr k yan import kr k use krte hain..

## import the db connection into main server js file mine is app.js

```js 

// require the db connection 
const db = require("../config/mongoose-connection")

```
now ager server run hoga app.js server to connection message bhi show hoga...

>>  *NOTE --> ham yeh server address koi set nhi krte jab hame project ko online live push krna hai man lo k hamne website live krdi to yeh connect("mongodb://localhost:27017/eternity") to localhost mongodb say connect hone k kosis krega it means k yahan error hoga to ham dynamic connection value koo set krna hai it the important to learn this*


####  now setup the routes in app and routes folder ---> 
1) in the app_server file 
```js app.js

// <<----- setup the routers ----->> 
//    for users 
app.use("/users", Users_Router)

// for admins
app.use("/admins", Admins_Router)

// for products 
app.use("/products", Products_Router)

```

>> now create router files in routes folders
2) file with router code -----> 

> Admins_Router.js    
```js 

const express = require("express")

// create router using express.Router()
const router = express.Router()

// api setup with router or check kro k res mil raha hai k nhi... 
router.get("/", (req,res)=>{
    res.send("helloo admin users......")
})


module.exports = router
```
---

> Users_Router
```js 
const express = require("express")

// create router using express.Router()
const router = express.Router()

// api setup with router or check kro k res mil raha hai k nhi... 
router.get("/", (req,res)=>{
    res.send("helloo admin users......")
})


module.exports = router

```
---

>Product_Router,
```js 

const express = require("express")

// create router using express.Router()
const router = express.Router()

// api setup with router or check kro k res mil raha hai k nhi... 
router.get("/", (req,res)=>{
    res.send("helloo admin users......")
})


module.exports = router

```

### require routers into app server file 

```js app.js
// router require 
const admins_router = require("../routes/Admins_Router")
const users_router = require("../routes/Users_Router")
const products_router = require("../routes/Products_Router")


// setup router using use() function

// users route
app.use("/users",user_router)

// admins route
app.use("/admins",Admin_router)

// products route
app.use("/products",product_router)

```


>> Important now test these routes using postman api testing to make sure the working of these routers.. 

##### --> create and test apis on these routes users,products,admins, in postman application.. 
"Note --> start the server before the testing api in the postman..." 




