const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const port = 3000

// bcrypt use 1) import 
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



// const cookieParser = require("cookie-parser")

// using  the cookieparser
app.use(cookieParser())

// 1) how to set cookie 
app.get('/', (req, res) => {
    //   res.send('Hello backend !')
    // first cookie() mein value set krni hai pahli values jo ki mera "name" then the value jo ki mera "coderx" name hai 
    // res.cookie("name", "coderx")
    res.send("done")
})

// new route 
app.get("/new", (req, res) => {
    res.send("this is the new route ")
    //  console.log(req.cookies)
})


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
  
// new route 
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

// app.get("/read", (req,res)=>{
//     // how to read the token data from token in the server backend
//    // using the verify() method 
//     let data = jwt.verify(req.cookies.token, "this is the secret") 
//     console.log(data)
// })

app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
