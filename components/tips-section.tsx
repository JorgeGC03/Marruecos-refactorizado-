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
    description: "Souk de Fez y Zoco de Marrakech son perfectos para comprar artesanía y recuerdos.",
  },
  {
    icon: Camera,
    title: "Lugares turísticos",
    description: "Medinas, palacios, mezquitas, desierto de Merzouga y mucho más por descubrir.",
  },
  {
    icon: Users,
    title: "Interactuar",
    description: 'Sé respetuoso con las costumbres locales. Saluda con "Salam alaikum".',
  },
  {
    icon: CreditCard,
    title: "Moneda",
    description: "La moneda es el Dirham marroquí (MAD). Lleva efectivo para mercados pequeños.",
  },
]

export function TipsSection() {
  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
        <Camera className="text-[#9c6644]" />
        Tips y Recomendaciones
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white border-2 border-[#d4a373] rounded-lg p-4 sm:p-6 text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-[#e6ccb2] cursor-pointer"
          >
            <tip.icon size={32} className="text-[#9c6644] mx-auto mb-3 sm:w-10 sm:h-10" />
            <h3 className="font-semibold mb-2 text-sm sm:text-base">{tip.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
