const express = require('express')
const app = express()
const port = 3000
const path = require('path')

//adding the model 
const usermodel = require("./models/users")
const { emit } = require('process')

// data parsers 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static files middleware 
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '/public')))

// setup the view engine 
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  // res.send('Hello this is backend day12 ')
  // now ejs pages ko render krne k liye add this line 
  res.render("index.ejs") // ejs file name or folder path dene k jarurat nhi hai 
})

// get method route /create to see the add user ejs file 
app.get('/create', (req, res) => {
  res.render("add_users.ejs")
  // console.log('this is users path')
})



//  post /create route hamne forms data ko get krne k liye banya hai keo ka data ko post method se he send krna chaahie 

// make this async 
app.post('/create', async (req, res) => {
  //  console.log(req.body)
  // object destructuring here tn k bar bar object name use na krna parde 
  let { username, password, email } = req.body

  //lets create users 
  // we using the .create() function jo ki ek object lyta hai 
  // await this method 
  let created = await usermodel.create({
    username: username,
    password: password,
    email: email,

    // or we can also do this 
    // username,
    // password,
    // email

  })

  // just checking inside the console
  console.log(created)
  res.redirect('/read_users')
  // res.send(created)
})


// now read the users 
// make async function 
app.get('/read_users', async (req, res) => {
  // using the find() sare users get kr sakte hain 
  let users = await usermodel.find()

  // now ham users mein allread ko pass kr kr read_users ejs file mein as parameters send kr rahe hain 
  res.render("read_users.ejs", { users })
})


// get method route /edit/:userid  for read the and update, render  the page name edit  
app.get('/edit/:userid', async (req, res)=>{
    // destructuring 
    let user = await usermodel.findOne({_id:req.params.userid})
    // let users = req.params.userid
    console.log(user)
    res.render('edit.ejs', {user})
    // res.end("this is the update route ")
})

// post /update route to update user and redirect to the read user route 
app.post('/update/:userid', async (req, res)=>{
  // destructuring   
  let {username, email , password} = req.body
     // update the user using the findandupdate method     
  let updated = await usermodel.findOneAndUpdate({_id:req.params.userid},{username,password,email},{new:true})
  res.redirect("/read_users")
    //  console.log(username,email,password)

})

// delete route 
app.get('/delete/:id', async (req, res) => {
  // let id = req.params.id
  let users = req.params.body
  let deleteuser = await usermodel.findOneAndDelete({ _id: req.params.id })
  console.log(users)
  res.redirect("/read_users")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
