import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth"
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
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
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Google Auth Provider
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account",
})

// Auth functions
export const signInWithGoogle = async () => {
  try {
    console.log("🔥 Attempting Google sign-in...")
    const result = await signInWithPopup(auth, googleProvider)
    console.log("✅ Google sign-in successful:", result.user.email)

    // Create or update user document
    await upsertUser(result.user, "google")

    return result
  } catch (error: any) {
    console.error("❌ Google sign-in error:", error)

    // Handle specific errors
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Popup cerrado por el usuario")
    } else if (error.code === "auth/popup-blocked") {
      throw new Error("Popup bloqueado por el navegador")
    } else if (error.code === "auth/network-request-failed") {
      throw new Error("Error de conexión. Verifica tu internet")
    } else if (error.code === "auth/unauthorized-domain") {
      throw new Error(
        "Dominio no autorizado en Firebase. Añádelo en Authentication → Configuración → Dominios autorizados",
      )
    }

    throw error
  }
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    console.log("🔥 Attempting email sign-in for:", email)
    const result = await signInWithEmailAndPassword(auth, email, password)
    console.log("✅ Email sign-in successful:", result.user.email)

    // Update last login
    await touchLastLogin(result.user.uid)

    return result
  } catch (error: any) {
    console.error("❌ Email sign-in error:", error)
    throw new Error(getAuthErrorMessage(error.code))
  }
}

export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    console.log("🔥 Creating account for:", email)
    const result = await createUserWithEmailAndPassword(auth, email, password)

    // Update user profile with display name
    if (displayName) {
      await updateProfile(result.user, { displayName })
    }

    // Create user document
    await upsertUser({ ...result.user, displayName }, "email")

    console.log("✅ Account created successfully:", result.user.email)
    return result
  } catch (error: any) {
    console.error("❌ Error creando cuenta:", error)
    throw new Error(getAuthErrorMessage(error.code))
  }
}

export const resetPassword = async (email: string) => {
  try {
    console.log("🔥 Sending password reset email to:", email)
    await sendPasswordResetEmail(auth, email)
    console.log("✅ Password reset email sent")
  } catch (error: any) {
    console.error("❌ Password reset error:", error)
    throw new Error(getAuthErrorMessage(error.code))
  }
}

export const signOutUser = async () => {
  try {
    console.log("🔥 Signing out user...")
    await signOut(auth)
    console.log("✅ User signed out successfully")
  } catch (error: any) {
    console.error("❌ Sign out error:", error)
    throw error
  }
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
export interface UserProgress {
  userId: string
  totalTrips: number
  completedMissions: number
  totalPoints: number
  badges: string[]
  titles: string[]
  level: number
  updatedAt: Timestamp
}

export async function updateUserProgress(userId: string, progress: Partial<UserProgress>) {
  try {
    await setDoc(doc(db, "userProgress", userId), { ...progress, userId, updatedAt: Timestamp.now() }, { merge: true })
  } catch (error) {
    console.error("❌ Error actualizando progreso:", error)
    throw error
  }
}

export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  try {
    const ref = doc(db, "userProgress", userId)
    const snap = await getDoc(ref)

    if (snap.exists()) return snap.data() as UserProgress

    // Crear progreso inicial si no existe
    const initial: UserProgress = {
      userId,
      totalTrips: 0,
      completedMissions: 0,
      totalPoints: 0,
      badges: [],
      titles: [],
      level: 1,
      updatedAt: Timestamp.now(),
    }
    await setDoc(ref, initial)
    return initial
  } catch (error) {
    console.error("❌ Error obteniendo progreso:", error)
    return null
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
