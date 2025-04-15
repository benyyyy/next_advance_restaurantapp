import { NextResponse } from 'next/server';
import { db, auth } from '../../../firebase/admin';
import admin from 'firebase-admin';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Missing authentication token' },
        { status: 401 }
      );
    }

    // Verify token and get user
    const decodedToken = await auth.verifyIdToken(token);
    const user = await auth.getUser(decodedToken.uid);

    // Parse and validate suggestion
    const { message } = await request.json();
    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Store suggestion - Firestore creates collections automatically on first write
    const suggestionsRef = db.collection('suggestions');
    await suggestionsRef.add({
      userId: user.uid,
      userEmail: user.email,
      message: message.trim(),
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('Suggestion successfully written to Firestore');

    return NextResponse.json({ success: true });
    
  } catch (error: unknown) {
    const errorAuthHeader = request.headers.get('Authorization');
    const errorToken = errorAuthHeader?.startsWith('Bearer ') ? errorAuthHeader.split(' ')[1] : null;
    
    // Type-safe error handling
    const errorInfo = {
      error: error instanceof Error ? error.stack : String(error),
      authHeader: errorAuthHeader,
      token: errorToken,
      dbStatus: db ? 'Connected' : 'Not connected',
      authStatus: auth ? 'Initialized' : 'Not initialized',
      timestamp: new Date().toISOString()
    };
    
    console.error('Full error submitting suggestion:', errorInfo);
    console.log('Firebase Admin DB instance:', db);
    console.log('Firebase Auth instance:', auth);

    // Handle specific Firebase errors
    if (error instanceof Error) {
      if (error.message.includes('auth/id-token-expired') || 
          error.message.includes('Firebase ID token has expired')) {
        return NextResponse.json(
          { error: 'Session expired. Please login again.' },
          { status: 401 }
        );
      }
      
      if (error.message.includes('NOT_FOUND')) {
        return NextResponse.json(
          { 
            error: 'Database collection not found',
            details: 'Please check your Firestore rules and collection name'
          },
          { status: 404 }
        );
      }
      
      if (error.message.includes('PERMISSION_DENIED')) {
        return NextResponse.json(
          { 
            error: 'Permission denied',
            details: 'Check your Firestore security rules'
          },
          { status: 403 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to submit suggestion',
        details: error instanceof Error ? error.message : 'Unknown error',
        debugInfo: process.env.NODE_ENV === 'development' ? errorInfo : undefined
      },
      { status: 500 }
    );
  }
}
