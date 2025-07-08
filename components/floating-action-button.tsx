"use client"

import { useState } from "react"
import { Share2, Download, Heart, MessageCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const shareItinerary = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Itinerario Marruecos 5 días",
          text: "Mira este increíble itinerario por Marruecos: Fez, Merzouga y Marrakech",
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("¡Enlace copiado al portapapeles!")
    }
  }

  const downloadItinerary = () => {
    // Create a simple text version of the itinerary
    const itineraryText = `
ITINERARIO MARRUECOS 5 DÍAS
============================

Día 1 - Fez (Jueves)
- Llegada antes de las 16:00h
- Check-in en riad en la medina
- Explorar medina, curtidores y Medersa Bou Inania

Día 2 - Fez → Merzouga (Viernes)
- Mañana en Fez
- Autobús nocturno a Merzouga (19:00h)

Día 3 - Merzouga y Desierto (Sábado)
- Llegada de madrugada
- Paseo en camello al atardecer
- Noche en campamento bereber

Día 4 - Merzouga → Marrakech (Domingo)
- Autobús nocturno a Marrakech (21:00h)

Día 5 - Marrakech y Regreso (Lunes)
- Jardín Majorelle
- Souk de Marrakech
- Plaza Jemaa el-Fna
- Palacio Bahía
- Vuelo de regreso

¡Buen viaje! 🇲🇦
    `

    const blob = new Blob([itineraryText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "itinerario-marruecos.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Secondary buttons */}
      <div
        className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <Button
          size="sm"
          onClick={shareItinerary}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full w-12 h-12 p-0"
        >
          <Share2 size={18} />
        </Button>

        <Button
          size="sm"
          onClick={downloadItinerary}
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full w-12 h-12 p-0"
        >
          <Download size={18} />
        </Button>

        <Button
          size="sm"
          onClick={() => setIsLiked(!isLiked)}
          className={`${isLiked ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 hover:bg-gray-700"} text-white shadow-lg rounded-full w-12 h-12 p-0 transition-colors`}
        >
          <Heart size={18} fill={isLiked ? "white" : "none"} />
        </Button>
      </div>

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#9c6644] hover:bg-[#8b5a3c] text-white shadow-lg rounded-full w-14 h-14 p-0 transition-transform ${isOpen ? "rotate-45" : "rotate-0"}`}
      >
        <MessageCircle size={24} />
      </Button>

      {/* New FAB for scrolling to top */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full shadow-lg bg-[#d4a373] text-white hover:bg-[#c38d5f]"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
      >
        <Plus />
      </Button>
    </div>
  )
}
