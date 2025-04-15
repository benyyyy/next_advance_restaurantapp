import { NextResponse } from 'next/server'
import { auth } from '@/firebase/admin'

export async function POST(request: Request) {
  try {
    const { role } = await request.json()
    const authorization = request.headers.get('Authorization')
    
    if (!authorization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authorization.split(' ')[1]
    const decodedToken = await auth.verifyIdToken(token)
    
    // Set custom claim
    await auth.setCustomUserClaims(decodedToken.uid, {
      admin: role === 'admin'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error setting user role:', error)
    return NextResponse.json(
      { error: 'Failed to set user role' },
      { status: 500 }
    )
  }
}
