
// src/app/admin/chat/page.tsx
'use client'
import { useAuth } from '../../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase/config' // Correct import path

export default function AdminChatPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/admin')
    }
  }, [loading, isAdmin, router])

  useEffect(() => {
    if (isAdmin) {
      const q = query(
        collection(db, 'adminMessages'), // Changed collection name to separate from user messages
        orderBy('timestamp')
      )
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages: any[] = []
        querySnapshot.forEach((doc) => {
          messages.push({ 
            id: doc.id, 
            ...doc.data(),
            // Convert Firestore timestamp to Date
            timestamp: doc.data().timestamp?.toDate() 
          })
        })
        setMessages(messages)
      })

      return () => unsubscribe()
    }
  }, [isAdmin])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() === '' || !user) return

    try {
      await addDoc(collection(db, 'adminMessages'), {
        text: message,
        userId: user.uid,
        userName: user.displayName || 'Admin',
        timestamp: serverTimestamp()
      })
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Admin Chat Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md p-4 h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.userId === user?.uid 
                    ? 'bg-blue-500 text-white ml-auto' 
                    : 'bg-gray-200 mr-auto'
                }`}
              >
                <p className="font-semibold">{msg.userName}</p>
                <p>{msg.text}</p>
                {msg.timestamp && (
                  <p className="text-xs opacity-70">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
          <input
  type="text"
  value={message}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Type your response..."
/>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              disabled={!message.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}