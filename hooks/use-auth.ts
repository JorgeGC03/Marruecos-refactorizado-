"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface User {
  uid: string
  email: string | null
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  /* Simulate an async auth check on mount (replace with real listener) */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 150)
    return () => clearTimeout(timer)
  }, [])

  /* ---------------------------------------------------------------------- */
  /* Dummy auth helpers — swap for Firebase/Auth0/etc. as soon as you wish. */
  /* ---------------------------------------------------------------------- */

  const signIn = useCallback(async (email: string) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setUser({ uid: "demo-uid", email })
    setLoading(false)
  }, [])

  const signOut = useCallback(async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    setUser(null)
    setLoading(false)
  }, [])

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
