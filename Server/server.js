const io = require("socket.io")(3000,{
    cors:["http://localhost:3001"]
})

io.on("connection",(socket)=>{
    let gameState;
    console.log(gameState)
    socket.on("user-connect",userName=>{
        socket.data = userName
        getUsersList()
    })
    socket.on("join-ROOM",(id)=>{createRoom(id,socket)})
    socket.on("game-state-create",state=>{
        gameState = state
        io.in(roomId).emit("connect-to-room",state)
    })
    socket.on("connect-to-room",roomId=>{
        socket.join(roomId)
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
