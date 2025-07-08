import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

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

// CHANGE: rename function
export async function generateTripWithAI(preferences: TripPreferences): Promise<GeneratedTrip> {
  try {
    const prompt = `Generate a detailed ${preferences.duration}-day Morocco travel itinerary for ${preferences.groupSize} people with a ${preferences.budget} budget. 
    
    Interests: ${preferences.interests.join(", ")}
    Accommodation preference: ${preferences.accommodation}
    Transportation: ${preferences.transportation}
    
    Please provide a JSON response with the following structure:
    {
      "title": "Trip title",
      "description": "Brief description",
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
              "cost": 50,
              "duration": "2 hours"
            }
          ],
          "meals": [
            {
              "type": "breakfast",
              "name": "Meal name",
              "location": "Restaurant location",
              "cost": 15
            }
          ],
          "accommodation": "Hotel name and location"
        }
      ],
      "estimatedCost": 1200,
      "recommendations": ["Recommendation 1", "Recommendation 2"]
    }
    
    Focus on authentic Moroccan experiences, include specific locations in Morocco, and provide realistic costs in USD.`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt,
      temperature: 0.7,
    })

    // Parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim()
    const generatedTrip = JSON.parse(cleanedText) as GeneratedTrip

    return generatedTrip
  } catch (error) {
    console.error("Error generating trip:", error)

    // Return a fallback trip if AI generation fails
    return {
      title: "5-Day Morocco Adventure",
      description: "A wonderful journey through Morocco's imperial cities and desert landscapes.",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Marrakech",
          activities: [
            {
              time: "14:00",
              name: "Jemaa el-Fnaa Square",
              description: "Explore the famous main square of Marrakech",
              location: "Medina, Marrakech",
              cost: 0,
              duration: "2 hours",
            },
          ],
          meals: [
            {
              type: "dinner",
              name: "Traditional Tagine",
              location: "Local restaurant in Medina",
              cost: 25,
            },
          ],
          accommodation: "Riad in Marrakech Medina",
        },
      ],
      estimatedCost: 800,
      recommendations: [
        "Learn basic Arabic phrases",
        "Dress modestly when visiting religious sites",
        "Bargain respectfully in souks",
      ],
    }
  }
}

// OPTIONAL alias so old & new code compile
export { generateTripWithAI as generateTrip }
