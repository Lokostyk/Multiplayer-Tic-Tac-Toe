import React, { useState } from 'react'
import {Route,Routes} from "react-router-dom"

import Multiplayer from './Components/Multiplayer/Multiplayer'
import RoomList from './Components/Multiplayer/subcomponents/RoomList'

export const Context = React.createContext()
function App() {
    const [context,setConetxt] = useState("")
    return (
        <Context.Provider value={[context,setConetxt]}>
            <>  
                <Routes>
                    <Route path="/" exact element={<Multiplayer />}/>
                    <Route path="/multiplayer" element={<RoomList />}/>
                </Routes>
            </>
        </Context.Provider>
    )
}

export default App
