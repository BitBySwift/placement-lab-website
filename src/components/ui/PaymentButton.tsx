'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Course } from '@/types';
import { useAuthStore } from '@/store/authStore';

interface Props { course: Course; }

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function PaymentButton({ course }: Props) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        return;
      }

      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: course.discountedPrice, courseId: course.id }),
      });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || 'Failed to create order');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: data.amount,
        currency: 'INR',
        name: 'Placement Lab',
        description: `Enrollment: ${course.title}`,
        order_id: data.orderId,
        prefill: {
          contact: user?.phoneNumber || '',
          email: user?.email || '',
        },
        theme: { color: '#6366f1' },
        handler: async (response: Record<string, string>) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course.id,
              userId: user?.id,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success(`Successfully enrolled in ${course.title}! 🎉`);
          } else {
            toast.error('Payment verification failed. Contact support.');
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="button-primary w-full glow-effect disabled:opacity-50"
    >
      {loading ? 'Processing...' : `Enroll Now - ₹${course.discountedPrice.toLocaleString()}`}
    </button>
  );
}
