const io = require("socket.io")(3000,{
    cors:["http://localhost:3001"]
})

io.on("connection",async (socket)=>{
    socket.on("user-connect",userName=>{
        socket.data = userName
        getUsersList()
    })
    socket.on("connect-to-room",roomId=>{
        console.log(roomId)
    })
})

async function getUsersList(){
    const sockets = await io.fetchSockets()
    sockets.forEach(item=>{
        console.log(item.data)
        io.emit("player-list",{id:item.id,userName:item.data})
    })     
}