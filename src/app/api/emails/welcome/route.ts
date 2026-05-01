import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/services/emailService';
import { isValidEmail, sanitizeInput } from '@/services/validators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = sanitizeInput(String(body.email || ''));
    const name = sanitizeInput(String(body.name || ''));
    const courseTitle = sanitizeInput(String(body.courseTitle || 'Placement Lab'));

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email address' }, { status: 400 });
    }

    const sent = await sendWelcomeEmail(email, name, courseTitle);
    if (!sent) {
      return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Welcome email sent successfully' });
  } catch (error) {
    console.error('Welcome email error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
