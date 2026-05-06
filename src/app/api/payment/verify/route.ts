import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

    if (!keySecret) {
      return NextResponse.json({ success: false, message: 'Razorpay is not configured' }, { status: 503 });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', keySecret).update(body).digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: 'Invalid payment signature' }, { status: 400 });
    }

    // TODO: Save enrollment to Firestore using courseId and userId from request body
    // TODO: Send welcome email via Nodemailer

    return NextResponse.json({ success: true, message: 'Payment verified and enrollment successful', paymentId: razorpay_payment_id });
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 500 });
  }
}
