import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();
    if (!phoneNumber) {
      return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
    }
    // OTP is sent client-side via Firebase Phone Auth (reCAPTCHA)
    return NextResponse.json({ success: true, message: 'Use Firebase client SDK to send OTP' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
  }
}
