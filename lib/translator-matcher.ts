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
export async function findBestTranslator(task: TranslationTask): Translator[] {
  // 'TASK_TYPE', 'SOURCE_LANG', 'TARGET_LANG', 'MANUFACTURER', 
  // 'MANUFACTURER_INDUSTRY', 'MANUFACTURER_SUBINDUSTRY',
  // 'SELLING_HOURLY_PRICE','MIN_QUALITY', 'WILDCARD', 'ASSIGNED'
  //
  const clean_data = {...task, 'pricePerHour': Number(task.pricePerHour), 'minQuality': Number(task.minQuality)}

  const response = await fetch("http://localhost:8000/get-translators",{
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(clean_data)
  })
  const result = await response.json()

  console.log("result", result)
  const transform = result.map((tr)=>({
    'name': tr['TRANSLATOR'],
    'languages': [tr['SOURCE_LANG'], tr['TARGET_LANG']],
    'ratePerHour': Number(tr['HOURLY_RATE']),
    'quality': Number(tr['AVG_QUALITY_BY_LG']),
    'yearsExperience': 10,
    'numTasks': Number(tr['NUM_TASKS']),
    'similarity':Number(tr['Similarity Score'])*100,
    'tags':[],
    'specialties':[]
  }))
  console.log("transform: ", transform)
  // Sort by score (highest first)
  return transform
