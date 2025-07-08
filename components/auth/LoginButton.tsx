"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn, LogOut, User, Settings, Loader2, MapPin, Heart } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { signOutUser } from "@/lib/firebase"

export function LoginButton() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOutUser()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const handleSignIn = () => {
    router.push("/login")
  }

  // Función para obtener las iniciales del usuario
  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return "U"
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled className="h-10 w-10 rounded-full">
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    )
  }

  if (!user) {
    return (
      <Button onClick={handleSignIn} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
        <LogIn className="h-4 w-4 mr-2" />
        Iniciar Sesión
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100 transition-colors">
          <Avatar className="h-10 w-10 border-2 border-blue-200 shadow-md">
            <AvatarImage src={user.photoURL || ""} alt={user.displayName || "Usuario"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
        {/* Header del usuario */}
        <DropdownMenuLabel className="font-normal p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || "Usuario"} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.displayName || "Usuario"}</p>
              <p className="text-xs text-gray-600 truncate">{user.email}</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                <span className="text-xs text-green-600 font-medium">En línea</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Opciones del menú */}
        <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 rounded-md p-2 transition-colors">
          <User className="mr-3 h-4 w-4 text-blue-600" />
          <div>
            <div className="text-sm font-medium">Mi Perfil</div>
            <div className="text-xs text-gray-500">Ver y editar información</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 rounded-md p-2 transition-colors">
          <MapPin className="mr-3 h-4 w-4 text-purple-600" />
          <div>
            <div className="text-sm font-medium">Mis Viajes</div>
            <div className="text-xs text-gray-500">Itinerarios guardados</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer hover:bg-pink-50 rounded-md p-2 transition-colors">
          <Heart className="mr-3 h-4 w-4 text-pink-600" />
          <div>
            <div className="text-sm font-medium">Favoritos</div>
            <div className="text-xs text-gray-500">Lugares que me gustan</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors">
          <Settings className="mr-3 h-4 w-4 text-gray-600" />
          <div>
            <div className="text-sm font-medium">Configuración</div>
            <div className="text-xs text-gray-500">Preferencias y privacidad</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        {/* Botón de cerrar sesión */}
        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="cursor-pointer hover:bg-red-50 rounded-md p-2 transition-colors text-red-600 focus:text-red-600"
        >
          {isSigningOut ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <LogOut className="mr-3 h-4 w-4" />}
          <div>
            <div className="text-sm font-medium">{isSigningOut ? "Cerrando sesión..." : "Cerrar Sesión"}</div>
            <div className="text-xs text-gray-500">Salir de la aplicación</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LoginButton
