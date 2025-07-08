export interface TripPreferences {
  destination: string
  duration: number
  budget: string
  interests: string[]
  travelStyle: string
}

export interface GeneratedTrip {
  title: string
  description: string
  days: Array<{
    day: number
    title: string
    activities: string[]
    meals: string[]
    accommodation?: string
  }>
  budget: {
    total: string
    breakdown: Record<string, string>
  }
  tips: string[]
}

export async function generateTripWithAI(preferences: TripPreferences): Promise<GeneratedTrip> {
  // Mock AI generation - replace with actual AI service call
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    title: `${preferences.duration} días en ${preferences.destination}`,
    description: `Un viaje increíble de ${preferences.duration} días por ${preferences.destination} adaptado a tu estilo de viaje ${preferences.travelStyle}.`,
    days: Array.from({ length: preferences.duration }, (_, i) => ({
      day: i + 1,
      title: `Día ${i + 1} - Explorando ${preferences.destination}`,
      activities: ["Visita a lugares emblemáticos", "Experiencia cultural local", "Tiempo libre para explorar"],
      meals: ["Desayuno en hotel", "Almuerzo en restaurante local", "Cena tradicional"],
      accommodation: i === 0 ? "Hotel recomendado en el centro" : undefined,
    })),
    budget: {
      total: preferences.budget,
      breakdown: {
        Alojamiento: "40%",
        Comida: "30%",
        Actividades: "20%",
        Transporte: "10%",
      },
    },
    tips: [
      "Lleva ropa cómoda para caminar",
      "Prueba la comida local",
      "Respeta las costumbres locales",
      "Mantén tus documentos seguros",
    ],
  }
}
