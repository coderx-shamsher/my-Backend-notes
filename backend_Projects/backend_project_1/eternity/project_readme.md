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



--- 

<!-- today 31-5-26 backend project part 4 development/production setup-->

### -->>> install debug
```sh

npm install debug

```

--> setup into mongoose.connection.js

```js 

const mongoose = require("mongoose")

// require te debug 
const dbr = require("debug")("development:mongoose")

mongoose
.connect("mongodb://localhost:27017/eternity")
.then(function(){
    dbr("Connected Done ")
})
.catch(function(error){
    dbr(error)
})

module.exports = mongoose.connection

```
" development ek enviroment setup kiya hai ... development ek enviroment hai merra : mongoose means mera message kahan say ayeega.. than hamne console.log ko dbr say replace kiya"
" now let's start the server and see what happened... kuch bhi print nhhi hoga keoki hamne enviroment variable set nhi kiya...."

#### how to setup the env variable for debug package, mongoose 
**in bash terminal how to setup**
> *Make sure to run this command into the terminal you have to run the server , jis terminal mein server file run hogo usi terminal main yeh commands run krna...*


```zsh
export NODE_ENV="development" DEBUG="development:*"
```

> to check the env variable 

```sh
 env | grep -E "NODE_ENV|DEBUG"

```

>> now start the server 

--- 

#### another method inline setup command to do  

```zsh

NODE_ENV=development DEBUG="development:*" nodemon ./src/app.js 

# also you can do this without setup node env 
DEBUG="development:*" nodemon ./src/app.js 

# try kro jo bhi chal raha hai ...
```

--- 

#### now create development.json file inside the config folder to setup the mongodb connection string dynamic and safe way 

```JSON 

{
    "MONGODB_URI":"mongodb://localhost:27017"
}

```

#### install config package 

```sh 
npm i config

```

> NOW update your mongoose connection file require config package and use it 

```js mongoose-connection file

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

```
*conig hamare enviroment k hisab se connection dynamically pic krta hai ager production hai to , ager development hai to*


--- 

### now lets create or setup models within routes 

1) admin or owners whatever you have 
```js 

const express = require("express")

// create router using express.Router()
const router = express.Router()

const admins_model = require("../models/admins_model")


// api setup with router or check kro k res mil raha hai k nhi... 

router.get("/", (req,res)=>{
    res.send("helloo admin users......")
})

// condition for development evn only 
// console.log(`\n NODE ENVIRONMENT ----> ${process.env.NODE_ENV} \n`)

// ager development env hoga to he create route avaliable hoga... 
if(process.env.NODE_ENV === "development"){
    // console.log("its dev env....")
    console.log(`\n NODE ENVIRONMENT ----> ${process.env.NODE_ENV} \n`)

    // post method route for "/create" route
    router.post("/create",(req,res)=>{
    res.send("its create")
   })

   
}

module.exports = router

```
> test the api within the postmen change the method and test test /create route jo hamne create krah hai..

##### NOTE -->  now ager main mera node_env change krde to.... let say production 
```sh 

export NODE_ENV=production

## now run you app server..

nodemon your_server_filename

```
**this is how we do environment based development or routing, esmain ham /create route sirf development phase mein he provide kr rahe hain... **

> or yeh check krne k bad let do some work into admins route file
1) lets check k koi admin user hai to nhi ager hai to new admin user create nhi hoga... 
```js 

// ager development env hoga to he create route avaliable hoga... 
if (process.env.NODE_ENV === "development") {
    // console.log("its dev env....")
    console.log(`\n NODE ENVIRONMENT ----> ${process.env.NODE_ENV} \n`)

    // post method route for "/create" route
    router.post("/create", async (req, res) => {
        //   res.send("its create")
        let isadmin = await admins_model.find()

        // ager koi bhi admin user hai to new create krne ki permission nhi hogi...
        if (isadmin.length > 0) {
            return res
                .status(503)
                .send("You don't have permission to create new admin...")
        }
        
        // ager koi admin nhi hai to create 
      // req object deconstruction 
      let { fullname , password , email} = req.body

        // creating admin user 
       let created_admin =  await admins_model.create({
             fullname,
             email,
             password,
        })
 
        // print the create admin user 
        res.status(201).send(created_admin)
    })  

}

```

>> create admin into postmen api 
>> NOTE ---> in the post body mein api test admin data file krna not into params make sure to keep in mind..

<!-- thats all for today....... -->
---- 

