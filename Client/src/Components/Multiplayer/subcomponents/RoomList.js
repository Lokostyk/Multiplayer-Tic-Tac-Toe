import React,{useState,useEffect} from 'react'
import {io} from "socket.io-client"

const socket = io("http://localhost:3000")
function RoomList() {

    useEffect(()=>{
        socket.on("player-list",list=>{
            console.log(list)
        })
    },[])
    return (
        <section className="roomContainer">
            <h1>Active players list</h1>
        </section>
    )
}

export default RoomList
