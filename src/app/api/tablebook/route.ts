import { NextRequest, NextResponse } from 'next/server'

interface Booking {
  id: string
  userId: string
  userEmail: string
  date: string
  time: string
  partySize: number
  phone: string
}

let bookings: Booking[] = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { userId, userEmail, date, time, partySize, phone } = data

    if (!userId || !userEmail || !date || !time || !partySize || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      userEmail,
      date,
      time,
      partySize: Number(partySize),
      phone
    }

    bookings.push(newBooking)

    return NextResponse.json({ message: 'Booking created', booking: newBooking }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json(bookings)
}
