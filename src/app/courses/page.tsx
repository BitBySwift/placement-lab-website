import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CoursesSection from '@/components/CoursesSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Courses | Placement Lab',
  description: 'Browse all placement and career guidance courses. From essential to job-guaranteed programs.',
};

export default function CoursesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge bg-green-500/20 text-green-400 border border-green-500/30 mb-4">
            🎓 All Courses
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect{' '}
            <span className="gradient-text">Learning Path</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose from our career-focused programs designed to take you from where you are to where you want to be.
          </p>
        </section>

        <CoursesSection />
      </div>
      <Footer />
    </main>
  );
}
