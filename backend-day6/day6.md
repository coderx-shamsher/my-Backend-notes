<!-- // today EJS , dynamic routing , mini project  
 
-->

## setup npm project 

1) initialize a project with npm 

```zsh
   npm init  or npm init -y 
```

2)  express install 

```zsh
   npm install express 
   npm install chalk
   npm install nodemon or as the global for all your system 
   npm install --global nodemon 
``` 

## setup you express js app
## Setting up parsers for from 
```js 
// this two lines are parsers 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

```
```js
   
import chal from 'chalk'
import express from 'express'
// const express = require('express')
// const app = express () 
const port = 4000

// we setup the parsers here
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(request,response)=>{
   response.send("hello this is fucking backend... ")
})

app.listen(chal.rgb(75, 204, 204)(`The app running at the port => ${port} on the `),chal.red('localhost'))

```

## Create custom scripts to run server with npm 
```json 
  "run-server":"nodemon ./server.js"

add this line in packages.json
```

## What is ejs  
* EJS (Embedded JavaScript) is a simple, fast templating engine for Node.js that lets you embed JavaScript directly into HTML to create dynamic web pages, generating HTML markup with plain JavaScript code and data from the server, making it easier to build interactive web applications. It uses specific tags like <%= %> for outputting data and <% %> for control flow, helping developers render data cleanly without learning a new language, as it uses familiar JavaScript syntax. 

### How it Works
- Create Templates: You write HTML files (e.g., index.ejs) with embedded JavaScript logic and placeholders. 
- Pass Data: Your Node.js (often Express) application sends data (like JSON) to these templates.
- Render: EJS processes the template, executes the JavaScript, inserts the data where specified, and generates a final, complete HTML file. 

--- 


### Key Features
Simple Syntax: Uses standard JavaScript, making it easy to learn.
- Dynamic Content: Generates HTML with data from your application.
- Performance: Caches intermediate functions for faster execution.
- Flexibility: Allows for partials (reusable template parts) and includes logic like loops and conditionals. 

--- 

### Common Tags
- <%= %>: Outputs escaped HTML.
- <%- %>: Outputs unescaped HTML.
- <% %>: Executes JavaScript code (e.g., for loops, if/else).
- <%# %>: A comment that doesn't render. 
- In essence, EJS bridges the gap between server-side data and client-side HTML, streamlining dynamic content delivery in Node.js applications. 

## now to settup ejs 
```bash

npm install ejs 

```
## setup ejs as view engine 
```js 

app.set('view engine','ejs') // now we settup k backend kiya render krega ejs pages 
// after adding this line to your express code 

``` 
- **make views named folder** 
- create a file name index.ejs 




## setting up public static files
```js 
// understand this -> __dirname  es k help say we can print or see our current working directory 
// static files vo files of folders hai jo change nhi hoti or publically on the browser show krni hoti hai means as frontend line images, frontend js , css styles etc.. 

// app.use(express.static(path.join(_dirname,+ '/public')))
app.use(express.static('public'))

```

## Dynamic Routing 
how to get data coming from frontend at backend route 
1) go the the /users route and type this / ka bad kuj bhi type koi example ek username  /users/admin

2) now ager oh /users/admin route nhi hai tn create kro and send the response 

3) so dynamic routing ka fayda kiya hai keo kre ? ager mai chaahta hun k mera ek route hai blogs name ka or us ka age ager main /blogs/javascript   ---> es kuj type kro to muje js k liye kuj alag ssay route na create krna parde ek he route mein kam ho jaye eska kiya matlab hai ? 
means mera /blogs/ route ton sare rahega bus meri values jo es k age type krni hai vo ager change ho rahe hai to us hisab say route manage ho. orr vo kaise hoga.. 
> ager mere /blogs/python par mera python ka blog page hai to muje us k kiya /blogs/python route na create krna parde ager mere ek say jada blogs page hai to mai har page k liye ek ek route create nhi krna chaahta.. 
--- 

```js 

app.get('/users/:usename',function(req,res){
   let username = req.params.usename
     res.send(`Wellcome !! ${username}`)
})

```
thats how we can handle the  dynamic routing hamne /route/:parametername kiya or :parametername mein jo values ati hai vo params hoti hai yan parameters bol sakte ho..
or use handle krne k liye use 
          req.params.parametername   

or parameter name kuch bhi rakh sakte ho route mein  
