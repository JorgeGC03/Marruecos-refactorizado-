"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Euro, Lightbulb, Target, Save, Share2, Download, Clock, Star, Heart } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { saveTrip, updateUserProgress } from "@/lib/firebase"

interface GeneratedTripViewProps {
  trip: any
  formData: any
}

export function GeneratedTripView({ trip, formData }: GeneratedTripViewProps) {
  const [activeTab, setActiveTab] = useState("itinerary")
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { user, userProgress, refreshProgress } = useAuth()

  const tabs = [
    { id: "itinerary", label: "Itinerario", icon: Calendar },
    { id: "tips", label: "Tips", icon: Lightbulb },
    { id: "missions", label: "Misiones", icon: Target },
    { id: "budget", label: "Presupuesto", icon: Euro },
  ]

  const handleSaveTrip = async () => {
    if (!user) {
      alert("Debes iniciar sesión para guardar viajes")
      return
    }

    setIsSaving(true)
    try {
      const tripData = {
        title: trip.title,
        destinations: formData.destinations,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budget: formData.budget,
        travelers: formData.travelers,
        interests: formData.interests,
        itinerary: trip.itinerary || [],
        tips: trip.tips || [],
        missions: trip.missions || [],
        budgetBreakdown: trip.budget || {},
        links: trip.links || [],
        isPublic: false,
      }

      await saveTrip(user.uid, tripData)

      // Update user progress
      if (userProgress) {
        await updateUserProgress(user.uid, {
          totalTrips: userProgress.totalTrips + 1,
          totalPoints: userProgress.totalPoints + 50, // Bonus por crear viaje
        })
        await refreshProgress()
      }

      setIsSaved(true)
      alert("¡Viaje guardado exitosamente! 🎉")
    } catch (error) {
      console.error("Error saving trip:", error)
      alert("Error al guardar el viaje. Inténtalo de nuevo.")
    }
    setIsSaving(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: trip.title,
          text: `Mira este increíble itinerario: ${trip.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("¡Enlace copiado al portapapeles!")
    }
  }

  const handleDownload = () => {
    const tripText = `
${trip.title}
${"=".repeat(trip.title.length)}

ITINERARIO:
${
  trip.itinerary
    ?.map(
      (day: any) => `
Día ${day.day} - ${day.city}
${day.title}
${day.activities?.map((act: any) => `• ${act.time} - ${act.activity}: ${act.description}`).join("\n") || ""}
`,
    )
    .join("\n") || ""
}

TIPS:
${trip.tips?.map((tip: any) => `• ${tip.title}: ${tip.description}`).join("\n") || ""}

PRESUPUESTO TOTAL: ${trip.budget?.total}€
Por persona: ${trip.budget?.perPerson}€

¡Buen viaje! 🌍
    `

    const blob = new Blob([tripText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${trip.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Card className="mb-6 bg-gradient-to-r from-[#9c6644] to-[#d4a373] text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{trip.title}</h1>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {trip.itinerary?.length || 0} días
                </span>
                <span className="flex items-center gap-1">
                  <Euro size={16} />
                  {trip.budget?.total}€ total
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} />
                  {trip.missions?.length || 0} misiones
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleShare}>
                <Share2 size={16} className="mr-1" />
                Compartir
              </Button>
              <Button variant="secondary" size="sm" onClick={handleDownload}>
                <Download size={16} className="mr-1" />
                Descargar
              </Button>
              {user && (
                <Button
                  onClick={handleSaveTrip}
                  disabled={isSaving || isSaved}
                  className="bg-white text-[#9c6644] hover:bg-gray-100"
                  size="sm"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-[#9c6644] border-t-transparent rounded-full animate-spin mr-1" />
                  ) : isSaved ? (
                    <Heart size={16} className="mr-1 fill-current" />
                  ) : (
                    <Save size={16} className="mr-1" />
                  )}
                  {isSaved ? "Guardado" : "Guardar Viaje"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 ${
              activeTab === tab.id ? "bg-[#9c6644] text-white" : "text-[#9c6644] hover:bg-[#fefae0]"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "itinerary" && (
        <div className="space-y-4">
          {trip.itinerary?.map((day: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#9c6644]">
                  <Calendar size={20} />
                  Día {day.day} - {day.city}
                </CardTitle>
                <p className="text-sm text-gray-600">{day.title}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {day.activities?.map((activity: any, actIndex: number) => (
                    <div key={actIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#9c6644] min-w-[60px]">
                        <Clock size={14} />
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.activity}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        {activity.location && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin size={12} />
                            {activity.location}
                          </p>
                        )}
                      </div>
                      {activity.cost && (
                        <Badge variant="outline" className="text-[#9c6644]">
                          {activity.cost}€
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "tips" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trip.tips?.map((tip: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="text-[#9c6644] mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {tip.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "missions" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trip.missions?.map((mission: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Target className="text-[#9c6644] mt-1" size={20} />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{mission.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{mission.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <MapPin size={12} />
                      {mission.location?.name}
                    </div>
                    <Badge className="bg-[#9c6644] text-white text-xs">{mission.reward?.description}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "budget" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#9c6644]">
              <Euro size={20} />
              Desglose del Presupuesto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-[#fefae0] rounded-lg">
                <div className="text-2xl font-bold text-[#9c6644]">{trip.budget?.total}€</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center p-4 bg-[#fefae0] rounded-lg">
                <div className="text-2xl font-bold text-[#9c6644]">{trip.budget?.perPerson}€</div>
                <div className="text-sm text-gray-600">Por persona</div>
              </div>
              <div className="text-center p-4 bg-[#fefae0] rounded-lg">
                <div className="text-2xl font-bold text-[#9c6644]">{trip.itinerary?.length || 0}</div>
                <div className="text-sm text-gray-600">Días</div>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(trip.budget?.breakdown || {}).map(([category, amount]: [string, any]) => (
                <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="capitalize font-medium">{category}</span>
                  <span className="font-bold text-[#9c6644]">{amount}€</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
