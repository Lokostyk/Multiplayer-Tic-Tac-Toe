import React,{useState,useEffect,useContext, useCallback} from 'react'
import { useNavigate } from 'react-router'
import {io} from "socket.io-client"
import {Context} from "../../../App"

function RoomList() {
    let navigate = useNavigate()
    const [context,setContext] = useContext(Context)
    const [playerList,setPlayerList] = useState([])
    
    useEffect(()=>{
        if(context === ""){
            navigate("/")
            return
        } 
        const socket = io("http://localhost:3000")
        
        socket.emit("user-connect",context)
        socket.on("player-list",player=>{
            if(player.id !== socket.id){
                setPlayerList([...playerList,player])
            }
        })
    },[])
    return (
        <section className="roomContainer">
            <h1>Active players list</h1>
            {playerList.map(item=>{
                return <div key={item.id}>{item.userName}</div>
            })}
        </section>
    )
}

export default RoomList
