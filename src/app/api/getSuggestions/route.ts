import { NextResponse } from 'next/server';
import { db, auth } from '@/firebase/admin';

export async function GET(request: Request) {
  try {
    // Verify admin role
    const authorization = request.headers.get('Authorization');
    if (!authorization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const user = await auth.getUser(decodedToken.uid);

    if (!user.customClaims?.admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get all suggestions
    const snapshot = await db.collection('suggestions').get();
    const suggestions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ suggestions });
    
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
}