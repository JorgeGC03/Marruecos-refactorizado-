"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"

interface User {
  uid: string
  displayName?: string | null
  email?: string | null
  photoURL?: string | null
}

interface UserProgress {
  completedMissions: string[]
  totalExpenses: number
  lastUpdated: Date
}

interface AuthContextType {
  user: User | null
  userProgress: UserProgress | null
  loading: boolean
  refreshProgress: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProgress: null,
  loading: true,
  refreshProgress: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProgress = async () => {
    if (user) {
      // Simulate fetching user progress
      const progress: UserProgress = {
        completedMissions: [],
        totalExpenses: 0,
        lastUpdated: new Date(),
      }
      setUserProgress(progress)
    }
  }

  useEffect(() => {
    // Simulate auth state change
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AuthContext.Provider value={{ user, userProgress, loading, refreshProgress }}>{children}</AuthContext.Provider>
  )
}
