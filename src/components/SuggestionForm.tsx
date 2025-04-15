import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function SuggestionForm() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to submit suggestions');
      router.push('/login');
      return;
    }

    if (!message.trim()) {
      toast.error('Please enter a suggestion');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await user.getIdToken(true); // Force refresh token
      
      const response = await fetch('/api/submitSuggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: message.trim() })
      });

      if (response.status === 401) {
        await logout();
        router.push('/login');
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        throw new Error('Failed to submit suggestion');
      }

      toast.success('Suggestion submitted successfully!');
      setMessage('');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit suggestion');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your suggestion..."
        className="w-full p-2 border rounded"
        rows={3}
        required
      />
      <button
        type="submit"
        disabled={isSubmitting || !user}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
      </button>
    </form>
  );
}