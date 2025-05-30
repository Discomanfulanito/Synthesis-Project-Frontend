"use client"

// Import shadcn components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, RadarChart } from "@/components/charts"
import { Button } from "@/components/ui/button"

// Import logos and badges
import { CheckCircle, Star, DollarSign, Award, Users, BarChart2 } from "lucide-react"

// Import Translator interface
import type { Translator } from "@/lib/types"
interface TranslatorResultsProps {
  translators: Translator[]
}


// TranslatorResults Component
export function TranslatorResults({ translators }: TranslatorResultsProps) {
  const bestTranslator = translators[0]
  
  console.log(translators)
  return (
    // Component Root
    <div className="space-y-8">
      {/*
      * Best Match
      */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg animate-slide-up">
          {/*
          * Header 
          */} 
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <Badge className="mb-2 bg-primary/90 hover:bg-primary/80" variant="default">
                  <CheckCircle className="mr-1 h-3 w-3" /> Best Match
                </Badge>
                <CardTitle className="text-2xl">{bestTranslator.name}</CardTitle>
                <CardDescription className="mt-1">{bestTranslator.specialties.join(" • ")}</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">${bestTranslator.ratePerHour.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">per hour</p>
              </div>
            </div>
          </CardHeader>
          {/*
          * Content
          */} 
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Translator Profile
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/80 rounded-lg p-4 flex flex-col">
                    <span className="text-muted-foreground text-sm">Tasks Done</span>
                    <span className="text-xl font-semibold mt-1">{bestTranslator.numTasks} tasks</span>
                  </div>
                  <div className="bg-background/80 rounded-lg p-4 flex flex-col">
                    <span className="text-muted-foreground text-sm">Quality</span>
                    <span className="text-xl font-semibold mt-1 flex items-center">
                      {bestTranslator.quality}
                      <Star className="h-4 w-4 text-yellow-500 ml-1 inline" fill="currentColor" />
                    </span>
                  </div>
                  <div className="bg-background/80 rounded-lg p-4">
                  <span className="text-muted-foreground text-sm">Languages</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {bestTranslator.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="capitalize">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                  <div className="bg-background/80 rounded-lg p-4 flex flex-col">
                    <span className="text-muted-foreground text-sm">Similarity</span>
                    <span className="text-xl font-semibold mt-1 flex items-center">{bestTranslator.similarity}%</span>
                  </div>
                </div>

              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Why This Translator?
                </h3>
                <div className="bg-background/80 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {bestTranslator.name} is the ideal match for your project based on your specific requirements. With{" "}
                    {bestTranslator.numTasks} tasks done, has experience with tasks like yours,
                    and their skills offer the perfect balance of expertise, quality, and
                    value.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {bestTranslator.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/20 text-primary-foreground hover:bg-primary/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full py-6 mt-4 group">
                  <div className="flex items-center justify-center gap-2">
                    <span>Contact This Translator</span>
                    <DollarSign className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/*
      * Comparison
      */}  
      <Tabs defaultValue="comparison" className="w-full animate-slide-up stagger-1">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Comparison</span>
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Detailed Analysis</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="comparison" className="space-y-6">
          <Card className="shadow-md border-border/40">
            <CardHeader className="pb-2 border-b">
              <CardTitle>Translator Comparison</CardTitle>
              <CardDescription>See how our recommended translator compares to alternatives</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <BarChart translators={translators} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details" className="space-y-6">
          <Card className="shadow-md border-border/40">
            <CardHeader className="pb-2 border-b">
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Detailed analysis of translator capabilities across key metrics</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <RadarChart translators={translators.slice(0,2)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up stagger-2">
        {translators.slice(1, 4).map((translator, index) => (
          <Card key={translator.id} className="h-full shadow-md hover:shadow-lg transition-shadow border-border/40">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-2" variant="outline">
                    Alternative {index + 1}
                  </Badge>
                  <CardTitle className="text-lg">{translator.name}</CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${translator.ratePerHour.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">per hour</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-secondary/50 rounded-lg p-3 flex flex-col">
                    <span className="text-muted-foreground text-xs">Tasks Done</span>
                    <span className="text-base font-semibold mt-1">{translator.numTasks} tasks</span>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 flex flex-col">
                    <span className="text-muted-foreground text-xs">Quality</span>
                    <span className="text-base font-semibold mt-1 flex items-center">
                      {translator.quality}
                      <Star className="h-3 w-3 text-yellow-500 ml-1 inline" fill="currentColor" />
                    </span>
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <span className="text-muted-foreground text-xs">Similarity</span>
                  <p className="text-sm font-medium mt-1">{translator.similarity}%</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Contact This Translator
                  <DollarSign className="h-4 w-4 transition-transform group-hover:scale-110" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

