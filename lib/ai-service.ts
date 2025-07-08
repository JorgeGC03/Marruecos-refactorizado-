import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export interface TripPreferences {
  destination: string
  duration: number
  budget: string
  interests: string[]
  travelStyle: string
}

export interface GeneratedTrip {
  title: string
  overview: string
  itinerary: DayItinerary[]
  budget: BudgetBreakdown
  tips: string[]
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
  cost?: string
  duration?: string
}

export interface Meal {
  type: "breakfast" | "lunch" | "dinner"
  name: string
  location: string
  cost?: string
}

export interface BudgetBreakdown {
  accommodation: number
  food: number
  activities: number
  transportation: number
  total: number
}

export async function generateTripWithAI(preferences: TripPreferences): Promise<GeneratedTrip> {
  try {
    const prompt = `Create a detailed ${preferences.duration}-day travel itinerary for ${preferences.destination}.

Preferences:
- Budget: ${preferences.budget}
- Interests: ${preferences.interests.join(", ")}
- Travel Style: ${preferences.travelStyle}

Please provide a comprehensive itinerary in JSON format with the following structure:
{
  "title": "Trip title",
  "overview": "Brief overview of the trip",
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "activities": [
        {
          "time": "09:00",
          "name": "Activity name",
          "description": "Activity description",
          "location": "Location",
          "cost": "Cost estimate",
          "duration": "Duration"
        }
      ],
      "meals": [
        {
          "type": "breakfast",
          "name": "Restaurant/meal name",
          "location": "Location",
          "cost": "Cost estimate"
        }
      ],
      "accommodation": "Hotel/accommodation name"
    }
  ],
  "budget": {
    "accommodation": 500,
    "food": 300,
    "activities": 200,
    "transportation": 150,
    "total": 1150
  },
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt,
      system:
        "You are a professional travel planner. Provide detailed, practical, and culturally appropriate travel itineraries in valid JSON format.",
    })

    // Parse the AI response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim()
    const parsedTrip = JSON.parse(cleanedText)

    return parsedTrip as GeneratedTrip
  } catch (error) {
    console.error("Error generating trip:", error)

    // Fallback response
    return {
      title: `${preferences.duration}-Day Trip to ${preferences.destination}`,
      overview: `A wonderful ${preferences.duration}-day adventure in ${preferences.destination} tailored to your interests.`,
      itinerary: Array.from({ length: preferences.duration }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1} - Exploring ${preferences.destination}`,
        activities: [
          {
            time: "09:00",
            name: "Morning Exploration",
            description: "Start your day exploring the local area",
            location: preferences.destination,
            cost: "$20",
            duration: "2 hours",
          },
        ],
        meals: [
          {
            type: "breakfast" as const,
            name: "Local Café",
            location: "City Center",
            cost: "$15",
          },
        ],
        accommodation: "Recommended Hotel",
      })),
      budget: {
        accommodation: 400,
        food: 200,
        activities: 150,
        transportation: 100,
        total: 850,
      },
      tips: ["Book accommodations in advance", "Try local cuisine", "Respect local customs"],
    }
  }
}
