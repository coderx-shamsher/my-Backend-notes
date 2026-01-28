<!-- # Today we see k ek web pov say kaise curd perform krna hai using the mongodb ham ejs ko use krege so lets setup first  -->

## setup your npm 
``` bash

   npm init -y 
 # change the index.js file name jo bhi apki server file ka name apne rakha hai 

   # and then install express 
    npm install express 
   
   # and install the mongoose package 
   npm install mongoose  
```

## setup the express app 
create a js file and paste the default code 
```js

const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello this is backend day12 ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

```

- now add the parsers for json and urlendcoded forms 
```js
const express = require('express')
const app = express()
const port = 3000

// just we setup the parsers 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('Hello this is backend day12 ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


```
- now setup the static files handler middleware
- also checkout the express offical web-docs to use the code 

```js 

const express = require('express')
const app = express()
const port = 3000

// 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// now we adding the static files handler middleware 
app.use(express.static('public'))
// hamne public folder ka name pass kiya hai or es folder ko create krna jaruri hai 

// app.use(express.static(path.join(__dirname, '/public')))
// we can also use this line or path ko require kr lyna ager module type use kr rahe ho to yeh work nhi krega note that..

app.get('/', (req, res) => {
    res.send('Hello this is backend day12 ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
- create a folder name public 
- ess folder main vo files or images etc hote hain jo publically show krne hote hain hamare main html page ka sath 

```js 
const express = require('express')
const app = express()
const port = 3000

// data parsers 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// static files middleware 
app.use(express.static('public'))

