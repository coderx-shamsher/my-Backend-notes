# setup npm 
```zsh 
    npm init -y 
```
## install packages 
```zsh 
        npm install bcrypt express jsonwebtoken cookie-parser
```

> make new js file  appserver.js yeh meri file ka name hai 
> now setup the express app 

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
``` 
> also create script to run your app server 

> insatll ejs 
```sh 
   npm install ejs 
```

> now setup some data parsers 

```js 
  // setting up data parsers
app.use(express.json())
app.use(express.urlencoded({extended: true}))

```
>  setup the static files folder (public folder)

```js 
  //  static files setup 
app.use(express.static('public'))

```
> also make public folder in current working folder 

> now setup the view engine 
```js 

 app.set('view engine','ejs')

```

> setup cookie parser
```js 

const cookieParser = require('cookie-parser')

// setup cookie parser
app.use(cookieParser())

```

> create a folder name views , tn ki ejs pages ko render kiya ja sake.. 
> create index.ejs file 
> create one folder inside the public is -- styles

> setup taliwindcss 

```zsh 
   npm install tailwindcss @tailwindcss/cli
```

> create src folder inside the styles and then create input.css file 

```zsh
 
npx @tailwindcss/cli -i ./public/styles/src/input.css -o ./public/styles/src/output.css --watch 

```
> us output.css file ko use kro apni kisi bhi ejs file mein to use the tailwindcss 

> now also install the mongoose package 
```sh 
  npm install mongoose 

```
> create a new folder name modele , or ek file create kro name myuser.js

```js 
const mongoose = require('mongoose')

// setup this mongodb string 
mongoose.connect(`mongodb://localhost:27017/backend_day15`)


// create schema 
const myuserschema = mongoose.Schema({
     username : String,
     password: String,
     email : String, 
     age : Number

    })


// maine mere myuser model ko export kiya tn k mere appserver code mein use kr sakun 
module.exports = mongoose.model("myuser",myuserschema)    

```

- use this mongoose code in server file 

```js 
// using the mongoose model require the model 
const myusermodel = require("./models/myuser")

```

> now style the index.ejs file 
> create a form and also style this form in index.ejs

> maine mere / route pr meri index.ejs file ko render krvaya hai 
```js

app.get('/', (req, res) => {
//   res.send('Hello backend day 15..... ')
  res.render('index')
})

```

> now hamne ek form create kiya hai style bhi kiya hai jis say ham users create kr sakte hain 

```html 

 <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>backend-day15</title>
    <link rel="stylesheet" href="/styles/src/output.css">
</head>

<body>
    <header class="bg-yellow-500 text-black font-semibold h-10 pt-2">
        <nav class="mr-6">
            <ul class="flex gap-10 justify-end">
                <a href="">
                    <li>Home</li>
                </a>
                <a href="">
                    <li>Read_User</li>
                </a>
                <a href="">
                    <li>Create_user</li>
                </a>
                <a href="">
                    <li>About</li>
                </a>
            </ul>
        </nav>
    </header>

    <div id="Form_container" class="w-full h-screen bg-gray-200 pt-2">
         <div class="pb-2">
              <h2>Create User </h2>
         </div>

        <form class="flex gap-5 flex-col justify-center items-center pt-5" method="post" action="/create_user">
            <!-- username input  -->

            <div class=" bg-sky-100 w-[20rem] pb-[-10px] text-black border-2 border-zinc-600  rounded-2xl" id="username">
                <input class="outline-none w-[20rem] rounded-2xl  px-5" placeholder="Enter Username" type="text" name="username" id="username_input">
            </div>

            <!-- password input -->
            <div class=" bg-sky-100 w-[20rem] border-2 border-zinc-600 rounded-2xl" id="password">
                <input class="outline-none w-[20rem] rounded-2xl px-5" placeholder="Enter Password" type="password" name="password" id="">
            </div>

            <!-- email input  -->
            <div class=" bg-sky-100 w-[20rem] border-2 border-zinc-600 rounded-2xl" id="email">
                <input class="outline-none w-[20rem]  rounded-2xl px-5" placeholder="Enter Email" type="email" name="email" id="">

            </div>

            <!-- age input -->
            <div class="w-[20rem] bg-sky-100 border-2 border-zinc-600 rounded-2xl" id="age">
                <input class="outline-none w-[20rem] rounded-2xl px-5" type="number" placeholder="Enter Age" name="age" id="">
            </div>
     
            <!-- submit btn  -->
             <div class="subtn bg-sky-600 w-20 px-3.5">
                  <button>Submit</button>
             </div>
        </form>
    </div>
