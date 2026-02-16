// express app 
const express = require('express')

// user model and post model
const usermodel = require("./Models/user")
const postmodel = require('./Models/post')

// cookie parser 
const cookieParser = require('cookie-parser')

// jwt require 
const jwt = require("jsonwebtoken")

// bcrypt 
const bcrypt = require("bcrypt")


const app = express()
const port = 4040

// setup the view engine ejs 
app.set('view engine', 'ejs')

// json data parser 
app.use(express.json())

// form data parser 
app.use(express.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser())

// public static files
app.use(express.static('public'))


// app.get('/', (req, res) => {
//    res.send("Go To /home")
//    console.log("this is basic app ")

// })

// render the register page on the home page 
app.get('/', (req, res) => {
   res.render('index.ejs')
})

// create use operation 
// ham data ko post method say he send krte hain forms or jab bhi koi sensitive info server pr send krni ho.. 
app.post('/register', async (req, res) => {
   // first check kro k user already exist to nhi krta same gmail say 

   const { email, username, password, age } = req.body

   let user_exist = await usermodel.findOne({ email })
   // console.log(exist)

   // ager user already hai to yeh line of code run hoga .. 
   if (user_exist) {
      return res.send("User is already Registered !! ")
   }

   // lets encrypt the password using the bcrypt 
   let rounds = 10   // setup the rounds for create the hash 
   bcrypt.genSalt(rounds, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
         //   console.log(hash) this line for only the checking of the hashes 

         // create the use now 
         let user = await usermodel.create({
            username,
            password: hash,
            email,
            age

         })

         // jwt token creation 
         // creating secret key for jwt 
         let secretkey = "My_Secret_Key"
         let token = jwt.sign({ email: email, userid: user._id }, secretkey)

         // now lets set the token with cookie and lets send to the front end 
         res.cookie("token", token)

         res.send("Us3r is r3gisT3r3d")
      })

   })

})

// login route 
app.get("/login", (req, res) => {
   //render the login ejs page 
   res.render("login.ejs")
})

// login post method 
app.post("/login", async (req, res) => {
   // first lets find the data of login form 

   let { email, password } = req.body
   // console.log(email)
   // console.log(password)
   console.log(req.body)
   //  res.send("testing")

   // checking ..... user hai bhi k nhi 
   let user = await usermodel.findOne({ email })
   if (!user) {
      return res.status(500).send("Something is wrong.....")
   }
   else {
      bcrypt.compare(password, user.password, function (error, result) {
         if (result) {
            // setup the cookie jwt token
            let secretkey = "My_Secret_Key"
            let token = jwt.sign({ email: email, userid: user._id }, secretkey)
            // now lets set the token with cookie and lets send to the front end 
            res.cookie("token", token)

            // res.send("Welcome to profile sir.....")
            // mai chaahta hu k login hone ke baad profile page pr redirect kr du
            res.redirect("/profile")
            // ager sab kuch theek hai to profile page pr redirect kr do 
         }
         else {
            // alert("Something is wrong....")
            res.redirect("/login")

         }

      })
   }

})

// logout route 
app.get("/logout", (req, res) => {
   res.cookie("token", "")
   res.redirect("/login")
})

// middleware for the protected routes
function isloggedIn(req, res, next) {
   if (req.cookies.token === "") {
      // res.send("You need to login ......!!!......")
      res.redirect("/login")
   } else {
      let secretkey = "My_Secret_Key"
      let data = jwt.verify(req.cookies.token, secretkey)
      
      // data ko ham req.user, means user parameter mein store kr rehain hain.. jise ham use kr sakte hain next 
      req.user_data = data
      next()  
   }
}

// profile route
// add the middleware into your route jise bhi protected bana hai  
app.get("/profile",isloggedIn, async (req,res)=>{
   //   res.send("Welcome to your profile...")
   console.log(req.user_data)

   // first hamne usemodel k method findOne say user ki find kiya hai 
   let user = await usermodel.findOne({email:req.user_data.email})
   // then use profile send kiya hai with the user data
   
   // now hame user ki post ki object id show ho rahi hogi now ham uski posts ko kaise show krvanye ? 
   user.populate("post")
   // now posts ko populate kiya hai  make sure 
   res.render("profile",{user:user})

})


// to get or render the posts page....  
app.get("/posts",isloggedIn,async (req,res)=>{
   // now hame user ki post ki object id show ho rahi hogi now ham uski posts ko kaise show krvanye ? 
   let user = await usermodel.findOne({email:req.user_data.email}).populate("post")
   // posts ko populate kiya hai  make sure 
   res.render("posts",{user})

})

// posts request handle on this route 
app.post("/create_post",isloggedIn, async (req,res)=>{
   // now ham us user koi he post create krne denge jo logged in hai or use hamne findOne kr liya hai 
   let user = await usermodel.findOne({email:req.user_data.email})
    
   let {content} = req.body   
   // now  postmodel ki help say ham post ko create krenge 
   let post = await  postmodel.create({
       // 1) check the post model schema and fill 
       user: user._id,
       content:content,
   })
   // now users k post mein push kro post id 
   user.post.push(post._id)
   // and save 
   await user.save()
   res.redirect("/profile")
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
