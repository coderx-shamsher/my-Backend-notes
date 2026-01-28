const express = require('express')
const app = express()
const port = 3000

// using the database 
const usermodel = require('./usersmodel')

app.get('/', (req, res) => {
  res.send('Hello express server !')
})

app.get('/create', async (req, res) => {
    // we can create using this method or bhi methods hai we can explore it 

   let usercreated = await usermodel.create(
        {
            name : "coderY",
            username: "codebreaker_2nd",
            email: "coderY000@gmail.com"

        }
    )
    // NOTE that mongodb ka code async code hai, means k ager example maine console.log("hello") mere mongodb code k bad bhi likh diya bad mein to bhi mera hello pahle print hoga keo k js ek synchronous language hai js k stack mein jo sync code hai voh run hoga then the async code means mongodb 

    // ager main mera mongo ka code pahle run krna chaahta hun to !? 
    // use the async await 
    res.send(usercreated)
    console.log("this is sync code and its run after the async !! now  ")
})

// now who to update user 
app.get('/update',async function(req,res){
    // es main ek method hai findOneAndUpdate() function or yeh function kiya leiya hai {find the name or kise update krna hai example username:"user1"}, {or update kiya krna hai value means mere user1 ki jagah pr kiya update krna hai age : 22 }, {new: true} krni hai 
     let updateduser = await usermodel.findOneAndUpdate({name:"coderx"}, {username:"codebreaker_one"}, {new:true})

     res.send(updateduser)
     console.log("user is updated..")
})

// read how to read only one or many 
app.get('/read', async function(req,res){
    // find() yeh method sare user for example read krn krta hai 
    // first make sure you create more then one users
    // find() return the [] ager koi bhi user nhi huya to bhi ek array 
    let readonly = await usermodel.find()
    res.send(readonly)
    console.log("without async function and await ")
})

//  read only one 
app.get('/readone', async function(req,res){
    // findOne() eh ek {} mein data leta hai jo bhi ap search kr rahe ho example  main search kr rahe hun mera coderx user 
    // findOne() sb se pahala user show krga ager in case ek name k jada users hai vese hone nhi chaahie
    // yeh method hame ek object deta hai find() ek array mein objects return krta hai or yeh ek object as it deta hai.. 
    let readone = await usermodel.findOne({name:"coderY"})
    res.send(readone)
})

// delete 
app.get('/delete', async (req,res)=>{
  // findOneAndDelete() yeh ek object leta hai just like i give it 
    let deleteuser = await usermodel.findOneAndDelete({name:'coderY'})
    res.send(deleteuser)
    console.log("deleting is done... user id deleted...")
    // ek bar delete ho gya to us values or user jo bhi hai uska access apko milta hai tn k ager koi message yan koi operation perform krna hai to use it or use ham deleteuser main se access kr sakte hain.. 
})

// now ager ham us route pr jate hain or enter krte hain to hamara created user show hoga use route page par 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
