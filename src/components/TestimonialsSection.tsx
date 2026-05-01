'use client';

import Image from 'next/image';
import { TESTIMONIALS } from '@/utils/constants';

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge bg-purple-500/20 text-purple-400 border border-purple-500/30 mb-4">
            ⭐ Success Stories
          </span>
          <h2 className="section-title">
            Students Who{' '}
            <span className="gradient-text">Made It</span>
          </h2>
          <p className="section-subtitle">
            Real stories from real students who transformed their careers with Placement Lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card p-6 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{testimonial.message}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs">
                    {testimonial.role} @ {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
