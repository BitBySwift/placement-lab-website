'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HERO_TEXTS } from '@/utils/constants';

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState(HERO_TEXTS[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % HERO_TEXTS.length);
        setDisplayText(HERO_TEXTS[(currentTextIndex + 1) % HERO_TEXTS.length]);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentTextIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center glass px-4 py-2 rounded-full mb-8 animate-fade-in-up">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          <span className="text-green-400 text-sm font-medium">1000+ Students Placed 🚀</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
          Land Your{' '}
          <span className="gradient-text">Dream Job</span>
          <br />
          with Placement Lab
        </h1>

        {/* Rotating text */}
        <div className="h-16 flex items-center justify-center mb-8">
          <p
            className={`text-xl md:text-2xl text-gray-300 font-medium transition-all duration-300 ${
              isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {displayText}
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in-up">
          {[
            { value: '1000+', label: 'Students Placed' },
            { value: '95%', label: 'Success Rate' },
            { value: '18 LPA', label: 'Average Package' },
            { value: '50+', label: 'Expert Mentors' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card px-6 py-3">
              <div className="text-green-400 font-bold text-xl">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
          <Link href="/courses" className="btn-primary text-lg py-4 px-8 inline-block">
            🚀 Explore Courses
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-lg py-4 px-8 inline-flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-400">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.285 7.034L.785 23.25l4.305-1.468A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.373l-.36-.214-3.724 1.273 1.238-3.618-.234-.371A9.818 9.818 0 1112 21.818z" />
            </svg>
            Talk to Mentor
          </a>
        </div>

        {/* Trust indicators */}
        <p className="text-gray-500 text-sm mt-8 animate-fade-in">
          Trusted by students from IIT, NIT, and top colleges across India
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
