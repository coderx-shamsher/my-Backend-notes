// 1) npm init -y 
// 2) npm install express
// now go to the offical site of express and get the basic express app template of hello world and paste here .. 

// or we using the require syntax if you using the module type then do litte bit changes into a code... 
// const express = require('express')
// const chalk = require('chalk')
import express from 'express'
import chalk  from 'chalk'
const app = express()
const port = 4000

// so now this app.get('/') yeah ek route hai jo / means home route hai or ham bhot sare routes create kr sakte hain ... 
// example we create more then one routes jo k / to bad type krn te show hunde ne ager server wich us name da koi route hovega tn show hovega...

// app.get() get ek http method hai we learn about it more .. 
/** Syntax of app 
 *  
 *  app.get(route,request-handler)
 *  requesthandler ek middleware hai  or ek function hota 
 *    
 *  app.get('/', (request,response)=>{
 *     
 *      // operation on the responses...   
 *    
 * })
 *    
 * 
 */

/** Middlewares code here 
 * 
 * app.use() ----- now har request route tak janen say pahale es par ayege then route pr but keo sayd koi operation perform krna hoga.. or app.use() de ander ek function hunda hai jo req and res and next()  ko handle krta haii..    
 * now what is f is next() 
 *  app.use((req,res)=>{
 *     
 *  })
 *  
 *  // now example ager app koi request krte ho , request from browser accept by the server code and the vo request middleware k pass hogi.. or then vo uss route par jayegi jis route pr request kri gyi hai .. 
 */

// mera middleware
// arrow function use nhi hota. es mein.. 
app.use(function(req,res,next){
    console.log("this is the middleware.. ")
    next() // jo next middleware hai yan ager route hai us par jo means next checkpoint pr jo yehi kam hai next() function ka .... 
})
// now meri request ko es function ne agge forword nhi kiya... or app dekhenge reloading sign aa raha hai or page like stuck ho gya hai or hamara home page show nhi ho raha.. 
// here is the concept of the next() function 
// now use this in middleware 
app.use(function(request,response,next){
      console.log("this is the second middleware here ")
      next()
}) 

app.get('/', (req, res) => {
  res.send('Hello app home page !')
})

app.get('/about', (req, res) => {
  res.send('Hello app About  !')
})

app.get('/hidden', (req, res,next) => {
  // res.send('Hello app its Hidden!')
  // let errtxt = chalk('red')
  // console.log(errtxt) 
  // this message for the terminal or the console 
  // return next(new Error(chalk.rgb(219, 199, 14)('You done have access of this page ')))
  return next(new Error(chalk.rgb(147, 33, 240)('This is error message.....')))
})
// next return kiya keo k next() jo route hai jo middleware hai us par forward krdo 

//  error handline  basic 
// this middleware is for the frontend        

app.use((err, req, res, next) => {
  console.error(err.stack)
  // this message is shown on the frontend 
  res.status(500).send(('your not have permissions'))
})

app.listen(port, () => {
  // console.log()
  console.log(`${chalk.blue('Example app listening on')} ${chalk.red(port)}`)
  // console.log(chalk.red("this is red"))
})





// now the problem is jb bhi server file mein change hoga use render krnvanne k liye server restart krna pardega es solve krne k liye ek most useful package hai 

// nodemon 
// npm install nodemon --global 

