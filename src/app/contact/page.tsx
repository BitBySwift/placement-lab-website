import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Placement Lab',
  description: 'Get in touch with Placement Lab. We\'re here to help you on your career journey.',
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
              📬 Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              We&apos;d Love to{' '}
              <span className="gradient-text">Hear from You</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Whether you have a question about courses, pricing, or just want to say hi — we&apos;re here.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
