// Empezamos con Groq (gratis y rápido)
interface TripRequest {
  destinations: string[]
  startDate: string
  endDate: string
  budget: number
  travelers: number
  interests: string[]
}

interface DayPlan {
  day: number
  date: string
  city: string
  title: string
  activities: {
    time: string
    activity: string
    description: string
    cost: number
    location: string
  }[]
}

interface Tip {
  id: string
  category: string
  title: string
  description: string
  priority: string
}

interface Mission {
  id: string
  city: string
  title: string
  description: string
  location: {
    name: string
    lat: number
    lng: number
    radius: number
  }
  reward: {
    type: string
    value: number
    description: string
  }
}

interface BudgetBreakdown {
  total: number
  perPerson: number
  breakdown: {
    transport: number
    accommodation: number
    food: number
    activities: number
    shopping: number
  }
}

interface UsefulLink {
  title: string
  url: string
  description: string
  category: string
}

interface GeneratedTrip {
  title: string
  itinerary: DayPlan[]
  tips: Tip[]
  missions: Mission[]
  budget: BudgetBreakdown
  links: UsefulLink[]
}

export async function generateTripWithAI(request: TripRequest): Promise<GeneratedTrip> {
  const prompt = `
Genera un itinerario completo en JSON para un viaje con estas características:
- Destinos: ${request.destinations.join(", ")}
- Fechas: ${request.startDate} a ${request.endDate}
- Presupuesto total: ${request.budget}€ para ${request.travelers} personas
- Intereses: ${request.interests.join(", ")}

Devuelve SOLO un JSON válido con esta estructura exacta:
{
  "title": "Título creativo del viaje",
  "itinerary": [
    {
      "day": 1,
      "date": "2025-03-15",
      "city": "Madrid",
      "title": "Llegada y primeras impresiones",
      "activities": [
        {
          "time": "10:00",
          "activity": "Llegada al aeropuerto",
          "description": "Recogida de equipaje y traslado",
          "cost": 25,
          "location": "Aeropuerto Barajas"
        }
      ]
    }
  ],
  "tips": [
    {
      "id": "tip1",
      "category": "transporte",
      "title": "Cómo moverse",
      "description": "Consejos específicos de transporte",
      "priority": "high"
    }
  ],
  "missions": [
    {
      "id": "mission1",
      "city": "Madrid",
      "title": "Explorador del Centro",
      "description": "Toma una foto en la Puerta del Sol",
      "location": {
        "name": "Puerta del Sol",
        "lat": 40.4169,
        "lng": -3.7035,
        "radius": 50
      },
      "reward": {
        "type": "points",
        "value": 100,
        "description": "+100 puntos de explorador"
      }
    }
  ],
  "budget": {
    "total": ${request.budget},
    "perPerson": ${request.budget / request.travelers},
    "breakdown": {
      "transport": 200,
      "accommodation": 300,
      "food": 250,
      "activities": 150,
      "shopping": 100
    }
  },
  "links": [
    {
      "title": "Reservar vuelos",
      "url": "https://www.skyscanner.es",
      "description": "Encuentra los mejores precios",
      "category": "transport"
    }
  ]
}
`

  try {
    // Usando Groq API (gratis)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Eres un experto planificador de viajes. Respondes SOLO con JSON válido, sin texto adicional.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    const data = await response.json()
    const content = data.choices[0].message.content

    // Limpiar y parsear el JSON
    const cleanedContent = content.replace(/```json\n?|\n?```/g, "").trim()
    return JSON.parse(cleanedContent)
  } catch (error) {
    console.error("Error generating trip:", error)
    throw new Error("No se pudo generar el viaje. Inténtalo de nuevo.")
  }
}
