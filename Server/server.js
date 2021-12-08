const io = require("socket.io")(3000,{
    cors:["http://localhost:3001"]
})

io.on("connection",(socket)=>{
    socket.on("user-connect",userName=>{
        socket.data = userName
        getUsersList()
    })
    socket.on("create-room",(id)=>{createRoom(id,socket)})
    socket.on("connect-to-room",(roomId,userName)=>{
        socket.join(roomId)
        io.in(roomId).emit("connect-to-room",userName)
    })
    socket.on("create-game-state",(state,roomId)=>{
        socket.to(roomId).emit("get-game-state",state)
    })
    socket.on("get-game-state",(state,roomId)=>{
        io.to(roomId).emit("get-game-state",state)
    })
})

async function getUsersList(){
    const sockets = await io.fetchSockets()
    sockets.forEach(item=>{
        if(item.id === {}) return
        io.emit("player-list",{id:item.id,userName:item.data})
    })     
}
async function createRoom(id,socket){
    const room = await io.sockets.adapter.rooms.get(id)
        if(!room){
            socket.emit("response","This room doesn't exists.")
            return
        }else if(Array.from(room).length > 1){
            socket.emit("response","Room is full.")
            return
        }else {
            socket.emit("response","connected")
        }
}
