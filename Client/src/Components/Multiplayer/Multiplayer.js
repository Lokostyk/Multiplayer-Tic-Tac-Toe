import "./multiplayer.scss"
import React,{useCallback, useContext, useState} from 'react'
import {Link} from "react-router-dom"
import {Context} from "../../App"

function Multiplayer() {
    const [nick,setNick] = useState("")
    const [context,setContext] = useContext(Context)
    const saveName = useCallback(()=>{
        setContext(nick)
    },[nick])
    return (
        <section className="multiContainer">
            <h1>Multiplayer</h1>
            <img src="/Images/multi.png"/>
            <input value={nick} onChange={e=>setNick(e.target.value)} placeholder="Your nickname"/>
            <Link to="/multiplayer" onClick={()=>saveName()}>Join</Link>
        </section>
    )
}

export default Multiplayer
