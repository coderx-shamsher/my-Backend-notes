# *mini project 1*

## setup the npm 

```sh 

npm init -y 

```
## install express js 
```sh 
npm install express 
```

- Create js file 

## install some needed packages

```sh 
# install mongoose 
npm install mongoose  bcrypt cookie-parser jsonwebtoken

```

## make models folder 
- make user.js file 

## Create views folder to use the server side rendering with ejs 
- Install ejs 
```sh
npm install ejs 
```

- Create Index.ejs file inside the views folder 

- Express server code setup in server file 
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

## create model user model using the mongoose 
``` js 
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

```
--- 

- require in your server code 
```js 
// user model 
const usermodel = require("./Models/user")
```

### setup the view engine ejs 
- yeh setup server code mein krna hai 

```js 

// setup the view engine ejs 
app.set('view engine', 'ejs')

```

## setup the data parser and cookie parser
```js 
// json data parser 
app.use(express.json())

// form data parser 
app.use(express.urlencoded({extended:true}))


// cookie parser  // cookies ko set or get krne k liye 
app.use(cookieParser())

```

### now setup the tailwindcss 
```sh 
npm install tailwindcss @tailwindcss/cli
```

- Create a one public folder for static file and also setup the static middleware 
- now setup the static file middleware in server code 
```js
// public static files
app.use(express.static('public'))
```

- us public folder main ek styles folder bana kr us mein ek src folder bana k then src mein ek input.css file create kro or ess line ko paste kro jis ki help say ham talwindcss ko use kr sakte hain 
```css
@import "tailwindcss";
```

- now open new terminal to run this command yeh ek server ki tranh hai tailwind server 
```sh 
npx @tailwindcss/cli -i ./public/styles/src/input.css -o ./public/styles/src/output.css --watch
```

- now just add the output.css into your ejs files and use the tailwindcss 
- create a form and style it now 
   1) make sure k jo schema hamne set kra hai vooh sab values ham form mein set kren 

