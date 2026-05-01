'use client';

import { useState } from 'react';
import { COURSES } from '@/utils/constants';
import { Course } from '@/types';
import CourseCard from './CourseCard';
import AuthModal from './AuthModal';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function CoursesSection() {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEnroll = (course: Course) => {
    if (!isAuthenticated) {
      setSelectedCourse(course);
      setAuthModalOpen(true);
      return;
    }
    // Initiate payment
    initiatePayment(course);
  };

  const initiatePayment = async (course: Course) => {
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id, amount: course.discountedPrice }),
      });
      const data = await res.json();
      if (!data.success) {
        toast.error('Failed to create order. Please try again.');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'Placement Lab',
        description: course.title,
        order_id: data.orderId,
        handler: async (response: RazorpayPaymentResponse) => {
          const verifyRes = await fetch('/api/payments/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              courseId: course.id,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success('🎉 Enrollment successful! Welcome to Placement Lab!');
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        theme: { color: '#22c55e' },
      };

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="badge bg-green-500/20 text-green-400 border border-green-500/30 mb-4">
              🎓 Our Courses
            </span>
            <h2 className="section-title">
              Choose Your{' '}
              <span className="gradient-text">Career Path</span>
            </h2>
            <p className="section-subtitle">
              From beginner to job-ready — we have a program for every stage of your journey.
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {COURSES.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              Not sure which course is right for you?
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              💬 Get Free Counseling
            </a>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => selectedCourse && initiatePayment(selectedCourse)}
      />
    </>
  );
}
