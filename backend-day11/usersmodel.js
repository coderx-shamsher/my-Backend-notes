// ager require syntax hai to use this ager module type  hai to use import method to add packages 

const mongoose = require('mongoose')

// connect to db 
// connect() yeh method mein ek url string type krni hoti hai 
//mongodb://localhost:27017/ es / k bad app ke database k name kuch bhi rakh sakte ho... 
mongoose.connect('mongodb://localhost:27017/day1_mongodb')


// now making Schema - Schema means exp ager mera user schema hai to mere users k pass kon kon se properties honi chaachie like username passwd email etc 

const userschema = mongoose.Schema({
    // mere user ka pass kon kon sa data hona chaahie
    name : String,
    username : String,
    email  : String, 
})
// yeh Schema ek function hai ek method hai jo ek object leita hai 
// now we creating the model bina model create kiye ham curd nhi kr sakte 

// we creating the model using the model() yeh function ek model name or ek Schema leita hai or maine pass kiya hai 

// now we can also perform the curd in this but ager ham har ek opertion k liye alag alag routes create kr k use krna hai to make sure k hamne hamare model k export kiya ho 
module.exports = mongoose.model("users",userschema)

//  abb jao or require kro es file ho apne server file main 