## make a index ejs file and style a form 
``` html < my index ejs code here >
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mini_project_1st</title>
    <link rel="stylesheet" href="/styles/src/output.css">
</head>
<body>
       <div class="w-full min-h-screen bg-slate-600 text-white">
              <!-- forms -->
               <h2 class="pt-5 pl-5 text-2xl "> Create Account </h2>
             <section class="w-[20rem] h-[22rem]  bg-zinc-400 ml-[12rem] rounded-3xl">
                   <form action="" method="post" class="flex flex-col justify-center items-center">
                         <!-- username inpu  -->
                         <div class="pt-5 " id="user_name_input">
                              <input class="px-3 py-3  border-2 border-b-amber-800 border-t-amber-500 border-l-black border-r-amber-200 outline-none rounded-2xl" type="text" name="username" id="" placeholder="Enter Your Username">
                         </div>

                         <!-- password input -->
                          <div id="password_input" class="pt-5 ">
                             <input class="px-3 py-3 border-2 border-b-amber-800 border-t-amber-500 border-l-black border-r-amber-200 outline-none rounded-2xl"  type="password" name="password" id="" placeholder="Enter Your password">
                          </div>

                          <!-- Email input -->
                           <div id="email" class="pt-5  ">
                               <input class="px-3 py-3 border-2 border-b-amber-800 border-t-amber-500 border-l-black border-r-amber-200 outline-none rounded-2xl"  type="email" name="email" id="" placeholder="Enter Your Email">
                           </div>

                           <!-- age input -->
                            <div id="Age" class="pt-5 ">
                                 <input class="px-3 py-3 border-2 border-b-amber-800 border-t-amber-500 border-l-black border-r-amber-200 outline-none rounded-2xl"  type="number" name="Age" id="" placeholder="Enter Your Age">
                            </div>

                            <!-- submit input  -->
                             <div id="Submit_btn" class="mt-3 bg-amber-500 w-[8rem] rounded-3xl hover:translate-x-0.5 hover:translate-y-0.5">
                                  <input class="px-4.5 py-2 hover:cursor-pointer" type="submit" value="Submit Form">
                             </div>
                     </form>
             </section>
       </div>
</body>
</html>
```
---
## lets render the index ejs page 
```js 
app.get('/', (req, res) => {
   res.render('index.ejs')
})
```
---
## now let create a route to handle the request data of the create user
```js 
// create use operation 
// ham data ko post method say he send krte hain forms or jab bhi koi sensitive info server pr send krni ho.. 
app.post('/register', async (req,res)=>{
   // first check kro k user already exist to nhi krta same gmail say 
       
    const {email,username,password,age} = req.body
    let user_exist = await usermodel.findOne({email})
    // console.log(exist)
    
    // ager user already hai to yeh line of code run hoga .. 
    if(user_exist){
        return res.send("User if already Registered !! ")
    }

 // > encryption in the password and create the user inside this function 
   
   // lets encrypt the password using the bcrypt 
    
    let rounds = 10   // setup the rounds for create the hash 
    
    bcrypt.genSalt(rounds,(err,salt)=>{
         
         bcrypt.hash(password,salt,(err,hash)=>{
               //   console.log(hash) this line for only the checking of the hashes 
             
            // create the use now 
            let user = await usermodel.create({
                username,
                password : hash,
                email,
                age

            })
             
               // jwt token creation 
            // creating secret key for jwt 
            let secretkey = "My_Secret_Key"
            let token =  jwt.sign({email:email,userid:user._id}, secretkey)           
             
            // now lets set the token with cookie and lets send to the front end 
            res.cookie("token",token)

            res.send("Us3r is r3gisT3r3d")

         })


    })
    
    
})
```
---
## create post model in the models folder and this is the code 
```js 
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

```
> note require the post model and jwt in your server code if your are using 
---
## create a login route 
```js 

// login route 
app.get("/login",(req,res)=>{
    //render the login ejs page 
    res.render("login.ejs")
})
```
---
## create a login ejs file and create login page and style a bit 
```html this is the code of the login page  
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>mini_project_1st</title>
  <link rel="stylesheet" href="/styles/src/output.css">
</head>

<body>
  <div class="w-full min-h-screen bg-slate-600 text-white">
    <!-- forms -->
    <h2 class="pt-5 pl-5 text-2xl "> Login Your Account </h2>

    <section class="w-[20rem] h-[22rem]  bg-zinc-400 ml-[12rem] rounded-3xl mt-2.5">

      <form action="/login" method="post" class="flex flex-col justify-center items-center pt-8">

            <!-- Email input -->
            <div id="email" class="pt-5  ">
                <input class="px-3 py-3 border-2 border-b-amber-800 border-t-amber-500 border-l-black border-r-amber-200 outline-none rounded-2xl" type="email" name="email" id="" placeholder="Enter Your Email">
            </div>
            
            
            <!-- password input -->
            <div id="password_input" class="pt-5 ">
                <input class="px-3 py-3 border-2 border-b-amber-800 border-t-amber-500 border-l-black border-r-amber-200 outline-none rounded-2xl" type="password" name="password" id="" placeholder="Enter Your password">
            </div>
            

            <!-- submit input  -->
            <div id="Submit_btn" class="mt-8 bg-sky-700 w-[6rem] rounded-3xl hover:translate-x-0.5 hover:translate-y-0.5">
                <input class="px-7 py-2 hover:cursor-pointer" type="submit" value="Login">
            </div>
    
      </form>

    </section>

  </div>

</body>

</html>
```
---
## now lets handle the request of login form using post method 
```js 
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

            res.send("Welcome to profile sir.....")
         }
         else {
            // alert("Something is wrong....")
            res.redirect("/login")

         }

      })
   }

})
```
---
## let create logout route 
```js 
// logout route 
app.get("/logout",(req,res)=>{
    res.cookie("token","")
    res.redirect("/login")
})
```
> note also check the cookie token ager token mein value nhi hai to mean app logout ho gye hain ... 
---

