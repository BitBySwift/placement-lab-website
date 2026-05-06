'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Course } from '@/types';
import { useAuthStore } from '@/store/authStore';
import CountdownTimer from './CountdownTimer';
import AuthModal from './AuthModal';
import PaymentButton from './PaymentButton';

interface Props { course: Course; }

export default function CourseCard({ course }: Props) {
  const { isAuthenticated } = useAuthStore();
  const [authOpen, setAuthOpen] = useState(false);
  const discount = Math.round((1 - course.discountedPrice / course.originalPrice) * 100);

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="card-base flex flex-col h-full relative overflow-hidden"
      >
        {/* Limited time badge */}
        <div className="absolute top-3 right-3 z-10">
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full"
          >
            🔥 Limited Deal
          </motion.span>
        </div>

        {/* Badge & Title */}
        <div className="flex items-start space-x-2 mb-4">
          <span className="text-2xl">{course.badge}</span>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{course.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${course.color} text-white font-medium`}>
              {course.category}
            </span>
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-4">{course.description}</p>

        {/* Features */}
        <ul className="space-y-1.5 mb-5 flex-1">
          {course.features.slice(0, 5).map((f) => (
            <li key={f} className="flex items-start text-sm text-slate-300 space-x-2">
              <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
              <span>{f}</span>
            </li>
          ))}
          {course.features.length > 5 && (
            <li className="text-slate-500 text-xs pl-5">+{course.features.length - 5} more features</li>
          )}
        </ul>

        {/* Timer */}
        <div className="mb-4">
          <CountdownTimer />
        </div>

        {/* Pricing */}
        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-2xl font-bold gradient-text">₹{course.discountedPrice.toLocaleString()}</span>
          <span className="text-slate-500 line-through text-sm">₹{course.originalPrice.toLocaleString()}</span>
          <span className="text-green-400 text-xs font-medium">{discount}% OFF</span>
        </div>

        {/* Disclaimer for Job Guaranteed */}
        {course.category === 'guaranteed' && (
          <p className="text-xs text-yellow-400/70 mb-3">* Pay after placement. T&amp;C apply.</p>
        )}

        {/* CTA */}
        {isAuthenticated ? (
          <PaymentButton course={course} />
        ) : (
          <button
            onClick={() => setAuthOpen(true)}
            className="button-primary w-full glow-effect"
          >
            Enroll Now
          </button>
        )}

        <Link href={`/courses/${course.slug}`} className="text-center text-indigo-400 text-sm mt-3 hover:text-indigo-300 transition-colors">
          View Details →
        </Link>
      </motion.div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
