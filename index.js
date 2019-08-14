//import to server.js
const server = require('./server.js')


//Let's make it listen
server.listen(6000,()=>{
    console.log("server is running on port 6000");
})
