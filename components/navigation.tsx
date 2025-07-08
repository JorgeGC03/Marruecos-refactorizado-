"use client"

import { Calendar, Lightbulb, CreditCard, MapPin, Handshake, Link, Menu, Camera } from "lucide-react"
import type { PageType } from "@/app/page"
import { useState } from "react"

interface NavigationProps {
  activePage: PageType
  onPageChange: (page: PageType) => void
}

const navItems = [
  { id: "itinerario" as PageType, label: "Itinerario", icon: Calendar },
  { id: "misiones" as PageType, label: "Misiones", icon: Camera },
  { id: "tips" as PageType, label: "Tips", icon: Lightbulb },
  { id: "presupuesto-diario" as PageType, label: "Presupuesto", icon: CreditCard },
  { id: "mapa" as PageType, label: "Mapa", icon: MapPin },
  { id: "pagos-compartidos" as PageType, label: "Pagos Compartidos", icon: Handshake },
  { id: "enlaces" as PageType, label: "Enlaces", icon: Link },
]

export function Navigation({ activePage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-[#fefae0] border-b-2 border-[#d4a373] sticky top-0 z-50">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center flex-wrap gap-6 py-4">
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

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-semibold text-[#9c6644]">Marruecos</h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-[#9c6644] hover:bg-[#e6ccb2]"
          >
            <Menu size={24} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-[#d4a373] bg-white">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  onPageChange(id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activePage === id
                    ? "text-[#9c6644] bg-[#fefae0] border-r-4 border-[#9c6644]"
                    : "text-gray-700 hover:bg-[#fefae0]"
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
