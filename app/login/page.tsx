"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } from "@/lib/firebase"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("login")

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ email: "", password: "", confirmPassword: "", displayName: "" })
  const [resetEmail, setResetEmail] = useState("")

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push("/")
    }
  }, [user, loading, router])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError("")
      await signInWithGoogle()
      router.push("/")
    } catch (error: any) {
      console.error("Google sign-in error:", error)
      setError(getErrorMessage(error.code || error.message))
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setError("")
      await signInWithEmail(loginForm.email, loginForm.password)
      router.push("/")
    } catch (error: any) {
      console.error("Email sign-in error:", error)
      setError(getErrorMessage(error.code))
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (signupForm.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      setIsLoading(true)
      setError("")
      await signUpWithEmail(signupForm.email, signupForm.password, signupForm.displayName)
      router.push("/")
    } catch (error: any) {
      console.error("Email sign-up error:", error)
      setError(getErrorMessage(error.code))
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setError("")
      await resetPassword(resetEmail)
      setSuccess("Se ha enviado un enlace de recuperación a tu email")
      setResetEmail("")
    } catch (error: any) {
      console.error("Password reset error:", error)
      setError(getErrorMessage(error.code))
    } finally {
      setIsLoading(false)
    }
  }

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No existe una cuenta con este email"
      case "auth/wrong-password":
        return "Contraseña incorrecta"
      case "auth/email-already-in-use":
        return "Ya existe una cuenta con este email"
      case "auth/weak-password":
        return "La contraseña es muy débil"
      case "auth/invalid-email":
        return "Email inválido"
      case "auth/too-many-requests":
        return "Demasiados intentos. Intenta más tarde"
      case "auth/invalid-credential":
        return "Credenciales inválidas"
      case "auth/network-request-failed":
        return "Error de conexión. Verifica tu internet"
      case "auth/unauthorized-domain":
        return "Dominio no autorizado. Agrega localhost en Firebase Console → Authentication → Configuración → Dominios autorizados"
      case "Popup cerrado por el usuario":
        return "Ventana cerrada. Intenta de nuevo"
      case "Popup bloqueado por el navegador":
        return "Popup bloqueado. Permite popups para este sitio"
      default:
        return "Error de autenticación. Intenta de nuevo"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <Button variant="ghost" onClick={() => router.push("/")} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      <div className="flex min-h-screen">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-800/90 z-10" />
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/placeholder.svg?height=800&width=600&text=Travel+Adventure')`,
            }}
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
            <h1 className="text-4xl font-bold mb-4 text-center">Descubre el mundo</h1>
            <p className="text-xl text-center opacity-90 max-w-md">
              Planifica tus aventuras, guarda tus recuerdos y comparte tus experiencias de viaje.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h1>
              <p className="text-gray-600">Inicia sesión para continuar</p>
            </div>

            <Card className="shadow-2xl border-0">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold text-center">Travekeo</CardTitle>
                <CardDescription className="text-center">
                  Inicia sesión o crea una cuenta para continuar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                    <TabsTrigger value="signup">Registrarse</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4 mt-6">
                    <form onSubmit={handleEmailSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="tu@email.com"
                            className="pl-10"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Contraseña</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Iniciar Sesión
                      </Button>
                    </form>

                    <div className="text-center">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setActiveTab("reset")}
                        className="text-sm text-muted-foreground"
                      >
                        ¿Olvidaste tu contraseña?
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      className="w-full bg-transparent"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      )}
                      Continuar con Google
                    </Button>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <form onSubmit={handleEmailSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Nombre completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="Tu nombre"
                            className="pl-10"
                            value={signupForm.displayName}
                            onChange={(e) => setSignupForm({ ...signupForm, displayName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="tu@email.com"
                            className="pl-10"
                            value={signupForm.email}
                            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Contraseña</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirmar contraseña</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-confirm"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Crear Cuenta
                      </Button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      className="w-full bg-transparent"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      )}
                      Continuar con Google
                    </Button>
                  </TabsContent>

                  <TabsContent value="reset" className="space-y-4 mt-6">
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="tu@email.com"
                            className="pl-10"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Enviar enlace de recuperación
                      </Button>
                    </form>

                    <div className="text-center">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setActiveTab("login")}
                        className="text-sm text-muted-foreground"
                      >
                        Volver al inicio de sesión
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
