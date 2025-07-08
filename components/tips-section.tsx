"use client"
import { Utensils, Coffee, Store, Camera, Users, CreditCard } from "lucide-react"

const tips = [
  {
    icon: Utensils,
    title: "Comidas típicas",
    description: "Prueba tajine, couscous, harira y pastilla. Cocina marroquí deliciosa y especiada.",
  },
  {
    icon: Coffee,
    title: "Bebidas recomendadas",
    description: "No te pierdas el té de menta y los zumos naturales en los zocos.",
  },
  {
    icon: Store,
    title: "Mercados locales",
    description:
      "Souk de Fez y Zoco de Marrakech son perfectos para comprar artesanía y recuerdos. Regatea siempre en los zocos.",
  },
  {
    icon: Camera,
    title: "Lugares turísticos",
    description:
      "Medinas, palacios, mezquitas, desierto de Merzouga y mucho más por descubrir. Hidrátate: el desierto es seco incluso en invierno.",
  },
  {
    icon: Users,
    title: "Interactuar",
    description: 'Sé respetuoso con las costumbres locales. Saluda con "Salam alaikum".',
  },
  {
    icon: CreditCard,
    title: "Moneda",
    description: "La moneda es el Dirham marroquí (MAD). Lleva efectivo; no todos aceptan tarjeta.",
  },
]

export function TipsSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Consejos de viaje</h2>
      <ul className="list-disc list-inside">
        {tips.map((tip, index) => (
          <li key={index}>
            <div className="bg-white border-2 border-[#d4a373] rounded-lg p-4 sm:p-6 text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-[#e6ccb2] cursor-pointer">
              {tip.icon && <tip.icon size={32} className="text-[#9c6644] mx-auto mb-3 sm:w-10 sm:h-10" />}
              <h3 className="font-semibold mb-2 text-sm sm:text-base">{tip.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{tip.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
