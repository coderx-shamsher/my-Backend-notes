const express = require("express")

// create router using express.Router()
const router = express.Router()

// api setup with router or check kro k res mil raha hai k nhi... 
router.get("/", (req,res)=>{
    res.send("helloo admin users......")
})


module.exports = router