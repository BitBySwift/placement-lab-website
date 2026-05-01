import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PriceDisplay from '@/components/PriceDisplay';
import { getCourseById } from '@/services/courseService';
import { COURSES } from '@/utils/constants';

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return COURSES.map((course) => ({ id: course.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const course = getCourseById(params.id);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: `${course.title} | Placement Lab`,
    description: course.description,
  };
}

export default function CourseDetailPage({ params }: PageProps) {
  const course = getCourseById(params.id);
  if (!course) notFound();

  const borderColorMap: Record<string, string> = {
    essential: 'border-green-500/30',
    professional: 'border-blue-500/30',
    advanced: 'border-purple-500/30',
    guaranteed: 'border-red-500/30',
  };

  const badgeColorMap: Record<string, string> = {
    essential: 'bg-green-500/20 text-green-400 border-green-500/30',
    professional: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    guaranteed: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const borderClass = borderColorMap[course.category] ?? 'border-green-500/30';
  const badgeClass = badgeColorMap[course.category] ?? 'bg-green-500/20 text-green-400 border-green-500/30';

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className={`glass-card p-8 mb-8 border ${borderClass}`}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <span className={`badge border ${badgeClass} mb-4`}>
                  {course.badge} {course.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>
                <p className="text-gray-400 text-lg mb-6">{course.description}</p>
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                  <span>⏱️ {course.timeline}</span>
                  <span>✅ {course.features.length} features</span>
                  {course.tracks && <span>🛤️ {course.tracks.length} tracks</span>}
                </div>
                <PriceDisplay
                  discountedPrice={course.discountedPrice}
                  originalPrice={course.originalPrice}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Features */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-5">✅ What You Get</h2>
              <ul className="space-y-3">
                {course.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Timeline */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-5">🛠️ Tools & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {course.tools.map((tool) => (
                    <span key={tool} className="glass px-3 py-1.5 rounded-lg text-sm text-gray-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {course.tracks && (
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-5">🛤️ Available Tracks</h2>
                  <div className="space-y-2">
                    {course.tracks.map((track) => (
                      <div key={track} className="flex items-center gap-2 text-gray-300">
                        <span className="text-green-400">→</span>
                        <span>{track}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-5">📅 Timeline</h2>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">⏱️</div>
                  <div>
                    <div className="text-2xl font-bold text-white">{course.timeline}</div>
                    <div className="text-gray-400 text-sm">Program duration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 glass-card p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
            <p className="text-gray-400 mb-6">
              Join hundreds of students who have already transformed their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/courses`}
                className="btn-primary inline-block text-center"
              >
                🚀 Enroll Now — ₹{course.discountedPrice.toLocaleString('en-IN')}
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-block text-center"
              >
                💬 Ask a Question
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
