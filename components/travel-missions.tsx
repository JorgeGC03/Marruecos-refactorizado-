"use client"

import { useState, useEffect } from "react"
import { Camera, MapPin, Trophy, Star, Gift, Medal, Crown, Zap, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface Mission {
  id: string
  city: string
  title: string
  description: string
  location: {
    name: string
    coordinates: { lat: number; lng: number }
    radius: number // meters
  }
  reward: {
    type: "points" | "badge" | "title"
    value: number | string
    icon: any
    description: string
  }
  completed: boolean
  photo?: string
}

interface ModalState {
  isOpen: boolean
  type: "success" | "error" | "info"
  title: string
  message: string
  mission?: Mission
}

const missions: Mission[] = [
  {
    id: "fez-medina",
    city: "Fez",
    title: "🕌 Explorador de la Medina",
    description: "Toma una foto en el corazón de la medina de Fez",
    location: {
      name: "Medina de Fez",
      coordinates: { lat: 34.0631, lng: -4.9998 },
      radius: 200,
    },
    reward: {
      type: "points",
      value: 100,
      icon: Star,
      description: "+100 puntos de explorador",
    },
    completed: false,
  },
  {
    id: "fez-tanneries",
    city: "Fez",
    title: "🎨 Maestro de los Curtidores",
    description: "Captura los famosos curtidores de Fez desde el mirador",
    location: {
      name: "Curtidores de Fez",
      coordinates: { lat: 34.0644, lng: -4.9976 },
      radius: 50,
    },
    reward: {
      type: "badge",
      value: "Artesano",
      icon: Medal,
      description: "Insignia de Artesano Marroquí",
    },
    completed: false,
  },
  {
    id: "merzouga-camel",
    city: "Merzouga",
    title: "🐪 Jinete del Desierto",
    description: "Selfie montando en camello en las dunas de Erg Chebbi",
    location: {
      name: "Dunas de Erg Chebbi",
      coordinates: { lat: 31.0801, lng: -4.0142 },
      radius: 1000,
    },
    reward: {
      type: "title",
      value: "Nómada del Sahara",
      icon: Crown,
      description: "Título especial: Nómada del Sahara",
    },
    completed: false,
  },
  {
    id: "merzouga-sunset",
    city: "Merzouga",
    title: "🌅 Cazador de Atardeceres",
    description: "Fotografía el atardecer desde lo alto de una duna",
    location: {
      name: "Dunas de Merzouga",
      coordinates: { lat: 31.0801, lng: -4.0142 },
      radius: 1000,
    },
    reward: {
      type: "points",
      value: 150,
      icon: Zap,
      description: "+150 puntos + Bonus de fotografía",
    },
    completed: false,
  },
  {
    id: "marrakech-jemaa",
    city: "Marrakech",
    title: "🎪 Alma de la Plaza",
    description: "Foto en la Plaza Jemaa el-Fna durante el atardecer",
    location: {
      name: "Plaza Jemaa el-Fna",
      coordinates: { lat: 31.6259, lng: -7.9893 },
      radius: 100,
    },
    reward: {
      type: "badge",
      value: "Corazón de Marrakech",
      icon: Trophy,
      description: "Insignia Corazón de Marrakech",
    },
    completed: false,
  },
  {
    id: "marrakech-majorelle",
    city: "Marrakech",
    title: "💙 Jardín Azul",
    description: "Captura el icónico azul Majorelle en el jardín",
    location: {
      name: "Jardín Majorelle",
      coordinates: { lat: 31.6417, lng: -8.0033 },
      radius: 50,
    },
    reward: {
      type: "points",
      value: 120,
      icon: Gift,
      description: "+120 puntos de belleza",
    },
    completed: false,
  },
  {
    id: 1,
    city: "General",
    title: "Tomar té a la menta con un local",
    description: "Tomar té a la menta con un local",
    location: {
      name: "General",
      coordinates: { lat: 0, lng: 0 },
      radius: 0,
    },
    reward: {
      type: "points",
      value: 50,
      icon: Star,
      description: "+50 puntos de cultura",
    },
    completed: false,
  },
  {
    id: 2,
    city: "General",
    title: "Aprender 3 palabras en árabe",
    description: "Aprender 3 palabras en árabe",
    location: {
      name: "General",
      coordinates: { lat: 0, lng: 0 },
      radius: 0,
    },
    reward: {
      type: "badge",
      value: "Bilingüe",
      icon: Medal,
      description: "Insignia de Bilingüe",
    },
    completed: false,
  },
  {
    id: 3,
    city: "General",
    title: "Ver el amanecer en el desierto",
    description: "Ver el amanecer en el desierto",
    location: {
      name: "General",
      coordinates: { lat: 0, lng: 0 },
      radius: 0,
    },
    reward: {
      type: "title",
      value: "Observador del Desierto",
      icon: Crown,
      description: "Título especial: Observador del Desierto",
    },
    completed: false,
  },
]

export function TravelMissions() {
  const [userMissions, setUserMissions] = useState<Mission[]>(missions)
  const [totalPoints, setTotalPoints] = useState(0)
  const [userBadges, setUserBadges] = useState<string[]>([])
  const [userTitles, setUserTitles] = useState<string[]>([])
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  })

  // Load progress from localStorage
  useEffect(() => {
    const savedMissions = localStorage.getItem("morocco-missions")
    const savedPoints = localStorage.getItem("morocco-points")
    const savedBadges = localStorage.getItem("morocco-badges")
    const savedTitles = localStorage.getItem("morocco-titles")

    if (savedMissions) {
      setUserMissions(JSON.parse(savedMissions))
    }
    if (savedPoints) {
      setTotalPoints(Number.parseInt(savedPoints))
    }
    if (savedBadges) {
      setUserBadges(JSON.parse(savedBadges))
    }
    if (savedTitles) {
      setUserTitles(JSON.parse(savedTitles))
    }
  }, [])

  const showModal = (type: ModalState["type"], title: string, message: string, mission?: Mission) => {
    setModal({ isOpen: true, type, title, message, mission })
  }

  const closeModal = () => {
    setModal({ isOpen: false, type: "info", title: "", message: "" })
  }

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalización no soportada"))
        return
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      })
    })
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  const completeMission = (mission: Mission) => {
    // Complete the mission
    const updatedMissions = userMissions.map((m) =>
      m.id === mission.id ? { ...m, completed: true, photo: `photo-${Date.now()}` } : m,
    )

    // Award rewards
    let newPoints = totalPoints
    const newBadges = [...userBadges]
    const newTitles = [...userTitles]

    if (mission.reward.type === "points") {
      newPoints += mission.reward.value as number
    } else if (mission.reward.type === "badge") {
      newBadges.push(mission.reward.value as string)
    } else if (mission.reward.type === "title") {
      newTitles.push(mission.reward.value as string)
    }

    // Update state
    setUserMissions(updatedMissions)
    setTotalPoints(newPoints)
    setUserBadges(newBadges)
    setUserTitles(newTitles)

    // Save to localStorage
    localStorage.setItem("morocco-missions", JSON.stringify(updatedMissions))
    localStorage.setItem("morocco-points", newPoints.toString())
    localStorage.setItem("morocco-badges", JSON.stringify(newBadges))
    localStorage.setItem("morocco-titles", JSON.stringify(newTitles))

    showModal("success", "¡Misión Completada! 🎉", mission.reward.description, mission)
  }

  const takeMissionPhoto = async (missionId: string) => {
    try {
      // Get current location
      const position = await getCurrentLocation()
      const userLat = position.coords.latitude
      const userLng = position.coords.longitude

      // Find the mission
      const mission = userMissions.find((m) => m.id === missionId)
      if (!mission) return

      // Check if user is within the required radius
      const distance = calculateDistance(
        userLat,
        userLng,
        mission.location.coordinates.lat,
        mission.location.coordinates.lng,
      )

      if (distance > mission.location.radius) {
        showModal(
          "error",
          "¡Estás demasiado lejos! 📍",
          `Necesitas estar a menos de ${mission.location.radius}m de ${mission.location.name}.\n\nDistancia actual: ${Math.round(distance)}m`,
        )
        return
      }

      // Show confirmation modal
      showModal(
        "info",
        `¡Perfecto! 📸`,
        `Estás en ${mission.location.name}. ¿Quieres completar esta misión y obtener tu recompensa?`,
        mission,
      )
    } catch (error) {
      console.error("Error:", error)
      showModal(
        "error",
        "Error de Ubicación 🚫",
        "No se pudo acceder a tu ubicación. Asegúrate de permitir el acceso a la geolocalización en tu navegador.",
      )
    }
  }

  const groupedMissions = userMissions.reduce(
    (acc, mission) => {
      if (!acc[mission.city]) {
        acc[mission.city] = []
      }
      acc[mission.city].push(mission)
      return acc
    },
    {} as Record<string, Mission[]>,
  )

  const completedMissions = userMissions.filter((m) => m.completed).length
  const progressPercentage = (completedMissions / userMissions.length) * 100

  return (
    <div>
      <div className="flex items-center gap-3 text-2xl font-bold mb-6">
        <Camera className="text-[#9c6644]" />
        Misiones de Viaje
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-[#9c6644] to-[#d4a373] rounded-lg p-4 text-white mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-xs opacity-90">Puntos</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {completedMissions}/{userMissions.length}
            </div>
            <div className="text-xs opacity-90">Misiones</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{userBadges.length}</div>
            <div className="text-xs opacity-90">Insignias</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{userTitles.length}</div>
            <div className="text-xs opacity-90">Títulos</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progreso Total</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      {(userBadges.length > 0 || userTitles.length > 0) && (
        <div className="bg-white rounded-lg p-4 shadow-lg mb-6">
          <h3 className="font-semibold text-[#9c6644] mb-3">🏆 Tus Logros</h3>
          <div className="space-y-2">
            {userBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Medal size={16} className="text-yellow-500" />
                <span>Insignia: {badge}</span>
              </div>
            ))}
            {userTitles.map((title, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Crown size={16} className="text-purple-500" />
                <span>Título: {title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missions by City */}
      {Object.entries(groupedMissions).map(([city, cityMissions]) => (
        <div key={city} className="mb-8">
          <h3 className="text-xl font-semibold text-[#9c6644] mb-4 flex items-center gap-2">
            <MapPin size={20} />
            {city}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cityMissions.map((mission) => (
              <div
                key={mission.id}
                className={`bg-white rounded-lg p-4 shadow-lg border-2 transition-all duration-300 ${
                  mission.completed ? "border-green-400 bg-green-50" : "border-[#d4a373] hover:border-[#9c6644]"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm sm:text-base mb-1">{mission.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{mission.description}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} />
                      {mission.location.name}
                    </div>
                  </div>

                  {mission.completed && (
                    <div className="text-green-500">
                      <Trophy size={20} />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <mission.reward.icon size={14} className="text-[#9c6644]" />
                    <span>{mission.reward.description}</span>
                  </div>

                  {!mission.completed && (
                    <Button
                      onClick={() => takeMissionPhoto(mission.id)}
                      size="sm"
                      className="bg-[#9c6644] hover:bg-[#8b5a3c] text-xs px-3 py-1"
                    >
                      <Camera size={12} className="mr-1" />
                      Completar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
        <p className="text-blue-800">
          <strong>💡 Cómo funciona:</strong> Cuando estés en cada ubicación, usa el botón "Completar" para verificar tu
          ubicación y completar la misión. ¡Gana puntos, insignias y títulos especiales explorando Marruecos!
        </p>
      </div>

      {/* Modal */}
      <Dialog open={modal.isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {modal.type === "success" && <CheckCircle className="text-green-500" size={24} />}
              {modal.type === "error" && <AlertTriangle className="text-red-500" size={24} />}
              {modal.type === "info" && <Camera className="text-[#9c6644]" size={24} />}
              {modal.title}
            </DialogTitle>
            <DialogDescription className="whitespace-pre-line text-center py-4">{modal.message}</DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 justify-center">
            {modal.type === "info" && modal.mission && (
              <>
                <Button
                  onClick={() => {
                    completeMission(modal.mission!)
                    closeModal()
                  }}
                  className="bg-[#9c6644] hover:bg-[#8b5a3c]"
                >
                  ¡Sí, completar misión!
                </Button>
                <Button onClick={closeModal} variant="outline">
                  Cancelar
                </Button>
              </>
            )}

            {modal.type !== "info" && (
              <Button onClick={closeModal} className="bg-[#9c6644] hover:bg-[#8b5a3c]">
                Entendido
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
