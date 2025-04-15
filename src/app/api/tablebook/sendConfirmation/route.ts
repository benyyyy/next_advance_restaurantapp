import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID || '',
  process.env.TWILIO_AUTH_TOKEN || ''
);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { userPhone, date, time, partySize, userName } = data;

    console.log('Environment variables:', {
      TWILIO_ACCOUNT_SID: !!process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN: !!process.env.TWILIO_AUTH_TOKEN,
      TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    });

    if (!userPhone || !date || !time || !partySize || !userName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send SMS using Twilio
    try {
      await twilioClient.messages.create({
        body: `Dear ${userName}, your booking for ${partySize} people on ${date} at ${time} is confirmed.`,
        from: process.env.TWILIO_PHONE_NUMBER || '',
        to: userPhone,
      });
    } catch (smsError: any) {
      console.error('Twilio error:', smsError.message || smsError);
      return NextResponse.json({ error: 'Twilio error: ' + (smsError.message || 'Unknown error') }, { status: 500 });
    }

    return NextResponse.json({ message: 'Confirmation sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending confirmation:', error.message || error);
    return NextResponse.json({ error: error.message || 'Failed to send confirmation' }, { status: 500 });
  }
}
