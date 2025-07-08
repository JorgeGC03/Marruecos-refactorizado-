"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

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
  const [loading, setLoading] = useState<boolean>(true)

  /* Simulate an async auth-status check on mount. Replace with real listener. */
  useEffect(() => {
    let mounted = true
    ;(async () => {
      await new Promise((r) => setTimeout(r, 150))
      if (mounted) setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [])

  /* Dummy sign-in / sign-out — swap for Firebase or another provider later. */
  const signIn = useCallback(async (email: string) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 300))
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
  return useContext(AuthContext)
}
