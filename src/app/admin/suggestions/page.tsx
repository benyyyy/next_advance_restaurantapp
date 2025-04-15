'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminSuggestionsPage() {
  const { isAdmin, loading, user } = useAuth()  // ✅ added 'user' from context
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/admin')
    }
  }, [loading, isAdmin, router])

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  const [suggestions, setSuggestions] = useState([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(true)

  useEffect(() => {
    if (isAdmin && user) {
      const fetchSuggestions = async () => {
        try {
          const token = await user.getIdToken()
          const response = await fetch('/api/getSuggestions', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          const data = await response.json()
          setSuggestions(data.suggestions)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
        } finally {
          setLoadingSuggestions(false)
        }
      }
      fetchSuggestions()
    }
  }, [isAdmin, user])

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">User Suggestions</h1>

      {loadingSuggestions ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suggestions.map((suggestion: any) => (
                <tr key={suggestion.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suggestion.userEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suggestion.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suggestion.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {suggestion.createdAt?.seconds
                      ? new Date(suggestion.createdAt.seconds * 1000).toLocaleString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
