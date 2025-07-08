import { LoginButton } from "@/components/auth/LoginButton"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-[#9c6644] to-[#d4a373] p-4 sm:p-8 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1" />
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">✈️ Itinerario de 5 días por Marruecos</h1>
            <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-2">
              Fez, Merzouga y Marrakech — jueves a lunes
            </p>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm opacity-80">
              <span>🏜️ Desierto</span>
              <span>•</span>
              <span>🕌 Medinas</span>
              <span>•</span>
              <span>🐪 Aventura</span>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  )
}
