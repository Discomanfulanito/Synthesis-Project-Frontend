import type { Translator, TranslationTask } from "./types"

// Mock data for translators
const mockTranslators: Translator[] = [
  {
    id: "t1",
    name: "Maria Rodriguez",
    languages: ["english", "spanish", "french", "german", "japanese", "korean"],
    specialties: ["legal", "medical", "technical", "english", "spanish", "french",],
    yearsExperience: 15,
    quality: 4.9,
    ratePerHour: 12,

    sectorExperience: 10,
    tags: ["Legal Expert", "Medical Terminology", "Fast Turnaround"],
    technicalAccuracy: 95,
  },
  {
    id: "t2",
    name: "John Smith",
    languages: ["english", "german", "french", "english", "spanish", "french","fsadfdsa", "fdsfas","Fsfsad"],
    specialties: ["technical", "marketing", "academic", "english", "spanish", "french",],
    yearsExperience: 10,
    quality: 4.7,
    ratePerHour: 10,

    sectorExperience: 9,
    tags: ["Technical Documentation", "Academic Papers"],
    technicalAccuracy: 92,

  },
  {
    id: "t3",
    name: "Yuki Tanaka",
    languages: ["english", "japanese", "chinese", "english", "spanish", "french",],
    specialties: ["literary", "marketing", "technical", "english", "spanish",  "spanish", "french",],
    yearsExperience: 8,
    quality: 4.6,
    ratePerHour: 9,

    sectorExperience: 7,
    tags: ["Asian Languages", "Marketing Content"],
    technicalAccuracy: 88,

  },
  {
    id: "t4",
    name: "Carlos Mendez",
    languages: ["english", "spanish", "portuguese", "english", "spanish", "french","fsda"],
    specialties: ["legal", "literary", "marketing", "english", "spanish", "french",],
    yearsExperience: 12,
    quality: 4.5,
    ratePerHour: 11,

    sectorExperience: 7,
    tags: ["Latin Languages", "Legal Documents"],
    technicalAccuracy: 90,

  },
  {
    id: "t5",
    name: "Sophie Dubois",
    languages: ["english", "french", "italian", "english", "spanish", "french","algo", "algo"],
    specialties: ["medical", "academic", "technical"],
    yearsExperience: 9,
    quality: 4.8,
    ratePerHour: 10,

    sectorExperience: 7,
    tags: ["Medical Specialist", "Academic Research"],
    technicalAccuracy: 94,
 
  },
]

// Function to find the best translator based on task requirements
export function findBestTranslator(task: TranslationTask): Translator[] {
  // In a real app, this would be a more sophisticated algorithm
  // For demo purposes, we'll use a simple scoring system

  const scoredTranslators = mockTranslators.map((translator) => {
    let score = 0

    // Language match
    if (translator.languages.includes(task.sourceLanguage)) score += 10
    if (translator.languages.includes(task.targetLanguage)) score += 10

    // Specialty match
    if (translator.specialties.includes(task.fieldSpecialty)) score += 15


    // Experience (0-15 points)
    score += Math.min(translator.yearsExperience, 15)

    // quality (0-10 points)
    score += translator.quality * 2

    // Technical level match (0-10 points)
    const techLevelMatch = 10 - Math.abs(translator.technicalAccuracy - task.technicalLevel) / 10
    score += techLevelMatch

    return { ...translator, score }
  })

  // Sort by score (highest first)
  return scoredTranslators.sort((a, b) => (b as any).score - (a as any).score).map(({ score, ...rest }) => rest)
}

