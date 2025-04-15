'use client'
import SuggestionForm from '@/components/SuggestionForm'
import { useAuth } from '@/context/AuthContext'

export default function SuggestionsPage() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Submit Your Suggestion</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <SuggestionForm />
      </div>
    </div>
  )
}