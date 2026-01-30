<!-- Authentication or Authorization -->
### Authentication --> user koi validate krna k vo kon hai for example , jab bhi app kisi app koi use krne jate ho to app ap say login mangta hai bhi username yan id mangata hai with password ! to yeh hai  *Authentication*

### Authorization --> means ager vo user bole k muje sare products show kro then vo authenticate krta hai (app) then ager user bole k ab main enki prices change krne vala hun to app yeh dekhega k ap jo authenticate to ho but kiya apko permissions hai k app admin vale tasks perform kr payo ? yeh hai athorization means check krna k user kis kis kam k liye authorizated hai or us hisab say permissions dena ..  


## we need to learn this topics
 
> 1) how to set cookie 

> 2) bscypt kaise use karte hain for password encryption and decryption 

> 3) jwt kya hai or jwt mein data kaise store kerein and baahar nikaale 


## setup the npm 
```zsh 

 npm init -y 
 
 npm install jsonwebtoken bcrypt

```

> 1) how to set cookie 
- create a appserver.js 

``` sh

npm install express 

```

> create your express server 

``` js 

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

> to set cookie do this 

```js 
// 1) how to set cookie 
app.get('/', (req, res) => {
//   res.send('Hello backend !')
// first cookie() mein value set krni hai pahli values jo ki mera "name" then the value jo ki mera "coderx" name hai 
//  thats how to set cookie
    res.cookie("name", "coderx")
    res.send("done")
})

```

> how to check k cookie set ho gyi hai so --> go to browser then localhost pr ek ! icon show hoga ji par click kr k app cookie set hai show hogyi but use browser show nhi krta or edit bhi nhi kr sakte , install ok extension name -- editthiscookie

> hamne kiya kiya hai k server say browser pr kuj data store krvaya .. that is the cookie ab jab bhi server pr req jayegi kisi bhi route 

> now ager new route set krte ho or us pr jate ho to ap ko same cookie dekhne ko milti hai .. 

> or ham ese backend mein get kr sakte hain read kr sakte hain.. 
first install a package 

``` sh 
npm install cookie-parser

``` 
- then add this line
```js 

const cookieParser = require('cookie-parser')

// using  the cookieparser
app.use(cookieParser())


// new route 
app.get("/new", (req,res)=>{
     res.send("this is the new route ")
// -->  and also add this line in your route 
 // that's how to read cookie
console.log(req.cookies)
})

```


> 2) bscypt kaise use karte hain for password encryption and decryption 
- concept is --> 
   apka password hai  --> password1234344   to ham ese ase store nhi kr sakte keo k ager data breach houya to apka password readable hai to ham ese 

   encrypt krk store krte hain 
   encrypt --> means plan text ko kise asse format mein transform krna jo human readable na ho .. 
   or yeh kam kuch algos ki help se krte hain 

 or using  the bcrypt ham ese perform krsakte hain 

 > goto the npm bcrypt official website 

 > what we learn k kisi bhi password ko encrypt kaise kre.. using the bcrypt 
```js 
 
// bcrypt use 1) import 
const bcrypt = require("bcrypt")

// 2) 

app.get("/encrypt", (req, res) => {
    //   cp this from bcrypt website  
    let myPlaintextPassword = "this_is_my_password"

    let saltRounds = 10
    res.send("check your server console")
    console.log()
    console.log(`THIS IS THE PLAIN TEXT -->  ${myPlaintextPassword}`)
    // salt ek rendom string hoti hai 
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            // Store hash in your password DB.

            // we just console the hash 
            console.log()
            console.log(`THIS IS THE ENCRYPTED HASH --> ${hash}`)
        });

    });

})



// ab es route pr jao or server console pr password --> hash mein convert hojayega.. check the console
```
> or that's how convert the plain text into hash (encrypted)


>> how to decrypt but bcrypt mein  ham compair krte hain lets see what i mean 

``` js 
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});

```
- now hoga kiya ? k ek example lyte hain , ap ne login kiya with passsword --> password1234 , server me apki password ko encrypt kiya or jo string create hogi use using this bcrypt compare() method compare kiya ager hash string match hoyi to ap ko logined access milta hai 

``` js  check my server code 

// new route 
app.get('/decrypt', (req, res) => {
    // Load hash from your password DB.
    let myPlaintextPassword = "this_is_my_password"

    let saltRounds = 10
    res.send("check your server console")
    console.log()
    console.log(`THIS IS THE PLAIN TEXT -->  ${myPlaintextPassword}`)
    // salt ek rendom string hoti hai 

    bcrypt.genSalt(saltRounds, function (err, salt) {

        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            // Store hash in your password DB.

            // we just console the hash 
            console.log()
            console.log(`THIS IS THE ENCRYPTED HASH --> ${hash}`)
           
            bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
                if (result) {
                    console.log("Welcome admin...")
                    // result == true ager condition true hogo to console pr yeh print hoga 
                }

            });

        });
        // console.log(hash)

    })

})

```
> ager user password say jo string generate hogi vo string ager hammari string say match hogi to console pr welcome admin print hoga.. 


> 3) jwt kya hai or jwt mein data kaise store kerein and baahar nikaale 
--> check out the official web jwt json web token  and then --> go to libraries and then filter the nodejs and goto this git repo  
>                  << https://github.com/auth0/node-jsonwebtoken >> 


``` js 
// add in your server 
const  jwt = require('jsonwebtoken');

```

> now how to use this 

```JS 

app.get("/token", (req,res)=>{
     // lets create a token string using the jwt 
     // token create krne k liye ham email use krte hain keo k eh unique hoti hai 
     // ham ek sign() method use , es method mein hame ek object mein payload yan object set krte hain jo ki hamne ek email  set kiya hai then most important , ek secret key yan ek string pass krte hai jis ki help say , jis ki help say ! hamari email ek token (string) mein convert hoti hai 

     /** or yeh secret bhot important hai k esa ho jo hack na ho sake ! ager secret hacker ko mil gya to hamara data hacker decrypt kr skta hai..  */
     let token = jwt.sign({email: "coderx@gmail.com"}, "this is the secret")
     
     // now you know how to set the cookie , yan rakhna k yah token he ham cookie mein set krte hain jis say hammari server ki hamme na yaad rakhne vali problem solve hoti hai 
     // set the token using cookie 
     res.cookie("Mytoken",token)
     res.send("done")
     
      // how to read the token data from token in the server backend
   // using the verify() method 
     let data = jwt.verify(token,"this is the secret")
     console.log(data)
    // that's how we can get the data from the jwt using the 
})

```
