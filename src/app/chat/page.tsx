'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ChatForm() {
  const [message, setMessage] = useState('');
  const [submissionState, setSubmissionState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !user) return;

    setSubmissionState('submitting');
    
    try {
      const res = await fetch('/api/submitSuggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName || user.email,
          message,
        }),
      });

      if (res.ok) {
        setSubmissionState('success');
        setMessage('');
        setTimeout(() => setSubmissionState('idle'), 1000);
      } else {
        setSubmissionState('error');
        setTimeout(() => setSubmissionState('idle'), 1000);
      }
    } catch (err) {
      setSubmissionState('error');
      setTimeout(() => setSubmissionState('idle'), 1000);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Submit Your Suggestion or Complaint</h2>
      
      {submissionState === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Your suggestion has been submitted successfully!
        </div>
      )}

      {submissionState === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Failed to submit suggestion. Please try again.
        </div>
      )}

      {submissionState !== 'success' && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            placeholder="Please submit your complaint or suggestion"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 p-2 rounded min-h-[100px]"
            required
            disabled={submissionState === 'submitting'}
          ></textarea>
          <button
            type="submit"
            className={`py-2 rounded text-white ${
              submissionState === 'submitting'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled={submissionState === 'submitting'}
          >
            {submissionState === 'submitting' ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}