"use client"
import {
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

export function ItinerarySection() {
  const days = [
    {
      day: "Día 1",
      city: "Fez",
      highlight: "Medina y tanneries",
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
      day: "Día 2",
      city: "Fez → Merzouga",
      highlight: "Ruta por el Atlas",
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
      day: "Día 3",
      city: "Merzouga",
      highlight: "Noche en el desierto",
      icon: Tent,
      activities: [
        { icon: Sun, text: "Madrugada: Llegada a Merzouga." },
        { icon: Hotel, text: "Te recibirán en un campamento o riad cercano para el check-in." },
        {
          icon: Sparkles,
          text: "Comienza tu experiencia en el desierto: Disfruta de un inolvidable paseo en camello al atardecer por las dunas.",
        },
        {
          icon: Tent,
          text: "Noche: Duerme en un auténtico campamento bereber en las dunas del desierto de Erg Chebbi.",
        },
        { icon: ShoppingBag, text: "Precio aprox. 65 USD por persona (incluye paseo en camello, cena y desayuno)." },
      ],
    },
    {
      day: "Día 4",
      city: "Merzouga → Marrakech",
      highlight: "Aït-Ben-Haddou",
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
      day: "Día 5",
      city: "Marrakech",
      highlight: "Plaza Jemaa el-Fna",
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

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Itinerario</h2>
      <ol className="space-y-3">
        {days.map((d) => (
          <li key={d.day} className="border-l-2 pl-4">
            <p className="font-medium">
              {d.day} – {d.city}
            </p>
            <p className="text-sm opacity-80">{d.highlight}</p>
            {d.activities && (
              <ul className="space-y-2 sm:space-y-3 mt-2">
                {d.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="flex items-start gap-3">
                    <activity.icon size={14} className="text-[#9c6644] mt-1 flex-shrink-0 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm leading-relaxed">{activity.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
