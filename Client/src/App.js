import React, { useState } from 'react'
import {Route,Routes} from "react-router-dom"

import Multiplayer from './Components/Multiplayer/Multiplayer'
import PrivateRoom from './Components/Multiplayer/subcomponents/PrivateRoom'
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
                    <Route path="/:id" element={<PrivateRoom />}/>
                </Routes>
            </>
        </Context.Provider>
    )
}

export default App