// setup the view engine 
app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.send('Hello this is backend day12 ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


```

- to use the ejs make sure you install the ejs package 
```bash
 
  npm install ejs 

```

- now make folder to use ejs engine name views 
- make new file name index.ejs 

```js 
  
  app.get('/', (req, res) => {
      // res.send('Hello this is backend day12 ')
      // now ejs pages ko render krne k liye add this line 
      res.render('index.ejs') // ejs file name or folder path dene k jarurat nhi hai 
  })

```
- hamm server side rendering kr rahe hai with help of ejs 

- now to use tailwind css go to tailwind website and copy and paste this script link into your ejs file to use it we not setup the tailwindcss 
```html

  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

```
- if this not work then setup the cli tailwindcss 

```sh 

 npm install tailwindcss @tailwindcss/cli

```
- now create a input.css file inside your public/styles folder 

```css

@import "tailwindcss";

```

- now add the command how watch the every changes 

```sh 
# make sure change the location or path of your input file and set the path of output file 
npx @tailwindcss/cli -i ./public/styles/input.css -o ./public/styles/output.css --watch

```

- now add the output.css into your ejs file 



* and also create a script to run using the npm 

> create folder name modules then create user.js file and 
```js 
// add the mongoose 
const mongoose = require("mongoose")

// connecting with the mongoose with mongodb this is the format for now lets follow for now 
mongoose.connect("mongodb://localhost:27017/testapp")

// add Schema 
// eh kuch info ham users say ly rahe hai 
const my_users_Schema = mongoose.Schema({
       
     username : String,
     password : String,
     email    : String

}) 

// export and use model
// and model name string value mein pass kiya or then , schema pass kiya hai jo maine create kiya hai 

// module.exports = say export kiya tan k use use kr sakun in the server.js file main 
module.exports =  mongoose.model('users', my_users_Schema)

```
- import in server.js file 
```js 
// add this line into your app server file 

//adding the model 
const usermodel = require("./models/users.js")

 ```



> now hamne ek simple web app create kri hai jis me ham users create kr skate hai read kr skte hain using the view engine ejs 

> create files index.ejs in the views folder and code the uI of your home page 

```html code here in ejs file 

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- <link rel="stylesheet" href="/styles/style.css">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script> -->
    <link rel="stylesheet" href="/styles/output.css">

</head>

<body>
    <header class="w-full bg-sky-600 text-white h-[4rem] ">
        <ul class="flex justify-end gap-10 pr-4 text-2xl  font-semibold pt-3">

            <a href="/">
                <li>Home</li>
            </a>
            <a href="/create">
                <li>Add_Users</li>
            </a>
            <a href="/read_users">
                <li>Read_Users</li>
            </a>

        </ul>

    </header>
</body>

</html>
```

> now add the route in server 
```js 


// get method route /create to see the add user ejs file 
app.get('/create', (req, res) => {
  res.render("add_users.ejs")
  // console.log('this is users path')
})

``` 
> now create a file name add_users.ejs in the views folder and style the form of adding user user create krn k liye user ko username , password and email send krna hoga .. so create a simple uI and create form of adding users 

```html code of adding user form 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/styles/output.css">
</head>

<body>
    <header class="w-full bg-sky-800 text-white h-[4rem] ">
        <ul class="flex justify-end gap-10 pr-4 text-2xl  font-semibold pt-3">
            <a href="/">
              <li>Home</li>
            </a>
            <a href="/create">
                <li>Add_Users</li>
            </a>
            <a href="/read_users">
                <li>Read_Users</li>
            </a>

        </ul>

    </header>

    <!-- form body coder  -->
    <div class="form bg-slate-700 w-full h-100 flex">

        <h2 class="text-3xl tracking-tighter text-amber-50 ml-10 pt-5"> Create User </h2>

        <!-- // set the action /create jis route pr data get krna hai method mein post keo k post method say he ham data ko send krte hain server tak  -->
        <form action="/create" method="post" class="p-10 relative ">
            <!-- input username -->
            <div class="username block ml-[12rem]  mt-3 border-2 border-yellow-700 w-[30vw] rounded-2xl">
                <input class="text-stone-50 w-[23vw] outline-hidden px-5 py-2 " type="text" name="username" id="" required
                    placeholder="Enter you username">
            </div>

            <!-- password input -->
            <div class=" password block ml-[12rem] mt-3 border-2 border-yellow-700 w-[30vw] rounded-2xl">
                <input class=" text-stone-50 w-[23vw] outline-hidden px-5 py-2 " type="password" name="password" id=""
                    placeholder="Enter your password "  required>
            </div>

            <!-- email input  -->
            <div class=" password block ml-[12rem] mt-3 border-2 border-yellow-700 w-[30vw] rounded-2xl">
                <input class="text-stone-50 w-[23vw] outline-hidden px-5 py-2 " type="email" name="email" id=""
                    placeholder="Enter your email " required>
            </div>

            <!-- submit input -->
            <div class="submit_input bg-green-700 rounded-2xl w-[11rem] hover:transition-all duration-100     hover:border-2 absolute left-82 mt-10">
                <input class="px-6 py-2 hover:text-sky-100  " type="submit" value="Create New User">
            </div>

        </form>
    </div>

</body>

</html>

```
> set the form action jo ki route hota hai like maine set kra hai /create add add_user kuch bhi rakh sakte ho  or method post hona chaahie.. 

- server code here 
```js
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

```

> now lets create a read user page with route first lets create route 
```js 

// now read the users 
// make async function 
app.get('/read_users', async (req, res) => {
  // using the find() sare users get kr sakte hain 
  let users = await usermodel.find()

  // now ham users mein allread ko pass kr kr read_users ejs file mein as parameters send kr rahe hain 
  res.render("read_users.ejs", { users })
})

```
> now create ejs file 
>NOTE all the ejs file make sure your create inside the views folder 

```html code 
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="/styles/output.css">
</head>

<body>
  <header class="w-full bg-sky-600 text-white h-[4rem] ">
    <ul class="flex justify-end gap-10 pr-4 text-2xl  font-semibold pt-3">

      <a href="/">
        <li>Home</li>
      </a>
      <a href="/create">
        <li>Add_Users</li>
      </a>
      <a href="/read_users">
        <li>Read_Users</li>
      </a>

    </ul>

  </header>

  <div class="bg-slate-300 h-[150vh] ">
    <h2 class="text-yellow-600 text-5xl font-semibold pl-10 pt-10 mb-10"> All Users</h2>

    <div class="userscard flex gap-3 flex-wrap pl-5">

      <% if (users.length > 0) { %>

      <% users.forEach(users => { %>
      <div class="user w-[20rem] h-[15rem] bg-zinc-400 p-6 rounded-lg pl-5  relative">

        <div class="img ml-10 bg-zinc-600 w-[12rem] h-20 rounded-[18px] px-5 py-2 ">
          <div class="pt-5 pl-15">🙎🏼‍♂️</div>
        </div>

        <div class=" username text-xl tracking-tighter font-semibold text-white mt-2 flex justify-center ">
          <div class="">
            <%=users.username %>
          </div>
        </div>

        <div class="email text-blue-800 text-18 font-medium tracking-tighter  mt-2 flex justify-center">
          <%=users.email %>
        </div>

        <section id="btn_s" class="flex justify-between gap-30 absolute bottom-0 mb-2">
          <div class="editbtn ">
            <button>
              <a href="/edit/<%= users._id %>">Edit User</a>
            </button>
          </div>

          <div class="deletebtn ">
            <button class="text-red-700  hover:translate-y-[2px] hover:transition-all hover:font-bold ">
              <a href="/delete/<%= users._id %>"> Delete User</a>
            </button>
          </div>

        </section>

      </div>

      <% }); %>
      <%  }  else { %>
      <div class="text-stone-400 font-semibold text-3xl mt-3 pl-5">
        <div> No Users.....</div>
      </div>
      <% } %>




    </div>

  </div>
</body>

</html>

```

* day 12 mein bs itna he code krna hai next adding edit and delete features in app

> Now -- date 27/1/26  day 13 lets add features 
- first add the edit feature in app  
```html
 <div class="editbtn ">
            <button>
              <a href="/edit/<%= users._id %>">Edit User</a>
            </button>
          </div>
<!-- first add the href link path jis par ham ek page render krne vale hai vo /edit/ userid hoga or id jise maine set krni hai path mein vese he set krni hogi and now ese set krne k bad lets go in the server js   -->
```

```js 

// get method route /edit/:userid  for read the and update, render  the page name edit  
app.get('/edit/:userid', async (req, res)=>{
    // destructuring 
    let user = await usermodel.findOne({_id:req.params.userid})
    // let users = req.params.userid
    console.log(user)
    res.render('edit.ejs', {user})
    // res.end("this is the update route ")
})

```

> now lets create the edit ejs file and just paste the add users form code or kuch changes kr k use ek update user form ban lo 

```html 

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/styles/output.css">
</head>

<body>
    <header class="w-full bg-sky-800 text-white h-[4rem] ">
        <ul class="flex justify-end gap-10 pr-4 text-2xl  font-semibold pt-3">
            <a href="/">
              <li>Home</li>
            </a>
            <a href="/create">
                <li>Add_Users</li>
            </a>
            <a href="/read_users">
                <li>Read_Users</li>
            </a>

        </ul>

    </header>

    <!-- form body coder  -->
    <div class="form bg-slate-700 w-full h-100 flex">

        <h2 class="text-3xl tracking-tighter text-amber-50 ml-10 pt-5"> Update User </h2>

        <!-- // set the action /update/userid or set the user._id in ejs format  jis route pr data get krna hai method mein post keo k post method say he ham data ko send krte hain server tak  -->
        <form action="/update/<%=user._id %>" method="post" class="p-10 relative ">
            <!-- input username -->
            <div class="username block ml-[12rem]  mt-3 border-2 border-yellow-700 w-[30vw] rounded-2xl">
                <input class="text-stone-50 w-[23vw] outline-hidden px-5 py-2 " type="text" name="username" id="" required
                    placeholder="Enter you username" value="<%= user.username %>">
            </div>

            <!-- password input -->
            <div class=" password block ml-[12rem] mt-3 border-2 border-yellow-700 w-[30vw] rounded-2xl">
                <input class=" text-stone-50 w-[23vw] outline-hidden px-5 py-2 " type="password" name="password" id=""
                    placeholder="Enter your password " value="<%=user.password %>" required>
            </div>

            <!-- email input  -->
            <div class=" password block ml-[12rem] mt-3 border-2 border-yellow-700 w-[30vw] rounded-2xl">
                <input class="text-stone-50 w-[23vw] outline-hidden px-5 py-2 " type="email" name="email" id=""
                    placeholder="Enter your email " required value="<%= user.email %>">
            </div>

            <!-- submit input -->
            <div class="submit_input bg-yellow-500 rounded-2xl w-[11rem] hover:transition-all duration-100     hover:border-2 absolute left-82 mt-10">
                <input class="px-10 py-2 hover:text-sky-600  " type="submit" value="Update User">
            </div>

        </form>
    </div>

</body>

</html>

```

> now the update route in server with the update operation with 
``` js 


// post /update route to update user and redirect to the read user route 
app.post('/update/:userid', async (req, res)=>{
  // destructuring   
  let {username, email , password} = req.body
     // update the user using the findandupdate method     
  let updated = await usermodel.findOneAndUpdate({_id:req.params.userid},{username,password,email},{new:true})
  res.redirect("/read_users")
    //  console.log(username,email,password)

})

```

> now lets add the delete feature make sure you add the route in the delete btn like this 

``` html 
<div class="deletebtn ">
            <button class="text-red-700  hover:translate-y-[2px] hover:transition-all hover:font-bold ">
<!-- add the route name /delete -->
<a href="/delete<%= users._id %>"> Delete User</a>
            </button>
          </div>
```

> now move to server js 

```js 

// delete/:id , route us id ko get krna params ki help say and then add the opration  
app.get('/delete/:id', async (req, res) => {
  // let id = req.params.id
  let users = req.params.body
  let deleteuser = await usermodel.findOneAndDelete({ _id: req.params.id })
  console.log(users)
  res.redirect("/read_users")
})

```

> NOTE  code krte krte he app ko test kte kraho 
> thats all about how to use the app server with database server using the mongoose 

