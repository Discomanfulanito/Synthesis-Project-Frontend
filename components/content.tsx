"use client"

import { useState } from "react"
import  Topbar  from "./topbar"
import TranslatorForm  from "./translator-form"
import ManagerPage from "./manager"
export default function Content() {

    const [isManager, setIsManager] = useState(false)

    return(
        <>
            <Topbar isManager={isManager} setIsManager={setIsManager}/>

            {!isManager&&
            <TranslatorForm />
            }
            {isManager && 
            <ManagerPage />
            }
        </> 
    )
}

