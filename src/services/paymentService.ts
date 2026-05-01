import crypto from 'crypto';
import { PaymentResponse } from '@/types';

export async function createRazorpayOrder(
  amount: number,
  currency = 'INR'
): Promise<PaymentResponse> {
  try {
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    return {
      success: true,
      message: 'Order created successfully',
      orderId: order.id,
      amount: order.amount as number,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return {
      success: false,
      message: 'Failed to create payment order',
    };
  }
}

export function verifyRazorpaySignature(
  paymentId: string,
  orderId: string,
  signature: string
): boolean {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
    return generatedSignature === signature;
  } catch {
    return false;
  }
}

export function verifyWebhookSignature(payload: string, signature: string): boolean {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return generatedSignature === signature;
  } catch {
    return false;
  }
}
