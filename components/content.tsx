"use client"

import { useState } from "react"
import  Topbar  from "./topbar"
import TranslatorForm  from "./translator-form"
import ManagerPanel from "./manager-panel"
export default function Content() {

    const [isManager, setIsManager] = useState(false)

    return(
        <>
            <Topbar isManager={isManager} setIsManager={setIsManager}/>

            {!isManager&&
            
            <TranslatorForm />
            }
            {isManager && 
            <ManagerPanel />
            }

        </> 
    )
}

