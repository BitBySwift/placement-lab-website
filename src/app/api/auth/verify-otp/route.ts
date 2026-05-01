import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/services/authService';
import { sanitizeInput } from '@/services/validators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone = sanitizeInput(String(body.phone || ''));
    const otp = sanitizeInput(String(body.otp || ''));

    if (!phone || !otp) {
      return NextResponse.json({ success: false, message: 'Phone and OTP are required' }, { status: 400 });
    }

    const isValid = verifyOTP(phone, otp);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid or expired OTP' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
