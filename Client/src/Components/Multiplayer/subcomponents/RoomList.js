import React,{useState,useEffect,useContext, useCallback} from 'react'
import { useNavigate } from 'react-router'
import {io} from "socket.io-client"
import {Context} from "../../../App"

function RoomList() {
    let navigate = useNavigate()
    const [context,setContext] = useContext(Context)
    const [socket,setSocket] = useState()
    const [playerList,setPlayerList] = useState([])

    useEffect(()=>{
        if(context === ""){
            navigate("/")
            return
        } 

        const currentList = []
        const socket = io("http://localhost:3000")
        setSocket(socket)

        socket.emit("user-connect",context)
        socket.on("player-list",player=>{
            if(player.id !== socket.id){
                if(currentList.includes(player.id)) return
                currentList.push(player.id)
                setPlayerList(prev=>([...prev,player]))
            }
        })
    },[])

    const createRoom = useCallback(()=>{
        if(!socket) return
        const roomId = socket.id.slice(15)
        window.location = `/${roomId}`
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
            <form>
                <input placeholder="code" />
            </form>
            <button>Join room</button>
            <button onClick={()=>createRoom()}>Create room</button>
        </section>
    )
}

export default RoomList
