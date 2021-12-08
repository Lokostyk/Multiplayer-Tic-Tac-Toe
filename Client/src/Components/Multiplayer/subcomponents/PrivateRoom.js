import React, { useEffect,useContext, useState, useCallback } from 'react'
import {Context} from "../../../App"

function PrivateRoom({socket,roomId}) {
    const [context,setContext] = useContext(Context)
    const createGameState = {p1:{name:context,sybmol:""},p2:{name:"",sybmol:""},gameTiles:["","","","","","","","",""],turn:"waiting..."}
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
    useEffect(()=>{
        if(gameState.p1.name === context && gameState.p2.name !== "" && gameState.p1.sybmol === ""){
            const draw = Math.round(Math.random() * 10)%2
            if(draw === 0){
                const updatedGameState = {...gameState,p1:{name:gameState.p1.name,sybmol:"X"},p2:{name:gameState.p2.name,sybmol:"O"},turn:gameState.p1.name}
                setGameState(updatedGameState)
                socket.emit("get-game-state",updatedGameState,roomId)
            }else {
                const updatedGameState = {...gameState,p1:{name:gameState.p1.name,sybmol:"O"},p2:{name:gameState.p2.name,sybmol:"X"},turn:gameState.p2.name}
                setGameState(updatedGameState)
                socket.emit("get-game-state",updatedGameState,roomId)
            }
        }
    },[gameState,socket])
    const selectTile = useCallback((tileIndex)=>{
        if(gameState.p1.sybmol === "") return
        if(gameState.gameTiles[tileIndex] !== "" || gameState.turn !== context) return
        const currentPlayer = gameState.p1.name === gameState.turn ? gameState.p1 : gameState.p2
        const updatedGameTiles = [...gameState.gameTiles]
        updatedGameTiles[tileIndex] = currentPlayer.sybmol
        const updatedState = {...gameState,gameTiles:updatedGameTiles,turn:currentPlayer.name === gameState.p1.name?gameState.p2.name:gameState.p1.name}
        setGameState(updatedState)
        socket.emit("get-game-state",updatedState,roomId)
    },[gameState,socket])
    return (
        <section className="gameRoomContaier">
            <h1>Room ID:<br />{roomId}</h1>
            <div className="mainContent">
                <div className="playerName">
                    <h2>P1</h2>
                    <p>{gameState.p1.name}</p>
                </div>
                <div className="gameBoard">
                    {gameState.gameTiles.map((tile,index)=>{
                        return <div key={index} onClick={()=>selectTile(index)}>{tile}</div>
                    })
                    
                }
                </div>
                <div className="playerName">
                    <h2>P2</h2>
                    <p>{gameState.p2.name === ""?"waiting...":gameState.p2.name}</p>
                </div>
            </div>
            <h2>Turn: {gameState.turn}</h2>
        </section>
    )
}

export default PrivateRoom