</body>

</html>

```
- eska method post so create post route to accept form data 

```js 
// post route to handle form data
// make async function 
app.post('/create_user', async (req,res)=>{
     // ab chlo dekhte hain k data backend pr aya k nhi 
     console.log(req.body)
     res.send("data backend mein hai..")

     // to create user using usermodel or jo bhi hamne model name create kiha hai 
  // destructuring
  const { username, password, email, age } = req.body

  // create user operation 
  // hame create() method use kr rha hai 
  let user = await myusermodel.create({
    username: username,
    password: password,
    email: email,
    age: age
  })
      // now res send kr raha hun jo bhi user create hua haai 
   res.send(user)
  
}) 


```
Now ager app dekhoge k hamara password plain text mein show ho rha hai jo ki bhut he katarnak hai 
> now ham use kr rahe hai password encryption jis ki help say ham password koi unreadable bana sakte hain.. changes ham post method code k ager he kr rahe hai but yeh code main neche likh rhaha hun tn k code clean dikhe.. 

```js 

// post route to handle form data
app.post('/create_user', async (req, res) => {
  // ab chlo dekhte hain k data backend pr aya k nhi 
  // console.log(req.body)
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

      // now res send kr raha hun jo bhi user create hua haai 
      res.send(user)
    })

  })


})
// this is the encrypted password code

``` 

--- 
---


```js how to generate token and how to set into a cookie 

   // post route to handle form data
app.post('/create_user', async (req, res) => {
  // ab chlo dekhte hain k data backend pr aya k nhi 
  // console.log(req.body)
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
      let token = jwt.sign({email},secret_key)
      // console.log(token)
      
      // now token ko cookie mein set kro 
      // res.cookie() method main set hoti hai 
      res.cookie("My_Token",token)
 
      // ab ham token ko browser mein dekh sakte hain one extension  editmycookie etc ki help say .. 

      // now res send kr raha hun jo bhi user create hua haai 
      res.send(user)
    })

  })


})
```
- now create route to show login page 

```js 

// login route 
app.get("/login", (req, res) => {
  res.render("login")
})

```
---
### create file login.ejs 

```html 

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>backend-day15</title>
    <link rel="stylesheet" href="/styles/src/output.css">
</head>

<body>
    <header class="bg-yellow-500 text-black font-semibold h-10 pt-2">
        <nav class="mr-6">
            <ul class="flex gap-10 justify-end">
                <a href="">
                    <li>Home</li>
                </a>
                <a href="">
                    <li>Read_User</li>
                </a>
                <a href="">
                    <li>Create_user</li>
                </a>
                <a href="">
                    <li>About</li>
                </a>
            </ul>
        </nav>
    </header>

    <div id="Form_container" class="w-full h-screen bg-gray-200 pt-2">
         <div class="pb-2">
              <h2>Login Your Account</h2>
         </div>

        <form class="flex gap-5 flex-col justify-center items-center pt-5" method="post" action="/login">

            <!-- email input  -->
            <div class=" bg-sky-100 w-[20rem] border-2 border-zinc-600 rounded-2xl" id="email">
                <input class="outline-none w-[20rem]  rounded-2xl px-5" placeholder="Enter Email" type="email" name="email" id="">
            </div>
            
            <!-- password input -->
            <div class=" bg-sky-100 w-[20rem] border-2 border-zinc-600 rounded-2xl" id="password">
                <input class="outline-none w-[20rem] rounded-2xl px-5" placeholder="Enter Password" type="password" name="password" id="">
            </div>
     
            <!-- submit btn  -->
             <div class="subtn bg-sky-600 w-20 ">
                  <button class="w-20 px-3 hover:cursor-pointer">login</button>
             </div>
        </form>
    </div>
</body>

</html>
```

---
### now lets handle the login user in backend  

```js 

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
```

### logout user 

```js 
// how to logout the user 
app.get("/logout", (req, res) => {
  // set the value " " blank string 
  res.cookie("My_Token", "")
  res.send("user logged out ")
})

```

> ** That's alll about today hamne kafi kuch dekha samja or code kiya... **