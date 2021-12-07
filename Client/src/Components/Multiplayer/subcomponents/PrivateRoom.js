import React, { useEffect } from 'react'

function PrivateRoom({socket,roomId}) {

    useEffect(()=>{
        socket.emit("connect-to-room",roomId)
        socket.on("connect-to-room",res=>{
            console.log(res,"<======")
        })
    },[])
    return (
        <div>
            <h1>{roomId}</h1>
            <button onClick={()=>socket.emit("game-state","YOOO",roomId)}>YOOOOO</button>
        </div>
    )
}

export default PrivateRoom
