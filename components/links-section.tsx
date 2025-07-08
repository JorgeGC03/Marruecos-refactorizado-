import { Link, Bus, Plane, Hotel, ArrowRightLeft } from "lucide-react"

const links = [
  {
    href: "https://12go.asia/es/travel/fes/marrakesh?date=2025-09-13&people=2",
    icon: Bus,
    title: "Reservar Autobuses",
    description: "Encuentra y reserva tus billetes de autobús entre ciudades.",
  },
  {
    href: "https://www.skyscanner.es",
    icon: Plane,
    title: "Buscar Vuelos Baratos",
    description: "Compara precios y encuentra las mejores ofertas de vuelos.",
  },
  {
    href: "https://www.booking.com",
    icon: Hotel,
    title: "Buscar Alojamientos",
    description: "Encuentra y reserva riads y hoteles para tu estancia.",
  },
  {
    href: "https://www.xe.com/currencyconverter/convert/?Amount=1&From=MAD&To=EUR",
    icon: ArrowRightLeft,
    title: "Convertidor de Moneda",
    description: "Convierte Dirhams marroquíes a Euros de forma rápida.",
  },
]

export function LinksSection() {
  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
        <Link className="text-[#9c6644]" />
        Enlaces útiles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-[#d4a373] rounded-lg p-6 text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-[#e6ccb2] block text-[#2e1e0f] no-underline"
          >
            <link.icon size={40} className="text-[#9c6644] mx-auto mb-3" />
            <h3 className="font-semibold mb-2">{link.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
