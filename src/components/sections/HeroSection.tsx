'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_TEXTS } from '@/utils/constants';
import { useAuthStore } from '@/store/authStore';
import AuthModal from '@/components/ui/AuthModal';

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [authOpen, setAuthOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % HERO_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm text-indigo-300 font-medium mb-6">
            🚀 India&apos;s #1 Job-Oriented Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
        >
          Placement <span className="gradient-text">Lab</span>
        </motion.h1>

        {/* Rotating text */}
        <div className="h-16 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-slate-300 font-medium"
            >
              {HERO_TEXTS[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto"
        >
          From resume building to job placement — we&apos;ve got you covered. Join 1000+ students who transformed their careers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToCourses}
            className="button-primary text-lg px-8 py-4 glow-effect"
          >
            Explore Courses
          </button>
          <button
            onClick={() => isAuthenticated ? scrollToCourses() : setAuthOpen(true)}
            className="px-8 py-4 text-lg font-semibold glass-effect rounded-lg text-white hover:bg-white/20 transition-all duration-300"
          >
            Start Your Journey →
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="flex flex-col items-center space-y-1">
            <span className="text-xs">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
          </div>
        </motion.div>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </section>
  );
}
