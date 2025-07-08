import {
  Calendar,
  Plane,
  Hotel,
  MapPin,
  Bus,
  Bed,
  Sun,
  Sparkles,
  Tent,
  Route,
  Clock,
  Utensils,
  ShoppingBag,
  Building,
} from "lucide-react"

const days = [
  {
    title: "Día 1 - Llegada a Fez (Jueves)",
    icon: Plane,
    activities: [
      { icon: Clock, text: "Llegada a Fez antes de las 16:00h." },
      { icon: Hotel, text: "Check-in en un riad económico dentro de la medina." },
      {
        icon: MapPin,
        text: "Tarde: Explora la medina de Fez, visita los famosos curtidores y la histórica Medersa Bou Inania.",
      },
      { icon: Bed, text: "Noche en Fez." },
    ],
  },
  {
    title: "Día 2 - Fez → Merzouga (Viernes Noche)",
    icon: Bus,
    activities: [
      { icon: Sun, text: "Mañana: Completa las visitas pendientes en Fez." },
      { icon: Utensils, text: "Cena temprana." },
      { icon: Bus, text: "Noche (19:00h aprox.): Autobús Supratours a Merzouga." },
      {
        icon: Route,
        text: "Salida a las 19:00h y llegada a Merzouga sobre las 06:00h del día siguiente (aprox. 11 horas de viaje).",
      },
      { icon: ShoppingBag, text: "Precio aprox. 25€ por persona." },
    ],
  },
  {
    title: "Día 3 - Merzouga y Desierto (Sábado)",
    icon: Tent,
    activities: [
      { icon: Sun, text: "Madrugada: Llegada a Merzouga." },
      { icon: Hotel, text: "Te recibirán en un campamento o riad cercano para el check-in." },
      {
        icon: Sparkles,
        text: "Comienza tu experiencia en el desierto: Disfruta de un inolvidable paseo en camello al atardecer por las dunas.",
      },
      { icon: Tent, text: "Noche: Duerme en un auténtico campamento bereber en las dunas del desierto de Erg Chebbi." },
      { icon: ShoppingBag, text: "Precio aprox. 65 USD por persona (incluye paseo en camello, cena y desayuno)." },
    ],
  },
  {
    title: "Día 4 - Merzouga → Marrakech (Domingo)",
    icon: MapPin,
    activities: [
      { icon: Route, text: "Opción 1 (Recomendada): Autobús nocturno directo Merzouga → Marrakech." },
      {
        icon: Bus,
        text: "Salida a las 21:00h y llegada a Marrakech sobre las 18:00h del lunes (aprox. 21 horas de viaje con paradas).",
      },
      { icon: ShoppingBag, text: "Precio aprox. 37€ por persona." },
      { icon: Hotel, text: "Llegada a Marrakech el domingo tarde o lunes madrugada." },
    ],
  },
  {
    title: "Día 5 - Marrakech y Regreso (Lunes)",
    icon: Plane,
    activities: [
      {
        icon: Sun,
        text: "Día completo para explorar Marrakech (si llegaste el domingo) o mañana libre (si llegaste el lunes de madrugada).",
      },
      { icon: MapPin, text: "Visita el hermoso Jardín Majorelle." },
      { icon: ShoppingBag, text: "Piérdete en el laberíntico Souk (Zoco) de Marrakech." },
      { icon: Utensils, text: "Explora la vibrante Plaza Jemaa el-Fna." },
      { icon: Building, text: "Admira la arquitectura del Palacio Bahía." },
      { icon: Plane, text: "Vuelo de regreso el lunes antes de las 16:00h." },
    ],
  },
]

export function ItinerarySection() {
  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
        <Calendar className="text-[#9c6644]" />
        Nuestro Viaje Día a Día
      </h2>
      <div className="space-y-6">
        {days.map((day, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-[#d4a373]/20">
            <h3 className="flex items-center gap-3 text-xl font-semibold mb-4 text-[#9c6644]">
              <day.icon size={24} />
              {day.title}
            </h3>
            <ul className="space-y-3">
              {day.activities.map((activity, actIndex) => (
                <li key={actIndex} className="flex items-start gap-3">
                  <activity.icon size={16} className="text-[#9c6644] mt-1 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{activity.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
