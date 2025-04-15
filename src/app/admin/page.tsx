"use client"
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/')
    }
  }, [loading, isAdmin, router])

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Management Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-gray-600 mb-4">
              View and manage all registered users
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
              Manage Users
            </button>
          </div>

          {/* Chat Management Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Chat Management</h2>
            <p className="text-gray-600 mb-4">
              Monitor and respond to user messages
            </p>
            <button 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
              onClick={() => router.push('/admin/chat')}
            >
              View Messages
            </button>
          </div>

          {/* Analytics Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <p className="text-gray-600 mb-4">
              View site usage statistics and trends
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
              View Analytics
            </button>
          </div>

          {/* Settings Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600 mb-4">
              Configure system settings and preferences
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