## create a protected routes to check first a user is logged in or not 
```js 
// ek middleware function to check k user login hai k nhi 
// protected route middleware
function isloggedIn(req, res, next) {
   if (req.cookies.token === "") {
      res.send("You need to login ......!!!......")
   } else {
      let secretkey = "My_Secret_Key"
      let data = jwt.verify(req.cookies.token, secretkey)
      
      // data ko ham req.user, means user parameter mein store kr rehain hain.. jise ham use kr sakte hain next 
      req.user = data
      next()  
   }
}
```

### now create a profile route 
```js 
// profile route
// add the middleware into your route jise bhi protected bana hai  
app.get("/profile",isloggedIn,(req,res)=>{
     console.log(req.user_data)
     res.send("Welcome to your profile...")
})
```
make sure you check the working now , login kro , then see the response , then logout kro or profile route pr jao

>>> NOTE that's all about mini project1 practice today i done this date 12/2/26 thu 


>>> Today part 2 of mini project 
##  part 2 started now 

### > create a new profile.ejs file and set this file to the render function 
```html 
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>mini_project_1st</title>
  <link rel="stylesheet" href="/styles/src/output.css">
</head>

<body>
  <div class="w-full min-h-screen bg-slate-600 text-white">
    <!-- forms -->
    <h2 class="pt-5 pl-5 text-2xl "> Profile </h2>

    <section class="w-[20rem] h-[22rem]  bg-zinc-400 ml-[12rem] rounded-3xl mt-2.5">
        <div class="flex flex-col justify-center items-center pt-8">
            <h2 class="text-2xl">Welcome to your profile...</h2>
        </div>

    </section>

  </div>

</body>

</html>
```

### > now lets add the profile page 
```js 
app.get("/profile",isloggedIn,(req,res)=>{
     console.log(req.user_data)
   //   res.send("Welcome to your profile...")
   res.render("profile")

})
```
### > also change the isloggedin function 

```js 
// res.send("You need to login ......!!!......")
      res.redirect("/login")
// redirect krna hai login route pr keo k ager ap logged in nhi ho to apko login krna pardega tabbi he profile show hogi.. 

```


### also change the login route and handle the login request 
```js 

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

```

> now ager bin login k ham profile route pr janne ki kosis krte hain to hamne login route pr redirect kr diya jata hai... 

> **main chaahta hun ki jo user logged in hai usi detail bhi show ho**
```js 
app.get("/profile",isloggedIn, async (req,res)=>{
   //   res.send("Welcome to your profile...")
   console.log(req.user_data)

   // first hamne usemodel k method findOne say user ki find kiya hai 
   let user = await usermodel.findOne({email:req.user_data.email})
   // then use profile send kiya hai with the user data
   res.render("profile",{user:user})

})
```
###  *profile mein  yeh code add kro *
```html 
  <h2 class="pt-5 pl-5 text-2xl "> 
        <span class="font-bold text-2xl text-yellow-500">Hello! 👋</span> 
        <span class="font-mono  text-2xl text-sky-400">
            <%= user.username %> 
        </span>
         </h2>
```

> now reload the profile !! 

