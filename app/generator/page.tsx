"use client"

import { useState } from "react"
import { TripWizard } from "@/components/trip-generator/TripWizard"
import { GeneratedTripView } from "@/components/trip-generator/GeneratedTripView"

export default function GeneratorPage() {
  const [generatedTrip, setGeneratedTrip] = useState(null)
  const [formData, setFormData] = useState(null)

  const handleTripGenerated = (trip: any, form: any) => {
    setGeneratedTrip(trip)
    setFormData(form)
  }

  return (
    <div className="min-h-screen bg-[#fffaf1] py-8">
      <div className="container mx-auto px-4">
        {!generatedTrip ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#9c6644] mb-4">🤖 Generador de Viajes con IA</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Crea un itinerario personalizado en segundos. Solo dinos dónde quieres ir, cuándo y qué te gusta, y
                nuestra IA creará el viaje perfecto para ti.
              </p>
            </div>
            <TripWizard onTripGenerated={handleTripGenerated} />
          </div>
        ) : (
          <GeneratedTripView trip={generatedTrip} formData={formData} />
        )}
      </div>
    </div>
  )
}
