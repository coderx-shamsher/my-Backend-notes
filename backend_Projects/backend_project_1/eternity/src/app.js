const express = require('express')
const app = express()
const port = 3040

// require te mongoose connection 
const mgdb = require("../config/mongoose-connection")

// router require 
const User_Router = require("../routes/Users_Router")
const Admin_Router = require("../routes/Admins_Router")
const  Product_Router = require("../routes/Products_Router")

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

// setup router using use() function

// users route
app.use("/users",User_Router)

// admins route
app.use("/admins",Admin_Router)

// products route
app.use("/products",Product_Router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
