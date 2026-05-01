'use client';

import Link from 'next/link';
import { Course } from '@/types';
import PriceDisplay from './PriceDisplay';
import CountdownTimer from './CountdownTimer';

interface CourseCardProps {
  course: Course;
  onEnroll?: (course: Course) => void;
}

export default function CourseCard({ course, onEnroll }: CourseCardProps) {
  const colorClasses: Record<string, string> = {
    essential: 'border-green-500/30 hover:border-green-500/60 shadow-glow',
    professional: 'border-blue-500/30 hover:border-blue-500/60 shadow-glow-blue',
    advanced: 'border-purple-500/30 hover:border-purple-500/60 shadow-glow-purple',
    guaranteed: 'border-red-500/30 hover:border-red-500/60 shadow-glow-red',
  };

  const badgeClasses: Record<string, string> = {
    essential: 'bg-green-500/20 text-green-400 border-green-500/30',
    professional: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    guaranteed: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const buttonClasses: Record<string, string> = {
    essential: 'from-green-500 to-emerald-600 hover:shadow-glow',
    professional: 'from-blue-500 to-blue-600 hover:shadow-glow-blue',
    advanced: 'from-purple-500 to-purple-600 hover:shadow-glow-purple',
    guaranteed: 'from-red-500 to-red-600 hover:shadow-glow-red',
  };

  return (
    <div
      className={`glass-card border transition-all duration-300 hover:-translate-y-2 flex flex-col ${
        colorClasses[course.category]
      }`}
    >
      {/* Header */}
      <div className={`h-2 w-full rounded-t-2xl bg-gradient-to-r ${course.color}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Badge & Title */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span
              className={`badge border ${badgeClasses[course.category]} mb-2`}
            >
              {course.badge} {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
            </span>
            <h3 className="text-xl font-bold text-white">{course.title}</h3>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-5">{course.description}</p>

        {/* Price */}
        <div className="mb-5">
          <PriceDisplay
            discountedPrice={course.discountedPrice}
            originalPrice={course.originalPrice}
          />
        </div>

        {/* Countdown */}
        <div className="mb-5">
          <p className="text-red-400 text-xs font-medium mb-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse inline-block" />
            Offer ends in:
          </p>
          <CountdownTimer />
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-1">
          {course.features.slice(0, 5).map((feature) => (
            <li key={feature} className="flex items-center text-sm text-gray-300 gap-2">
              <span className="text-green-400 flex-shrink-0">✓</span>
              {feature}
            </li>
          ))}
          {course.features.length > 5 && (
            <li className="text-gray-500 text-sm">+{course.features.length - 5} more features</li>
          )}
        </ul>

        {/* Timeline */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Duration: {course.timeline}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => onEnroll?.(course)}
            className={`flex-1 bg-gradient-to-r ${buttonClasses[course.category]} text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95`}
          >
            Enroll Now
          </button>
          <Link
            href={`/courses/${course.id}`}
            className="btn-secondary py-3 px-4 text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
