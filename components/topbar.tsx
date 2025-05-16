interface TopbarProps {
    isManager: boolean;
    setIsManager: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Topbar ({isManager, setIsManager}: TopbarProps) {



    return (
        <section  style={{marginLeft: "-35%"}} className=" bg-red flex items-start gap-3 font-semibold mt-5 mb-auto ml-10 w-6xl">
            <div className=" hover:cursor-pointer" onClick={()=>setIsManager(true)}>
                Manage tasks
            </div>
            <div className=" hover:cursor-pointer" onClick={()=>setIsManager(false)}>
                Find translator
            </div>
        </section>
    )
}
