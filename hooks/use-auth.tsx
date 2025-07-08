"use client"

import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface User {
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

  /* In a real app you’d listen to Firebase auth state here.
     For now we just mimic an async check so layout renders correctly. */
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        // Example async init (replace with onAuthStateChanged in real app)
        await new Promise((r) => setTimeout(r, 200))
        if (mounted) setUser(null) // no user yet
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  /* ---------------------------------------------------------------------- */
  /*  Dummy sign-in / sign-out – replace with Firebase calls when ready.    */
  /* ---------------------------------------------------------------------- */

  const signIn = useCallback(async (email: string, _password: string) => {
    // In production call signInWithEmailAndPassword(firebaseAuth, …)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    setUser({ uid: "demo", email })
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
