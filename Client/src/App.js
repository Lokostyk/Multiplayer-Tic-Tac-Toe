import React from 'react'
import {Route,Routes} from "react-router-dom"

import Multiplayer from './Components/Multiplayer/Multiplayer'
import RoomList from './Components/Multiplayer/subcomponents/RoomList'

function App() {
    return (
        <>  
            <Routes>
                <Route path="/" exact element={<Multiplayer />}/>
                <Route path="/multiplayer" element={<RoomList />}/>
            </Routes>
        </>
    )
}

export default App
