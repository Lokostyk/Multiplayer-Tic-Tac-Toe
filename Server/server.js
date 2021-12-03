const io = require("socket.io")(3000,{
    cors:["http://localhost:3001"]
})

io.on("connection",async (socket)=>{
    socket.on("user-connect",userName=>{
        socket.data = userName
        setTimeout(()=>{
            getUsersList()
        },10)
    })
})

async function getUsersList(){
    const sockets = await io.fetchSockets()
    sockets.forEach(item=>{
        console.log(item.data)
        io.emit("player-list",{id:item.id,userName:item.data})
    })     
}