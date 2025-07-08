"use client"

import { useState, useEffect } from "react"
import { Calendar, Edit3, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CountdownTimer() {
  const target = new Date("2025-05-01T09:00:00Z").getTime()
  const [timeLeft, setTimeLeft] = useState(target - Date.now())
  const [isEditing, setIsEditing] = useState(false)
  const [tripDate, setTripDate] = useState<Date | null>(null)
  const [dateInput, setDateInput] = useState("")

  // Load saved date from localStorage on component mount
  useEffect(() => {
    const savedDate = localStorage.getItem("morocco-trip-date")
    if (savedDate) {
      const date = new Date(savedDate)
      setTripDate(date)
      setDateInput(date.toISOString().split("T")[0])
    } else {
      // Default date if none saved
      const defaultDate = new Date()
      defaultDate.setDate(defaultDate.getDate() + 30) // 30 days from now
      setTripDate(defaultDate)
      setDateInput(defaultDate.toISOString().split("T")[0])
    }
  }, [])

  // Update countdown timer
  useEffect(() => {
    if (!tripDate) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = tripDate.getTime() - now

      if (distance > 0) {
        setTimeLeft(distance)
      } else {
        setTimeLeft(0)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [tripDate])

  const handleSaveDate = () => {
    if (dateInput) {
      const newDate = new Date(dateInput + "T00:00:00")
      setTripDate(newDate)
      localStorage.setItem("morocco-trip-date", newDate.toISOString())
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    if (tripDate) {
      setDateInput(tripDate.toISOString().split("T")[0])
    }
    setIsEditing(false)
  }

  if (timeLeft < 0) return null

  const days = Math.floor(timeLeft / 86_400_000)
  const hours = Math.floor((timeLeft % 86_400_000) / 3_600_000)

  return (
    <div className="bg-gradient-to-r from-[#9c6644] to-[#d4a373] rounded-lg p-4 text-white mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="text-white" size={20} />
          <h3 className="font-semibold">¡Cuenta Regresiva para el Viaje!</h3>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 p-1"
          >
            <Edit3 size={16} />
          </Button>
        ) : (
          <div className="flex gap-1">
            <Button onClick={handleSaveDate} size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1">
              <Save size={16} />
            </Button>
            <Button onClick={handleCancelEdit} size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1">
              <X size={16} />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mb-4">
          <Input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder-white/70"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      ) : (
        tripDate && (
          <div className="text-center mb-3 text-sm opacity-90">
            Fecha del viaje:{" "}
            {tripDate.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )
      )}

      <div className="mb-4 p-3 rounded-md bg-[#fff3e6] text-[#9c6644] text-sm">
        Faltan <strong>{days}</strong> días y <strong>{hours}</strong> h para tu aventura 🇲🇦
      </div>
    </div>
  )
}
