
import { Textarea } from "./ui/textarea"


export default function ManagerPanel() {

    const handleReturn = (event) => {
        if (event.key == "return")
        {
            event.preventDefault
        }
    }
    
    return (
        <div className="container mx-auto my-auto px-4 py-8 max-w-6xl flex-col items-start">
        
        <textarea onChange = {handleReturn} className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content py-2 pl-1 w-40 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] resize-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"/>
            <section>
                <p>hola</p>

                <p>hola</p>
                <p>hola</p>
                <p>hola</p>
                <p>hola</p>
                <p>hola</p>
            </section>
        </div>
    )
}