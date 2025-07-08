"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { ItinerarySection } from "@/components/itinerary-section"
import { TipsSection } from "@/components/tips-section"
import { BudgetSection } from "@/components/budget-section"
import { MapSection } from "@/components/map-section"
import { SharedPaymentsSection } from "@/components/shared-payments-section"
import { LinksSection } from "@/components/links-section"
import { Footer } from "@/components/footer"

export type PageType = "itinerario" | "tips" | "presupuesto-diario" | "mapa" | "pagos-compartidos" | "enlaces"

export default function Home() {
  const [activePage, setActivePage] = useState<PageType>("itinerario")

  const renderContent = () => {
    switch (activePage) {
      case "itinerario":
        return <ItinerarySection />
      case "tips":
        return <TipsSection />
      case "presupuesto-diario":
        return <BudgetSection />
      case "mapa":
        return <MapSection />
      case "pagos-compartidos":
        return <SharedPaymentsSection />
      case "enlaces":
        return <LinksSection />
      default:
        return <ItinerarySection />
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf1] text-[#2e1e0f]">
      <Header />
      <Navigation activePage={activePage} onPageChange={setActivePage} />
      <main className="container mx-auto max-w-4xl px-4 py-8 min-h-[60vh]">
        <div className="animate-fade-in">{renderContent()}</div>
      </main>
      <Footer />
    </div>
  )
}
