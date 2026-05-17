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
