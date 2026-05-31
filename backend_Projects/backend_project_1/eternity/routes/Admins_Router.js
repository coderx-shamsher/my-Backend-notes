const express = require("express")

// create router using express.Router()
const router = express.Router()

const admins_model = require("../models/admins_model")


// condition for development evn only 
// console.log(`\n NODE ENVIRONMENT ----> ${process.env.NODE_ENV} \n`)

// ager development env hoga to he create route avaliable hoga... 
if (process.env.NODE_ENV === "development") {
    // console.log("its dev env....")
    console.log(`\n NODE ENVIRONMENT ----> ${process.env.NODE_ENV} \n`)

    // post method route for "/create" route
    router.post("/create", async (req, res) => {
        //   res.send("its create")
        let isadmin = await admins_model.find()

        // ager koi bhi admin user hai to new create krne ki permission nhi hogi...
        if (isadmin.length > 0) {
            return res
                .status(503)
                .send("You don't have permission to create new admin...")
        }
        
        // ager koi admin nhi hai to create 
      // req object deconstruction 
      let {fullname ,password ,email} = req.body  

        // creating admin user 
       let created_admin =  await admins_model.create({
             fullname,
             email,
             password,
        })
 
        // print the create admin user 
        res.status(201).send(created_admin)
    })  

}


// api setup with router or check kro k res mil raha hai k nhi... 
router.get("/", (req, res) => {
    res.send("helloo admin users......")
})



module.exports = router