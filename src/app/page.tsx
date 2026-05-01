import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CoursesSection from '@/components/CoursesSection';
import TrustSection from '@/components/TrustSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrustSection />
      <CoursesSection />
      <TestimonialsSection />
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
              📬 Contact Us
            </span>
            <h2 className="section-title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="section-subtitle">
              Have questions? We&apos;re here to help you on your journey.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
