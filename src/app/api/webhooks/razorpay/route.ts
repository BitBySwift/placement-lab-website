import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/services/paymentService';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-razorpay-signature');
    if (!signature) {
      return NextResponse.json({ success: false, message: 'Missing signature' }, { status: 400 });
    }

    const rawBody = await req.text();
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;

    if (eventType === 'payment.captured') {
      // Handle successful payment
      const payment = event.payload.payment.entity;
      console.log('Payment captured:', payment.id);
      // In production: update enrollment status in database
    } else if (eventType === 'payment.failed') {
      // Handle failed payment
      const payment = event.payload.payment.entity;
      console.log('Payment failed:', payment.id);
      // In production: update order status in database
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
