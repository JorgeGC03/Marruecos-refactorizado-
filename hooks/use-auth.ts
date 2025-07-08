"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  uid: string
  email: string | null
  displayName?: string | null
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      setLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock sign in - replace with real Firebase auth
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({
        uid: "mock-user-id",
        email: email,
        displayName: email.split("@")[0],
      })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      // Mock sign out - replace with real Firebase auth
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
