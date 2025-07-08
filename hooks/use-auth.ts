"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { type User, onAuthStateChanged } from "firebase/auth"
import { auth, getUserProgress, type UserProgress } from "@/lib/firebase"

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
      const progress = await getUserProgress(user.uid)
      setUserProgress(progress)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        const progress = await getUserProgress(user.uid)
        setUserProgress(progress)
      } else {
        setUserProgress(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, userProgress, loading, refreshProgress }}>{children}</AuthContext.Provider>
  )
}
