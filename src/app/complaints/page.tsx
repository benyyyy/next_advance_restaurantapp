"use client"

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Suggestion {
  id: string;
  name: string;
  message: string;
}


export default function ComplaintsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (!isAdmin || !user) {
          setError('Admin access required');
          setLoading(false);
          return;
        }
        
        setLoading(true);
        const token = await user.getIdToken();
        
        const response = await fetch('/api/getSuggestions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(response.status === 403 
            ? 'Admin access required' 
            : 'Failed to fetch suggestions');
        }

        const data = await response.json();
        setSuggestions(data);
        setError('');
      } catch (err: unknown) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [isAdmin, user]);

  if (authLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAdmin) {
    return <div className="text-center mt-10 text-red-500">Access denied: Admins only</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-semibold mb-6">User Suggestions & Complaints</h2>
      
      {loading && <p>Loading suggestions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        suggestions.length === 0 ? (
          <p>No suggestions submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {suggestions.map((item) => (
              <li key={item.id} className="border p-3 rounded bg-gray-50">
                <strong>{item.name}</strong>: {item.message}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}