const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // es line say ham json data read kr sakte hain 
app.use(express.urlencoded({extended:true})) // es line say ham x-www-form-urlencoded form data ko  read kr sakte hain note this format used for forms submited data.. ko read krne k liye 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
