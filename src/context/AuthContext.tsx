'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, getIdTokenResult } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import  firebaseConfig  from '../firebase/config'
import { useRouter } from 'next/navigation'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, role: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        const tokenResult = await getIdTokenResult(user)
        setIsAdmin(!!tokenResult.claims.admin)
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const tokenResult = await getIdTokenResult(userCredential.user)
      setIsAdmin(!!tokenResult.claims.admin)
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signup = async (email: string, password: string, role: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const response = await fetch('/api/setUserRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await userCredential.user.getIdToken()}`
        },
        body: JSON.stringify({ role })
      })
      
      if (!response.ok) throw new Error('Failed to set user role')
      
      const tokenResult = await getIdTokenResult(userCredential.user)
      setIsAdmin(!!tokenResult.claims.admin)
      router.push('/')
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
