import React, { useEffect } from 'react'

function PrivateRoom({socket,roomId}) {
    console.log(socket.id)
    useEffect(()=>{
        socket.emit("connect-to-room",roomId)
        socket.on("message",res=>{
            console.log(res,"<======")
        })
    },[])
    return (
        <div>
            <h1>{roomId}</h1>
            <button onClick={()=>socket.emit("game-state",roomId,"YOOO")}>YOOOOO</button>
        </div>
    )
}

export default PrivateRoom
