// app/booking-confirmation/page.tsx
"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    partySize: ''
  });

  useEffect(() => {
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const partySize = searchParams.get('partySize');
    
    if (date && time && partySize) {
      setBookingDetails({
        date: new Date(date).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time,
        partySize
      });
    }
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-bold mt-4 mb-2">Reservation Confirmed!</h1>
        <p className="text-lg mb-6">Thank you for booking with us.</p>
        
        <div className="bg-gray-50 p-6 rounded-lg text-left max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Date:</span> {bookingDetails.date}</p>
            <p><span className="font-medium">Time:</span> {bookingDetails.time}</p>
            <p><span className="font-medium">Party Size:</span> {bookingDetails.partySize} people</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-4">We've sent a confirmation to your email.</p>
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}