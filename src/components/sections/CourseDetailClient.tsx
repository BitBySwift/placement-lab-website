'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Course } from '@/types';
import { useAuthStore } from '@/store/authStore';
import PaymentButton from '@/components/ui/PaymentButton';
import AuthModal from '@/components/ui/AuthModal';
import CountdownTimer from '@/components/ui/CountdownTimer';

interface Props { course: Course; }

const TABS = ['Overview', 'Features', 'Tools', 'Timeline'];

export default function CourseDetailClient({ course }: Props) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [authOpen, setAuthOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12"
        >
          <div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${course.color} text-white mb-4`}>
              {course.badge} {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-slate-400 text-lg mb-6">{course.description}</p>
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-4xl font-bold gradient-text">₹{course.discountedPrice.toLocaleString()}</span>
              <span className="text-xl text-slate-500 line-through">₹{course.originalPrice.toLocaleString()}</span>
              <span className="text-green-400 text-sm font-medium">
                {Math.round((1 - course.discountedPrice / course.originalPrice) * 100)}% OFF
              </span>
            </div>
            <CountdownTimer />
            <div className="mt-6">
              {isAuthenticated ? (
                <PaymentButton course={course} />
              ) : (
                <button onClick={() => setAuthOpen(true)} className="button-primary text-lg px-8 py-4 glow-effect">
                  Login to Enroll
                </button>
              )}
            </div>
          </div>
          <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden">
            <Image src={course.image} alt={course.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 glass-effect p-1 rounded-xl mb-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-base"
        >
          {activeTab === 'Overview' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">About This Course</h2>
              <p className="text-slate-400">{course.description}</p>
              {course.tracks && (
                <div className="mt-6">
                  <h3 className="text-white font-semibold mb-3">Available Tracks</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tracks.map((track) => (
                      <span key={track} className="px-3 py-1 glass-effect rounded-full text-sm text-slate-300">{track}</span>
                    ))}
                  </div>
                </div>
              )}
              {course.category === 'guaranteed' && (
                <div className="mt-6 p-4 border border-yellow-500/30 rounded-xl bg-yellow-500/10">
                  <p className="text-yellow-400 text-sm">⚠️ Disclaimer: The &quot;Pay After Placement&quot; model and salary guarantee are subject to terms and conditions. Results may vary based on individual effort and market conditions.</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'Features' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">What You&apos;ll Get</h2>
              <ul className="space-y-3">
                {course.features.map((f) => (
                  <li key={f} className="flex items-start space-x-3">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'Tools' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Tools &amp; Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {course.tools.map((tool) => (
                  <span key={tool} className="px-4 py-2 glass-effect rounded-lg text-slate-300 font-medium">{tool}</span>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'Timeline' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Course Timeline</h2>
              <div className="flex items-center space-x-3">
                <span className="text-4xl">⏱️</span>
                <div>
                  <p className="text-2xl font-bold text-white">{course.timeline}</p>
                  <p className="text-slate-400 text-sm">Estimated completion time</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