### maine profile page ko style kiya hai or yeh raha code 
```html 
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>mini_project_1st</title>
  <link rel="stylesheet" href="/styles/src/output.css">
</head>

<body>
  <div class="w-full min-h-screen bg-slate-600 text-white">

    <header class="w-[54.3rem] pb-3.5 pt-3.5  bg-sky-700 flex justify-end gap-10 pr-5 list-none ">
      <a href="/" class=" bg-fuchsia-600  w-20 rounded-2xl px-[17px] transition-all hover:translate-1 duration-150 hover:font-semibold pt-1 pb-1"> 
        <li>Home</li>
      </a>
      <a href="/login" class="bg-fuchsia-600 w-20 pt-1 pb-1 rounded-2xl px-[19px] transition-all hover:translate-1 duration-150 hover:font-semibold ">
        <li>Login</li>
      </a>
      <a href="/logout" class="bg-fuchsia-600 w-20  rounded-2xl px-[14px] transition-all hover:translate-1 duration-150 hover:font-semibold pt-1 pb-1">
        <li>Logout</li>
      </a>
    </header>

    <h2 class="pt-5 pl-5 text-2xl ">
      <span class="font-bold text-2xl text-yellow-500">Hello! 👋</span>
      <span class="font-mono  text-2xl text-sky-400">
        <%= user.username %>
      </span>
    </h2>

    <div class="mt-1.5 mb-1 text-amber-100 ml-8">
      <p> You can create a new post. </p>
    </div>

    <section class="w-[35rem] h-[30rem]  ml-[8rem] rounded-3xl mt-2.5">

      <form action="/create_post" class="relative">
        <textarea class="resize-none w-[30rem] h-[12rem] bg-zinc-700 outline-none mt-6 ml-8 pt-1  rounded-[24px] px-5 "
          name="content" id="" placeholder="Write what's on your mind ? "></textarea>

        <!--submit the post -->
        <input class="bg-emerald-700 w-[10rem] h-8 rounded-3xl ml-[21rem] " type="submit" value="Create New Post">

      </form>

      <div class="w-[10rem] h-[2rem] font-semibold  ml-10 bg-rose-600 flex justify-center items-center rounded-3xl absolute top-[23.50rem] ">
             <a href="/posts">Your All Posts.</a>
      </div>

    </section>
     
     
  </div>

</body>

</html>
```

##  create new file posts.ejs
```html

```
##  posts route handle in server  
```js route for posts
// posts route handle 
app.get("/posts",async (req,res)=>{
   res.render("posts")
})
```
## handle the post create route 
jab post create hogi to us request ko handel kro 
```js

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

```

## change the profile route with this code 
```js 
app.get("/profile",isloggedIn, async (req,res)=>{
   //   res.send("Welcome to your profile...")
   console.log(req.user_data)

   // first hamne usemodel k method findOne say user ki find kiya hai 
   let user = await usermodel.findOne({email:req.user_data.email})
   // then use profile send kiya hai with the user data

   res.render("profile",{user:user})

})
```

## add this route or maybe update this code 
```js 

// to get or render the posts ejs  page....  
app.get("/posts",isloggedIn,async (req,res)=>{
   // now hame user ki post ki object id show ho rahi hogi now ham uski posts ko kaise show krvanye ? 
   let user = await usermodel.findOne({email:req.user_data.email}).populate("post")
   // posts ko populate kiya hai  make sure 
   res.render("posts",{user})

})
```

## this is new posts ejs code how to render real data and post content of our users 
```html
<!-- ager latest post upper show krni ho to use the reverse() method with foreach loop -->
 <section id="all_posts" class="flex flex-wrap gap-1.5">
  <!-- ager nhi to reverse() method ki hata dena  -->
      <% user.post.reverse().forEach(post=>{ %>
        <div id="post_container">
            <section class=" border-2 border-black rounded-[10px] font-medium w-[40vw] h-[60vh] mt-2 ml-4  bg-slate-900 relative">
                <div class="post py-1.5  px-3">
                    <h2 class="text-blue-400 font-bold "><%= user.username %></h2>
                    <h2 class="text-blue-400 font-normal text-[13px] absolute bottom-0 right-2">@<%= user.email %></h2>
                    <p class="tracking-tight text-amber-50 font-medium text-[15px] mt-1.5"><%= post.content %> </p>
                </div>

            </section>
            <div id="btns" class="flex gap-12 mt-3 ml-[14rem]">
                <div class="bg-red-600 w-10 rounded-md px-1.5 ">Like</div>
                <div class="bg-sky-600 w-10 rounded-md px-1">Edit</div>
            </div>
        </div>
        <% }) %>
    </section>

```

> now in part 2 hamne kuch features code kiye or notes create kiye.. in md that's all about today read the md file to see what i done today... 

