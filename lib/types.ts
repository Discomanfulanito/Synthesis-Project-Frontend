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
    fieldSpecialty: string
    wordCount: number
    urgency: number
    technicalLevel: number
    needsCertification: boolean
    additionalNotes: string
  }
  
  