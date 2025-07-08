"use client"

import { useState, useEffect } from "react"
import { Sun, Cloud, CloudRain, Thermometer } from "lucide-react"

interface WeatherData {
  city: string
  temperature: number
  condition: string
  icon: string
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate weather data (in a real app, you'd fetch from a weather API)
    const mockWeatherData: WeatherData[] = [
      { city: "Fez", temperature: 22, condition: "Soleado", icon: "sun" },
      { city: "Merzouga", temperature: 28, condition: "Despejado", icon: "sun" },
      { city: "Marrakech", temperature: 25, condition: "Parcialmente nublado", icon: "cloud" },
    ]

    setTimeout(() => {
      setWeather(mockWeatherData)
      setLoading(false)
    }, 1000)
  }, [])

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case "sun":
        return <Sun className="text-yellow-500" size={20} />
      case "cloud":
        return <Cloud className="text-gray-500" size={20} />
      case "rain":
        return <CloudRain className="text-blue-500" size={20} />
      default:
        return <Sun className="text-yellow-500" size={20} />
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-lg mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Thermometer className="text-[#9c6644]" size={20} />
          <h3 className="font-semibold text-[#9c6644]">Clima Actual</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Thermometer className="text-[#9c6644]" size={20} />
        <h3 className="font-semibold text-[#9c6644]">Clima Actual</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {weather.map((city, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-[#fefae0] rounded-lg">
            <div>
              <p className="font-medium text-sm">{city.city}</p>
              <p className="text-xs text-gray-600">{city.condition}</p>
            </div>
            <div className="flex items-center gap-2">
              {getWeatherIcon(city.icon)}
              <span className="font-bold text-lg">{city.temperature}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
