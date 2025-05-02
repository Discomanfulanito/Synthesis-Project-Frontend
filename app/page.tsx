import type { Metadata } from "next"
import Content from "@/components/content"
export const metadata: Metadata = {
  title: "iDISC | Making Assignment Easy",
  description: "Automatic Task Assigner",
}



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-center flex-1 w-full">

        <Content />
        
      </div>
    </main>
  )
}

