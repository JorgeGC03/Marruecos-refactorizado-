"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  displayName?: string
  email?: string
  photoURL?: string
}

interface AuthContextValue {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: false })

export function AuthProvider({ children }: { children: ReactNode }) {
  // In a real app you would subscribe to Firebase auth.
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  // Fake auto-login after 1 s (remove in production)
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      setUser(null) // still logged-out by default
      setLoading(false)
    }, 1000)
    return () => clearTimeout(t)
  }, [])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
