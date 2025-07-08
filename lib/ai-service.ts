import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface TripPreferences {
  budget: string
  interests: string[]
  duration: number
  groupSize: number
  accommodation: string
  transportation: string
}

export interface GeneratedTrip {
  title: string
  description: string
  itinerary: DayItinerary[]
  estimatedCost: number
  recommendations: string[]
}

export interface DayItinerary {
  day: number
  title: string
  activities: Activity[]
  meals: Meal[]
  accommodation?: string
}

export interface Activity {
  time: string
  name: string
  description: string
  location: string
  cost?: number
  duration?: string
}

export interface Meal {
  type: "breakfast" | "lunch" | "dinner"
  name: string
  location: string
  cost?: number
}

/**
 * Generates a travel itinerary (or any text) via OpenAI GPT-4o.
 * You can tailor the system/prompt for better results.
 */
export async function generateTripWithAI(prompt: string) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: "You are an expert travel planner. Return a concise 5-day itinerary in Markdown.",
    prompt,
  })
  return text
}

// OPTIONAL alias so old & new code compile
export { generateTripWithAI as generateTrip }
