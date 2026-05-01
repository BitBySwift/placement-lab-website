import crypto from 'crypto';
import Razorpay from 'razorpay';

// Initialize Razorpay instance (lazy to avoid env errors at import time)
function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID ?? '',
    key_secret: process.env.RAZORPAY_KEY_SECRET ?? '',
  });
}

// Function to create payment orders
export const createOrder = async (amount: number, currency: string) => {
  const options = {
    amount: amount * 100, // amount in paise
    currency: currency,
    receipt: `receipt_order_${Date.now()}`,
  };
  return getRazorpay().orders.create(options);
};

// Function to verify payment signatures
export const verifyPayment = (paymentId: string, orderId: string, signature: string): boolean => {
  const secret = process.env.RAZORPAY_KEY_SECRET ?? '';
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(orderId + '|' + paymentId)
    .digest('hex');
  return generatedSignature === signature;
};

// Helper functions for payments
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
