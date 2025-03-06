import type { Metadata } from "next"
import TranslatorForm from "@/components/translator-form"

export const metadata: Metadata = {
  title: "Nombre guay",
  description: "Automatic Task Assigner",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <TranslatorForm />
      </div>
    </main>
  )
}

