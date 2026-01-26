// const express = require('express')
import express from 'express'

// import 
import fs from 'fs'
const app = express()
const port = 3000


// middlewares for data parsing 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// make sure you have folder name views to run the ejs files
app.set('view engine', 'ejs')

// middleware for the static files
app.use(express.static('public'))
app.use(express.static('src'))


app.get('/', function (request, response) {
  //   response.send('this is day7 ')
  fs.readdir('./taskfiles', function (err, files) {
    console.log(files)
    // jab reading ho jaye to index ko render krdo 
    // now we can send the data to the index.ejs file vo data hai file kaise send krna hai , ek object mein {files:files} jo mera callback function get kr raha hai use ham index koi send kr rahe hain
    response.render('index.ejs', { files: files })
  })

})

app.get('/taskfiles/:filename',function(req, res){
      // ager data ka type nhi mention hoga to data buffer data print hoga <Buffer 79 6f 75 20 6e 65 65 64 20 74 6f 20 63 72 65 61 74 65 20 61 20 6e 65 77 20 68 74 74 70 20 73 65 72 76 65 72 20 75 73 69 6e 67 20 74 68 65 20 6e 6f 64 ... 109 more bytes> so use
      //  "utf-8" for plain text format 
  fs.readFile(`./taskfiles/${req.params.filename}`,"utf-8",function(err,filedata){
          // console.log(filedata)
          // ham show.ejs page pr render kva rahe 
          // send the filename and filedata to showe ejs as parameter
          res.render('show.ejs',{filename:req.params.filename, filedata:filedata}) 
           
      })
})


// edit route for edit file names 
// app.get edit route create kiya tan k file ko rename kr saken 
app.get('/edit/:filename',function(req,res){
    res.render('edit.ejs',{filename:req.params.filename})
})

// app.post route banya tn k  
app.post('/edit',function(req,res){
    // console.log(req.body)
    fs.rename(`./taskfiles/${req.body.previous}`,`./taskfiles/${req.body.newfilename}`, function(err){
       if(err){
         console.log(err)

       }else{
          res.redirect('/')
       }
    })
})


// /create route for post 
app.post('/create', function (req, res) {
  //  res.render("index")
  // res.send("heloo")
  // we can checking k data form ka aa raha hai k nhi 
  console.log(req.body)
  console.log(req.body.TaskTitle)
  console.log(req.body.detail)
  // now create file using the fs.writefile module 

  fs.writeFile(`./taskfiles/${req.body.TaskTitle.split(' ').join('_')}.txt`, req.body.detail, function (err) {
    if (err) {
      console.log(err)
    } else {
      // file create krne k bad use redirect kr diya to route / (home)
      res.redirect('/')
    }

  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
