import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { io } from 'socket.io-client'

function PrivateRoom() {
    const {pathname} = useLocation()
    useEffect(()=>{
        const socket = io("http://localhost:3000")
        
        socket.emit("connect-to-room",pathname.slice(1))
    },[])
    return (
        <div>
            
        </div>
    )
}

export default PrivateRoom
