"use client"

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { GoogleAuthProvider } from "firebase/auth"
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Debug: Log configuration (remove in production)
console.log("🔍 Debug Firebase Config:", {
  apiKey: firebaseConfig.apiKey ? "✅ Set" : "❌ Missing",
  authDomain: firebaseConfig.authDomain ? "✅ Set" : "❌ Missing",
  projectId: firebaseConfig.projectId ? "✅ Set" : "❌ Missing",
})

// Validate required environment variables
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
]

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])
if (missingVars.length > 0) {
  console.error("❌ Missing Firebase environment variables:", missingVars)
  throw new Error(`Missing required Firebase environment variables: ${missingVars.join(", ")}`)
}

// Initialize Firebase
export const firebaseApp: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(firebaseApp) // Declare db variable here

// Mock auth object
export const auth = {
  currentUser: null as User | null,
}

// Google Auth Provider
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account",
})

// Auth functions
export async function signInWithGoogle() {
  // Stub: immediately resolve
  return Promise.resolve()
}

export async function signInWithEmail(_email: string, _password: string) {
  return Promise.resolve()
}

export async function signUpWithEmail(_e: string, _p: string, _n: string) {
  return Promise.resolve()
}

export async function resetPassword(_email: string) {
  return Promise.resolve()
}

export async function signOutUser() {
  return Promise.resolve()
}

// Helper function to create or update user document in Firestore
const upsertUser = async (
  user: { uid: string; email: string | null; displayName: string | null; photoURL: string | null },
  provider: "google" | "email",
) => {
  if (!user) return

  try {
    console.log("💾 Guardando usuario en Firestore:", user.email)

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        authProvider: provider,
        createdAt: Timestamp.now(),
        lastLogin: Timestamp.now(),
      },
      { merge: true },
    )

    console.log("✅ Usuario guardado en Firestore")
  } catch (error) {
    console.error("❌ Error guardando usuario:", error)
    // No lanzar error aquí para no bloquear el login
  }
}

const touchLastLogin = async (uid: string) => {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        lastLogin: Timestamp.now(),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("❌ Error actualizando último login:", error)
  }
}

// Interfaces y funciones para trips
export interface SavedTrip {
  id?: string
  userId: string
  title: string
  destinations: string[]
  startDate: string
  endDate: string
  budget: number
  travelers: number
  interests: string[]
  itinerary: any[]
  tips: any[]
  missions: any[]
  budgetBreakdown: any
  links: any[]
  createdAt: Timestamp
  updatedAt: Timestamp
  isPublic: boolean
}

export async function saveTrip(userId: string, tripData: Omit<SavedTrip, "id" | "userId" | "createdAt" | "updatedAt">) {
  try {
    const docRef = await addDoc(collection(db, "trips"), {
      ...tripData,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error("❌ Error guardando viaje:", error)
    throw error
  }
}

export async function getUserTrips(userId: string) {
  try {
    const q = query(collection(db, "trips"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as SavedTrip[]
  } catch (error) {
    console.error("❌ Error obteniendo viajes:", error)
    throw error
  }
}

export async function getPublicTrips(limit = 10) {
  try {
    const q = query(collection(db, "trips"), where("isPublic", "==", true), orderBy("createdAt", "desc"))
    const snap = await getDocs(q)
    return snap.docs.slice(0, limit).map((d) => ({ id: d.id, ...d.data() })) as SavedTrip[]
  } catch (error) {
    console.error("❌ Error obteniendo viajes públicos:", error)
    throw error
  }
}

// User Progress
// export interface UserProgress {
//   userId: string
//   totalTrips: number
//   completedMissions: number
//   totalPoints: number
//   badges: string[]
//   titles: string[]
//   level: number
//   updatedAt: Timestamp
// }

export interface UserProgress {
  completedMissions: string[]
  totalExpenses: number
  lastUpdated: Date
}

// Mock functions
export const onAuthStateChanged = (auth: any, callback: (user: User | null) => void) => {
  // Simulate no user initially
  setTimeout(() => callback(null), 100)

  // Return unsubscribe function
  return () => {}
}

// export async function updateUserProgress(userId: string, progress: Partial<UserProgress>) {
//   try {
//     await setDoc(doc(db, "userProgress", userId), { ...progress, userId, updatedAt: Timestamp.now() }, { merge: true })
//   } catch (error) {
//     console.error("❌ Error actualizando progreso:", error)
//     throw error
//   }
// }

export const updateUserProgress = async (uid: string, progress: Partial<UserProgress>): Promise<void> => {
  // Mock update function
  console.log("Updating user progress:", uid, progress)
}

// export async function getUserProgress(userId: string): Promise<UserProgress | null> {
//   try {
//     const ref = doc(db, "userProgress", userId)
//     const snap = await getDoc(ref)

//     if (snap.exists()) return snap.data() as UserProgress

//     // Crear progreso inicial si no existe
//     const initial: UserProgress = {
//       userId,
//       totalTrips: 0,
//       completedMissions: 0,
//       totalPoints: 0,
//       badges: [],
//       titles: [],
//       level: 1,
//       updatedAt: Timestamp.now(),
//     }
//     await setDoc(ref, initial)
//     return initial
//   } catch (error) {
//     console.error("❌ Error obteniendo progreso:", error)
//     return null
//   }
// }

// Mock user progress
export const getUserProgress = async (uid: string): Promise<UserProgress> => {
  return {
    completedMissions: [],
    totalExpenses: 0,
    lastUpdated: new Date(),
  }
}

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode: string): string => {
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
      return "Dominio no autorizado en Firebase. Agrega localhost en la consola"
    default:
      return "Error de autenticación. Intenta de nuevo"
  }
}

// Mock Firebase implementation for development
export interface User {
  uid: string
  displayName?: string | null
  email?: string | null
  photoURL?: string | null
}
