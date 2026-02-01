// cookieparser required 
const cookieParser = require('cookie-parser')
// express required 
const express = require('express')
// jwt required 
const jwt = require("jsonwebtoken")
// bcrypt required 
const bcrypt = require('bcrypt')

const app = express()
const port = 3000

// using the mongoose model require the model 
const myusermodel = require("./models/myuser")

// setting up data parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//  static files setup 
app.use(express.static('public'))

// setup the ejs view engine 
app.set('view engine', 'ejs')

// setup cookie parser
app.use(cookieParser())

app.get('/', (req, res) => {
  //   res.send('Hello backend day 15..... ')
  res.render('index')
})

// post route to handle form data
app.post('/create_user', async (req, res) => {
  // ab chlo dekhte hain k data backend pr aya k nhi 
  console.log(req.body)  // to see the res data 
  //  res.send("data backend mein hai..")

  // to create user using usermodel or jo bhi hamne model name create kiha hai 
  // destructuring
  const { username, password, email, age } = req.body

  // 1) we use the bcrypt tn k password ko encrypt kiya ja sake. 
  // create saltrounds = exp 10 for now 
  let saltrounds = 10
  bcrypt.genSalt(saltrounds, (error, mysalt) => {
    bcrypt.hash(password, mysalt, async (error, hash) => {

      //or now create user operation es block me kro 
      // make sure ham async , await k parent function pr lagayen 
      // create user operation 
      // hame create() method use kr rha hai  

      let user = await myusermodel.create({
        username: username,
        password: hash,  //  Not now password ki value password nhi hogi now hash 
        email: email,
        age: age
      })

      // 2) ham ek token create kr rahe hai or use cookie mein set krnenge jo k browser pr save hogi 
      // ham sign() method ka use krte hain token create krne k liye or usme kisi unique key value ko set krte hain  , or most important ek secretkey deni hoti hai 
      let secret_key = "My_secret_Key_00_coder_00x"
      let token = jwt.sign({ email }, secret_key)
      // console.log(token)

      // now token ko cookie mein set kro 
      // res.cookie() method main set hoti hai 
      res.cookie("My_Token", token)

      // ab ham token ko browser mein dekh sakte hain one extension  editmycookie etc ki help say .. 

      // now res send kr raha hun jo bhi user create hua haai 
      res.send(user)
    })

  })


})

// login route get route 
app.get("/login", (req, res) => {
  res.render("login")
})

app.post('/login', async (req, res) => {
  //find that user first 
  let user = await myusermodel.findOne({ email: req.body.email })
  console.log(user) // ager user nhi hai to null milega 
  if (user) {
    // return res.send("somethink Wrong !!!")    
    console.log(user.password)
    console.log(req.body.password)

    // compare the password with encrypted password 
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // lets create token 
        let secret_key = "My_secret_Key_00_coder_00x"
        let token = jwt.sign({ email: user.email }, secret_key)
        res.cookie("My_Token", token)
        
        console.log(result)
        res.send("your are logged in >>>> ")
      }
      else {
        res.send("your are not logged in ")
      }

    })

  }  else {
     res.send("somthink is wrong !!!! ")
  }
  
})

// how to logout the user 
app.get("/logout", (req, res) => {
  // set the value " " blank string 
  res.cookie("My_Token", "")
  res.send("user logged out ")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
