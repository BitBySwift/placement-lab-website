import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, storeOTP } from '@/services/authService';
import { sendOTPEmail } from '@/services/emailService';
import { validatePhone, sanitizeInput } from '@/services/validators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone = sanitizeInput(String(body.phone || ''));

    const validation = validatePhone(phone);
    if (!validation.isValid) {
      return NextResponse.json({ success: false, message: validation.error }, { status: 400 });
    }

    const otp = generateOTP();
    storeOTP(phone, otp);

    // In production, integrate with SMS gateway (Twilio, MSG91, etc.)
    // For demo, if email is provided send via email
    const email = body.email ? sanitizeInput(String(body.email)) : null;
    if (email) {
      await sendOTPEmail(email, otp);
    }

    // For development, log OTP (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log(`OTP for ${phone}: ${otp}`);
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      verificationId: Buffer.from(phone).toString('base64'),
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
