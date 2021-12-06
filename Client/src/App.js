import React, { useState } from 'react'
import {Route,Routes} from "react-router-dom"

import Multiplayer from './Components/Multiplayer/Multiplayer'
import RoomHub from './Components/Multiplayer/subcomponents/RoomHub'

export const Context = React.createContext()
function App() {
    const [context,setConetxt] = useState("")
    return (
        <Context.Provider value={[context,setConetxt]}>
            <>  
                <Routes>
                    <Route path="/" exact element={<Multiplayer />}/>
                    <Route path="/multiplayer" element={<RoomHub />}/>
                </Routes>
            </>
        </Context.Provider>
    )
}

export default App
