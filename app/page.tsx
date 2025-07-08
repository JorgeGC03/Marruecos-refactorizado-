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
import { FloatingActionButton } from "@/components/floating-action-button"
import { ProgressIndicator } from "@/components/progress-indicator"
import { WeatherWidget } from "@/components/weather-widget"
import { CountdownTimer } from "@/components/countdown-timer"
import { TravelMissions } from "@/components/travel-missions"

export type PageType =
  | "itinerario"
  | "misiones"
  | "tips"
  | "presupuesto-diario"
  | "mapa"
  | "pagos-compartidos"
  | "enlaces"

export default function Home() {
  const [activePage, setActivePage] = useState<PageType>("itinerario")

  const renderContent = () => {
    switch (activePage) {
      case "itinerario":
        return <ItinerarySection />
      case "misiones":
        return <TravelMissions />
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
      <ProgressIndicator />
      <Header />
      <Navigation activePage={activePage} onPageChange={setActivePage} />
      <main className="container mx-auto max-w-4xl px-2 sm:px-4 py-4 sm:py-8 min-h-[60vh]">
        {/* Solo mostrar countdown y clima en la página de itinerario */}
        {activePage === "itinerario" && (
          <>
            <CountdownTimer />
            <WeatherWidget />
          </>
        )}
        <div className="animate-fade-in">{renderContent()}</div>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  )
}
