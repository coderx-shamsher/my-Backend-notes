import chal from 'chalk'
import express from 'express'
// import path, {dirname, join } from 'path'

// const express = require('express')
const app = express () 
const port = 4000 
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const dirname = path.dirname
// const path = path


// this is we set up the parsers 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname, 'public')));

// 
app.use(express.static('public'))

// set the ejs 
// app.set('view engine','ejs')

app.get('/',(request,response)=>{
//    response.send("hello this is fucking backend... ")
// now jo views folder wich ejs file hai jo bhi files hai unko res.render() k sath render kr sakte han on the specific route mera / route hai now  
   response.render("index.ejs")  // .ejs bhi type krne krna or na he path dena hai yeh sb express khud find kr lyega in the views folders
  
})

app.get('/users',function(req,res){
     res.send("this is users route ")
})

app.get('/users/:usename',function(req,res){
      let username = req.params.usename // handling the params
     res.send(`Welcome ! ${username}`)
})
app.get('/users/:usename/:pass',function(req,res){
      let username = req.params.usename // handling the params
      let pass = req.params.pass
     res.send(`Welcome ! ${username} and ${pass}`)
})

// app.listen(chal.rgb(75, 204, 204)(`The app running at the port => ${port} on the localhost`)) // this method is wrong use this ==> 
app.listen(port,function(){
     console.log(chal.red("App running on the localhost port number =>"),chal.yellow(port))   
})
// console.log(dirname)