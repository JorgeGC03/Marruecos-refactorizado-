"use client"

import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, type User } from "firebase/auth"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { firebaseApp } from "@/lib/firebase"

interface AuthContextValue {
  user: User | null
  loading: boolean
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth(firebaseApp)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current)
      setLoading(false)
    })
    return unsub
  }, [auth])

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
