"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  userId: string;
  userEmail: string;
  date: string;
  time: string;
  partySize: number;
  phone?: string;
}

export default function TableBookPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    partySize: 1,
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!loading && isAdmin) {
      fetch("/api/tablebook")
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error("Failed to fetch bookings", err));
    }
  }, [loading, isAdmin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "partySize" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

        if (!formData.date || !formData.time || !formData.partySize || !formData.phone) {
          setError("Please fill in all fields");
          setSubmitting(false);
          return;
        }

    try {
      const response = await fetch("/api/tablebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.uid,
          userEmail: user?.email,
          date: formData.date,
          time: formData.time,
          partySize: formData.partySize,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to book table");
        setSubmitting(false);
        return;
      }

      router.push(
        `/booking-confirmation?date=${encodeURIComponent(formData.date)}&time=${encodeURIComponent(
          formData.time
        )}&partySize=${encodeURIComponent(formData.partySize.toString())}`
      );
    } catch (err) {
      setError("Failed to book table");
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Table Bookings</h1>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">User Email</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Party Size</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="border px-4 py-2">{booking.userEmail}</td>
                  <td className="border px-4 py-2">{booking.date}</td>
                  <td className="border px-4 py-2">{booking.time}</td>
                  <td className="border px-4 py-2">{booking.partySize}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => sendConfirmation(booking)}
                    >
                      Send Confirmation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );

  }

  async function sendConfirmation(booking: Booking) {
    try {
      const response = await fetch('/api/tablebook/sendConfirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: booking.userEmail,
          userPhone: booking.phone || '', // Use phone from booking if available
          userName: booking.userEmail.split('@')[0], // Use email prefix as name fallback
          date: booking.date,
          time: booking.time,
          partySize: booking.partySize,
        }),
      });

      if (!response.ok) {
        alert('Failed to send confirmation');
        return;
      }

      alert('Confirmation sent successfully');
    } catch (error) {
      console.error('Error sending confirmation:', error);
      alert('Error sending confirmation');
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book a Table</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label htmlFor="date" className="block font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block font-medium mb-1">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="partySize" className="block font-medium mb-1">
            Party Size
          </label>
          <select
            id="partySize"
            name="partySize"
            value={formData.partySize}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? "person" : "people"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="phone" className="block font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-amber-100 text-green-500 font-bold py-2 px-4 rounded hover:bg-primary-dark transition"
        >
          {submitting ? "Booking..." : "Book Table"}
        </button>
      </form>
    </div>
  );
}
