// here is http module we code 

const http = require('http')

const server = http.createServer((request, response) => {
    response.end("this is hello from server!! ")

})

// console.log("this is my first http server in js using the nodejs")
// server listening port number 
server.listen(3000)

// now maine ek server create kiya and run kr diya server is running now
// node server.js
// now yeah ek local host server hai or check kaise krna hai serve chl raha hai ? ---> go on the browser and type this ---> localhost:port number you set in your server.js

// now ager server nu close kroge ton hamara server close hoga...
// that's simple 