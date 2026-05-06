import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { verificationId, otp } = await req.json();
    if (!verificationId || !otp) {
      return NextResponse.json({ success: false, message: 'Verification ID and OTP are required' }, { status: 400 });
    }
    // OTP verification is handled client-side via Firebase
    return NextResponse.json({ success: true, message: 'OTP verification is handled via Firebase client SDK' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to verify OTP' }, { status: 500 });
  }
}
