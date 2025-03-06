"use client"

import type React from "react"
import { useState } from "react"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { Globe, Clock, FileText, Award, ArrowRight } from "lucide-react"

export default function TranslatorForm() {
  const [formData, setFormData] = useState({
    sourceLanguage: "",
    targetLanguage: "",
    fieldSpecialty: "",
    wordCount: 1000,
    urgency: 3,
    technicalLevel: 50,
    needsCertification: false,
    additionalNotes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()
    console.log("aaa")
    return
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
            iDISC
          </h1>
        </div>
        <ThemeToggle />
      </div>


        <Card className="w-full border border-border/40 shadow-lg animate-fade-in">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-2xl">Making assignment easy</CardTitle>
            <CardDescription>
              We combine knowledge and technology to boost your productivity
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 animate-slide-up stagger-1">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Globe className="h-5 w-5" />
                    <h2 className="text-lg">Language Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sourceLanguage">Source Language</Label>
                      <Select onValueChange={(value) => handleSelectChange("sourceLanguage", value)} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select source language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetLanguage">Target Language</Label>
                      <Select onValueChange={(value) => handleSelectChange("targetLanguage", value)} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select target language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fieldSpecialty">Field Specialty</Label>
                    <Select onValueChange={(value) => handleSelectChange("fieldSpecialty", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="literary">Literary</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6 animate-slide-up stagger-2">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <FileText className="h-5 w-5" />
                    <h2 className="text-lg">Project Details</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="wordCount">Budget</Label>
                        <span className="text-sm text-muted-foreground">
                          ${formData.wordCount.toLocaleString()}
                        </span>
                      </div>
                      <Input
                        type="range"
                        name="wordCount"
                        value={formData.wordCount}
                        onChange={handleChange}
                        min={100}
                        max={50000}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>100</span>
                        <span>50,000</span>
                      </div>
                    </div>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up stagger-3">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Award className="h-5 w-5" />
                    <h2 className="text-lg">Quality Requirements</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="technicalLevel">Technical Level</Label>
                        <span className="text-sm text-muted-foreground">{formData.technicalLevel}%</span>
                      </div>
                      <Slider
                        value={[formData.technicalLevel]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleSliderChange("technicalLevel", value)}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>General</span>
                        <span>Highly Technical</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        checked={formData.needsCertification}
                        onCheckedChange={(checked) => handleSwitchChange("needsCertification", checked)}
                      />
                      <Label htmlFor="needsCertification" className="font-medium">
                        Requires Certified Translation
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Clock className="h-5 w-5" />
                    <h2 className="text-lg">Additional Information</h2>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Notes or Special Requirements</Label>
                    <Textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="Any specific requirements or context for your translation..."
                      className="min-h-[120px] resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 animate-slide-up stagger-4">
                <Button
                  type="submit"
                  className="w-full py-6 text-lg group relative overflow-hidden hover:cursor-pointer"
                >
                    <div className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                      <span>Find Best Translator</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      
    </div>
  )
}

