import "./multiplayer.scss"
import React,{useState} from 'react'
import {Link} from "react-router-dom"

function Multiplayer() {
    const [nick,setNick] = useState()
    return (
        <section className="multiContainer">
            <h1>Multiplayer</h1>
            <img src="/Images/multi.png"/>
            <input value={nick} onChange={e=>setNick(e)} placeholder="Your nickname"/>
            <Link to="/multiplayer">Join</Link>
        </section>
    )
}

export default Multiplayer
