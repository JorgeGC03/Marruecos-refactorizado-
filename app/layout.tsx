import "./globals.css"
import { Roboto } from "next/font/google"
import type { ReactNode } from "react"
import type { Metadata } from "next"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Itinerario Marruecos",
  description: "Plan de viaje de 5 días por Marruecos",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
