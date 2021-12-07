import React,{useEffect,useState,useCallback,useContext} from 'react'
import { Context } from '../../../App'

function RoomsInfo({socket,setPrivateRoomId}) {
    const gameState = {p1:{name:"",sybmol:""},p2:{name:"",sybmol:""},gameTiles:[["","",""],["","",""],["","",""]]}
    const [playerList,setPlayerList] = useState([])
    const [context,setContext] = useContext(Context)
    
    useEffect(()=>{
        const currentList = []

        socket.emit("user-connect",context)
        socket.on("player-list",player=>{
            if(player.id !== socket.id){
                if(currentList.includes(player.id)) return
                currentList.push(player.id)
                setPlayerList(prev=>([...prev,player]))
            }
        })
    },[])

    const joinRoom = useCallback((e)=>{
        e.preventDefault()
        const formInput = e.target.querySelector(".codeInput").value
        if(formInput.length > 4){
            socket.emit("join-ROOM",formInput)
            socket.on("response",res=>{
                if(res === "connected"){
                    setPrivateRoomId(formInput)
                }else {
                    console.log(res)
                }
            })
        }
    },[socket])
    const createRoom = useCallback(()=>{
        if(!socket) return
        const roomId = socket.id.slice(15)
        setPrivateRoomId(roomId)
        gameState.p1.name = context
        socket.emit("game-state-create",gameState)
    },[socket])
    return (
        <section className="roomContainer">
            <h1>Active players list</h1>
            <div className="playerListContainer">
                {playerList.map(item=>{
                    return <span key={item.id}>{item.userName},</span>
                })}
            </div>
            <p>Game code:</p>
            <form onSubmit={e=>joinRoom(e)}>
                <input className="codeInput" placeholder="code" />
                <input type="submit" value="Join room" />
            </form>
            <button onClick={()=>createRoom()}>Create room</button>
        </section>
    )
}

export default RoomsInfo
