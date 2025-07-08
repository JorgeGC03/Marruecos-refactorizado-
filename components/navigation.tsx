"use client"

import { Calendar, Lightbulb, CreditCard, MapPin, Handshake, Link } from "lucide-react"
import type { PageType } from "@/app/page"

interface NavigationProps {
  activePage: PageType
  onPageChange: (page: PageType) => void
}

const navItems = [
  { id: "itinerario" as PageType, label: "Itinerario", icon: Calendar },
  { id: "tips" as PageType, label: "Tips", icon: Lightbulb },
  { id: "presupuesto-diario" as PageType, label: "Presupuesto", icon: CreditCard },
  { id: "mapa" as PageType, label: "Mapa", icon: MapPin },
  { id: "pagos-compartidos" as PageType, label: "Pagos Compartidos", icon: Handshake },
  { id: "enlaces" as PageType, label: "Enlaces", icon: Link },
]

export function Navigation({ activePage, onPageChange }: NavigationProps) {
  return (
    <nav className="bg-[#fefae0] border-b-2 border-[#d4a373] sticky top-0 z-50">
      <div className="flex justify-center flex-wrap gap-6 py-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activePage === id
                ? "text-[#9c6644] bg-white shadow-md"
                : "text-[#9c6644] hover:text-[#d4a373] hover:bg-[#e6ccb2]"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
