import React, { useEffect,useContext, useState, useCallback } from 'react'
import {Context} from "../../../App"

function PrivateRoom({socket,roomId}) {
    const [context,setContext] = useContext(Context)
    const createGameState = {p1:{name:context,symbol:""},p2:{name:"",symbol:""},gameTiles:["","","","","","","","",""],turn:"waiting...",whoWon:""}
    const [gameState,setGameState] = useState(createGameState)

    //Creating and getting game state 
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
    //Drawing who is O,X
    useEffect(()=>{
        if(gameState.p1.name === context && gameState.p2.name !== "" && gameState.p1.symbol === "" && gameState.whoWon === ""){
            const draw = Math.round(Math.random() * 10)%2
            if(draw === 0){
                const updatedGameState = {...gameState,p1:{name:gameState.p1.name,symbol:"X"},p2:{name:gameState.p2.name,symbol:"O"},turn:gameState.p1.name}
                setGameState(updatedGameState)
                socket.emit("get-game-state",updatedGameState,roomId)
            }else {
                const updatedGameState = {...gameState,p1:{name:gameState.p1.name,symbol:"O"},p2:{name:gameState.p2.name,symbol:"X"},turn:gameState.p2.name}
                setGameState(updatedGameState)
                socket.emit("get-game-state",updatedGameState,roomId)
            }
        }
    },[gameState,socket])
    useEffect(()=>{
        if(gameState.p1.symbol === "") return
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for(let i = 0;i <= 7;i++){
            const winCondition = winningConditions[i]
            const a = gameState.gameTiles[winCondition[0]]
            const b = gameState.gameTiles[winCondition[1]]
            const c = gameState.gameTiles[winCondition[2]]
            if(a !== "" && b !== "" && c !== "" && a === b && b === c){
                const victoriousPlyer = gameState.p1.symbol === a ? gameState.p1.name:gameState.p2.name
                const currentGameState = {...gameState,p1:{name:gameState.p1.name,symbol:""},p2:{name:gameState.p2.name,symbol:""}
                ,whoWon:`${victoriousPlyer} wins!`,turn:"waiting..."}
                setGameState(currentGameState)
                socket.emit("get-game-state",currentGameState,roomId)
                return
            }
            //Checking for draw
            let draw = true;
            for(let j = 0;j < gameState.gameTiles.length;j++){
                if(gameState.gameTiles[j] === ""){
                    draw = false
                }
            }
            if(draw){
                const currentGameState = {...gameState,p1:{name:gameState.p1.name,symbol:""},p2:{name:gameState.p2.name,symbol:""}
                ,whoWon:`It's draw!`,turn:"waiting..."}
                setGameState(currentGameState)
                socket.emit("get-game-state",currentGameState,roomId)
            }
        }
    },[gameState])

    const selectTile = useCallback((tileIndex)=>{
        if(gameState.p1.symbol === "" || gameState.p2.symbol === "") return
        if(gameState.gameTiles[tileIndex] !== "" || gameState.turn !== context) return
        const currentPlayer = gameState.p1.name === gameState.turn ? gameState.p1 : gameState.p2
        const updatedGameTiles = [...gameState.gameTiles]
        updatedGameTiles[tileIndex] = currentPlayer.symbol
        const updatedState = {...gameState,gameTiles:updatedGameTiles,turn:currentPlayer.name === gameState.p1.name?gameState.p2.name:gameState.p1.name}
        setGameState(updatedState)
        socket.emit("get-game-state",updatedState,roomId)
    },[gameState,socket])
    const rematch = useCallback(()=>{
        setGameState({...gameState,gameTiles:["","","","","","","","",""],whoWon:""})
        socket.emit("get-game-state",{...gameState,gameTiles:["","","","","","","","",""],whoWon:""},roomId)
    },[gameState])
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
                        return <div key={index} onClick={()=>selectTile(index)}>{tile !== ""?
                            <img className="tileImage" src={`/Images/${tile}_${gameState.p1.symbol === tile?"red":"blue"}.svg`}/>:""
                        }</div>
                    })
                    
                }
                </div>
                <div className="playerName">
                    <h2>P2</h2>
                    <p>{gameState.p2.name === ""?"waiting...":gameState.p2.name}</p>
                </div>
            </div>
            <h2>Turn: {gameState.turn}</h2>
            {gameState.whoWon !== ""?
                <div className='verdictAlert'>
                    <h1>{gameState.whoWon}</h1>
                    <button onClick={()=>rematch()}>Rematch</button>
                </div>:""
            }
        </section>
    )
}

export default PrivateRoom
