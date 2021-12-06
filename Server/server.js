const io = require("socket.io")(3000,{
    cors:["http://localhost:3001"]
})

io.on("connection",(socket)=>{
    id = socket.id
    socket.on("user-connect",userName=>{
        socket.data = userName
        getUsersList()
    })
    socket.on("join-ROOM",(id)=>{createRoom(id,socket)})
    socket.on("connect-to-room",(roomId)=>joinRoom(roomId,socket))
    socket.on("game-state",(res,roomId)=>{
        console.log(io.sockets.adapter.rooms,socket.id)
        io.to(roomId).emit("message",res)
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

function joinRoom(roomId,socket){
    socket.join(roomId)
}