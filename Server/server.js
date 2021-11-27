const io = require("socket.io")(3000,{
    cors:["http://localhost:3001"]
})

io.on("connection",socket=>{
    getUsersList()
})

async function getUsersList(){
     const sockets = await io.fetchSockets()
    sockets.forEach(item=>{
        io.emit("player-list",item.id)
    })     
}