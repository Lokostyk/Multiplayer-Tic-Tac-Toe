import React,{useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router'
import {io} from "socket.io-client"
import {Context} from "../../../App"

import RoomsInfo from './RoomsInfo'
import PrivateRoom from "./PrivateRoom"

function RoomList() {
    let navigate = useNavigate()
    const [context,setContext] = useContext(Context)
    const [socket,setSocket] = useState()
    const [privateRoomId,setPrivateRoomId] = useState()
    
    useEffect(()=>{ 
        if(context === ""){
            navigate("/")
            return
        } 
        const socket = io("http://localhost:3000")
        setSocket(socket)
    },[])


    return (
        <>
        {socket ? 
            privateRoomId ?
                <PrivateRoom socket={socket} roomId={privateRoomId} />:
                <RoomsInfo socket={socket} setPrivateRoomId={setPrivateRoomId}/>
            : null
        }
        </>
    )
}

export default RoomList
