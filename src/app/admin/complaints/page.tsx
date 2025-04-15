'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

type Suggestion = {
  id: string;
  userId: string;
  userEmail: string;
  message: string;
  createdAt: string;
  status: string;
};

export default function ComplaintsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // Changed from currentUser to user

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = await user?.getIdToken(); // Updated to use user
        const response = await fetch('/api/getSuggestions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchSuggestions();
  }, [user]);

  if (isLoading) return <div>Loading suggestions...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Suggestions</h1>
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="p-4 border rounded-lg shadow">
            <p className="font-semibold">{suggestion.userEmail}</p>
            <p className="text-gray-500 text-sm">
              {new Date(suggestion.createdAt).toLocaleString()}
            </p>
            <p className="mt-2">{suggestion.message}</p>
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
              suggestion.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {suggestion.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}