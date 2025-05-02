"use client"

// Import react things
import type React from "react"
import { useState } from "react"

// Import shadcn components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

// Import own components
import { ThemeToggle } from "@/components/theme-toggle"
import { TranslatorResults } from "@/components/translator-results"

// Import translator related
import type { Translator } from "@/lib/types"
import { findBestTranslator } from "@/lib/translator-matcher"

// Import logos and badges
import { Globe, Clock, FileText, Award, ArrowRight, User} from "lucide-react"


// TranslatorForm Component
export default function TranslatorForm() {
  // Init formData
  const [formData, setFormData] = useState({
    sourceLanguage: "",
    targetLanguage: "",
    fieldSpecialty: "",
    pricePerHour: 14,
    urgency: 3,
    technicalLevel: 50,
    needsCertification: false,
    additionalNotes: "",
  })
  // Init supported languages
  const languages = ["Portuguese", "English", "Spanish", "German", "French", "Chinese", "Japanese"]
  
  // Init supported fields
  const fields = ["Legal", "Medical", "Technical", "Marketing", "Literary", "Academic"]

  // Init supported taskTypes
  const taskTypes = ["Engineering", "Management", "Miscellaneous", "Translation", "ProofReading", "DTP"]

  // Init showResults bool
  const [showResults, setShowResults] = useState(false)

  // Init translators' list
  const [translators, setTranslators] = useState<Translator[]>([])

  // Init button disabler  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true) // Disable submission button

    // Simulate API call
    setTimeout(() => {
      const results = findBestTranslator(formData) // get best translators
      setTranslators(results) // set best translators
      setShowResults(true) // show best translators
      setIsSubmitting(false)
    }, 1000)
  }
  
  // Add changes to formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  // Add selection changes to formData 
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  // Add slider changes to formData
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
  }
  // Add slider changes to formData
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }
  
  return (
    /*
    * Main
    */
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/*
      * Title & Theme
      */}
      <div className="flex justify-between items-center mb-8">
        {/*
        * Title
        */}
        <div className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            iDISC
          </h1>
        </div>
        {/*
        * Theme
        */} 
        <ThemeToggle />
      </div>

      {/*
      * Ternary Logic
      */}
      {!showResults ? (
        /*
        * Formulary Page
        */ 
        <Card className="w-full border border-border/40 shadow-lg animate-fade-in">
          {/*
          * Header
          */}
          <CardHeader className="pb-2 border-b">
            <div className="flex">
              <div>
                  <CardTitle className="text-2xl">Making assignment easy</CardTitle>
                  <CardDescription>
                    We combine knowledge and technology to boost your productivity
                  </CardDescription>
              </div>
              <div className=" ml-auto">
                <div className="flex">
                    <User></User>
                    <h2 className="text-md font-medium">User Identification</h2>
                </div>
                    <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder=" e.g. #123654"
                        className=" border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content py-2 pl-1 w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] resize-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                      
              </div>
            </div>
          </CardHeader> 
          {/*
          * Card Content
          * Form & Submit Button
          */}
          <CardContent className="pt-6">
            {/*
            * Form
            */}
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/*
                Card Content:
                Language Information & Project Details
              */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 
                  Language Information
                */}
                <div className="space-y-6 animate-slide-up stagger-1">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Globe className="h-5 w-5" />
                    <h2 className="text-lg">Language Information</h2>
                  </div>

                  {/*
                    Source Language and Target Language
                  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/*
                      Source Language
                    */} 
                    <div className="space-y-2">
                      <Label htmlFor="sourceLanguage">Source Language</Label>
                      <Select onValueChange={(value) => handleSelectChange("sourceLanguage", value)} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select source language" />
                        </SelectTrigger>

                        <SelectContent>
                          {
                            languages.map((lang, k)=>(
                              <SelectItem value={lang.toLocaleLowerCase()} key={k}>{lang}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                     {/*
                    * Local Variation
                    */}
                    <div className="space-y-2">
                      <Label htmlFor="SourceVariation">Local Variation</Label>
                      <Select> {/*onValueChange not implemented!*/}
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a variation" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            ["Iberian", "Global", "LA", "Mexico", "Argentina", "US", "Chile"].map((vari, k) =>(
                              <SelectItem value={vari.toLowerCase()} key={k}>{vari}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/*
                  * Target Language
                  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetLanguage">Target Language</Label>
                      <Select onValueChange={(value) => handleSelectChange("targetLanguage", value)} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select target language" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                           languages.map((lang, k) =>(
                            <SelectItem value={lang.toLowerCase()} key={k}>{lang}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetVariation">Local Variation</Label>
                      <Select>{/* onValueChange not implemented*/}
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a variation"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {
                            ["Brazil", "Iberian"].map((vari, k)=>(
                              <SelectItem value={vari.toLowerCase()} key={k}>{vari}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/*
                    Field Specialty & Task Type
                  */}
                  <div className="flex gap-4">
                    {/*
                    * Field Specialty
                    */}
                    <div className="space-y-2">
                      <Label htmlFor="fieldSpecialty">Field Specialty</Label>
                      <Select onValueChange={(value) => handleSelectChange("fieldSpecialty", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select field specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            fields.map((field, k) =>(
                              <SelectItem value={field.toLocaleLowerCase()} key={k}>
                                {field}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    {/*
                    * Task Type
                    */}
                    <div className="space-y-2">
                      <Label htmlFor="taskType">Task Type</Label>
                      <Select onValueChange={(value) => handleSelectChange("taskType", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select task type" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            taskTypes.map((field, k) =>(
                              <SelectItem value={field.toLocaleLowerCase()} key={k}>
                                {field}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {/*
                  Project Details
                */}
                <div className="space-y-6 animate-slide-up stagger-2">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <FileText className="h-5 w-5" />
                    <h2 className="text-lg">Project Details</h2>
                  </div>

                  {/*
                  * Budget & Urgency
                  */}
                  <div className="space-y-4 ">

                    {/*
                    * Budget
                    */}
                    <div className="space-y-2 ">
                      <div className="flex justify-between">
                        <Label htmlFor="pricePerHour">Price($)/Hour</Label>
                        <span className="text-sm text-muted-foreground">
                          ${formData.pricePerHour.toLocaleString()}
                        </span>
                      </div>
                      <Input
                        type="range"
                        name="pricePerHour"
                        value={formData.pricePerHour}
                        onChange={handleChange}
                        min={5}
                        max={20}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$5</span>
                        <span>$20</span>
                      </div>
                    </div>

                    {/*
                    * Urgency
                    */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="urgency">Urgency</Label>
                        <span className="text-sm text-muted-foreground">
                          {formData.urgency} {formData.urgency === 1 ? "day" : "days"}
                        </span>
                      </div>
                      <Slider
                        value={[formData.urgency]}
                        min={1}
                        max={30}
                        step={1}
                        onValueChange={(value) => handleSliderChange("urgency", value)}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Urgent (1 day)</span>
                        <span>Standard (30 days)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/*
              * Submit Button 
              */}
              <div className="pt-4 animate-slide-up stagger-4">
                <Button
                  type="submit"
                  className="w-full py-6 text-lg group relative overflow-hidden"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      <span>Finding your perfect translator...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                      <span>Find Best Translator</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        /*
         *  Results Page
         */
        <div className="space-y-6 animate-fade-in">
          <Button variant="outline" onClick={() => setShowResults(false)} className="mb-4">
            Back to Form
          </Button>
          <TranslatorResults translators={translators} />
        </div>
      )}
    </div>
  )
}

