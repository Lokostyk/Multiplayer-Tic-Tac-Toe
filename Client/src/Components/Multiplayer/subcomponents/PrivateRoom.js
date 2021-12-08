import React, { useEffect,useContext, useState } from 'react'
import {Context} from "../../../App"

function PrivateRoom({socket,roomId}) {
    const [context,setContext] = useContext(Context)
    const createGameState = {p1:{name:context,sybmol:""},p2:{name:"",sybmol:""},gameTiles:[["","",""],["","",""],["","",""]]}
    const [gameState,setGameState] = useState(createGameState)

    useEffect(()=>{
        socket.emit("connect-to-room",roomId,context)
        socket.on("connect-to-room",res=>{
            if(res !== context){
                createGameState.p1.name = context
                socket.emit("create-game-state",createGameState,roomId)
            }
        })
        socket.on("get-game-state",state=>{
            if(state.p1.name !== context && state.p2.name === ""){
                state.p2.name = context
                socket.emit("get-game-state",state,roomId)
            }else {
                setGameState(state)
            }
        })
    },[])
    return (
        <section className="gameRoomContaier">
            <h1>Room ID: {roomId}</h1>
            <div className="playerName">
                <h2>P1</h2>
                <p>{gameState.p1.name}</p>
            </div>
            <div className="playerName">
                <h2>P2</h2>
                <p>{gameState.p2.name}</p>
            </div>
        </section>
    )
}

export default PrivateRoom
