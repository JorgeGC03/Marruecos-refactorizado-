"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Euro, Sparkles, Loader2 } from "lucide-react"
import { generateTripWithAI } from "@/lib/ai-service"

interface TripFormData {
  destinations: string[]
  startDate: string
  endDate: string
  budget: number
  travelers: number
  interests: string[]
}

const interestOptions = [
  "Historia",
  "Gastronomía",
  "Naturaleza",
  "Aventura",
  "Cultura",
  "Playa",
  "Montaña",
  "Arquitectura",
  "Vida nocturna",
  "Compras",
  "Fotografía",
  "Arte",
  "Museos",
  "Deportes",
  "Relax",
]

export function TripWizard({ onTripGenerated }: { onTripGenerated: (trip: any) => void }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<TripFormData>({
    destinations: [],
    startDate: "",
    endDate: "",
    budget: 1000,
    travelers: 2,
    interests: [],
  })

  const addDestination = (destination: string) => {
    if (destination.trim() && !formData.destinations.includes(destination.trim())) {
      setFormData((prev) => ({
        ...prev,
        destinations: [...prev.destinations, destination.trim()],
      }))
    }
  }

  const removeDestination = (destination: string) => {
    setFormData((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((d) => d !== destination),
    }))
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const generateTrip = async () => {
    setLoading(true)
    try {
      const generatedTrip = await generateTripWithAI(formData)
      onTripGenerated(generatedTrip)
    } catch (error) {
      console.error("Error:", error)
      alert("Error al generar el viaje. Inténtalo de nuevo.")
    }
    setLoading(false)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.destinations.length > 0
      case 2:
        return formData.startDate && formData.endDate
      case 3:
        return formData.budget > 0 && formData.travelers > 0
      case 4:
        return formData.interests.length > 0
      default:
        return false
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-[#9c6644]" />
            Crear Viaje Personalizado - Paso {step}/4
          </CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#9c6644] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-[#9c6644]" />
                <h3 className="text-lg font-semibold">¿Dónde quieres ir?</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="destination">Añadir destino</Label>
                  <div className="flex gap-2">
                    <Input
                      id="destination"
                      placeholder="Ej: Madrid, Barcelona, París..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addDestination(e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        const input = document.getElementById("destination") as HTMLInputElement
                        addDestination(input.value)
                        input.value = ""
                      }}
                      variant="outline"
                    >
                      Añadir
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.destinations.map((dest) => (
                    <Badge
                      key={dest}
                      variant="secondary"
                      className="cursor-pointer hover:bg-red-100"
                      onClick={() => removeDestination(dest)}
                    >
                      {dest} ✕
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-[#9c6644]" />
                <h3 className="text-lg font-semibold">¿Cuándo viajas?</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Fecha de inicio</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Fecha de fin</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                    min={formData.startDate}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Euro className="text-[#9c6644]" />
                <h3 className="text-lg font-semibold">Presupuesto y viajeros</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Presupuesto total (€)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                    min="100"
                    step="50"
                  />
                </div>
                <div>
                  <Label htmlFor="travelers">Número de viajeros</Label>
                  <Input
                    id="travelers"
                    type="number"
                    value={formData.travelers}
                    onChange={(e) => setFormData((prev) => ({ ...prev, travelers: Number(e.target.value) }))}
                    min="1"
                    max="10"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#fefae0] rounded-lg">
                <p className="text-sm text-[#9c6644]">
                  <strong>Presupuesto por persona:</strong> {(formData.budget / formData.travelers).toFixed(0)}€
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-[#9c6644]" />
                <h3 className="text-lg font-semibold">¿Qué te interesa?</h3>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {interestOptions.map((interest) => (
                  <Badge
                    key={interest}
                    variant={formData.interests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer text-center p-2 ${
                      formData.interests.includes(interest) ? "bg-[#9c6644] text-white" : "hover:bg-[#fefae0]"
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-4">Selecciona al menos un interés para personalizar tu viaje</p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Anterior
              </Button>
            )}

            <div className="ml-auto">
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="bg-[#9c6644] hover:bg-[#8b5a3c]"
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  onClick={generateTrip}
                  disabled={!canProceed() || loading}
                  className="bg-[#9c6644] hover:bg-[#8b5a3c]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando viaje...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      ¡Crear mi viaje!
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
