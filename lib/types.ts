export interface Translator {
    id: string
    name: string
    languages: string[]
    specialties: string[]
    yearsExperience: number
    quality: number
    ratePerHour: number
    tags: string[]
    technicalAccuracy: number,
    sectorExperience: number
}
  
export interface TranslationTask {
    sourceLanguage: string
    targetLanguage: string
    taskType: string
    manufacturer: string
    manufacturerIndustry: string
    manufacturerSubindustry: string
    minQuality: string
    wildcard: string
    pricePerHour: number
  }
