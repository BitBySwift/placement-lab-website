'use client';
import { motion } from 'framer-motion';
import { PARTNER_COMPANIES } from '@/utils/constants';

const STATS = [
  { value: '1000+', label: 'Students Placed', icon: '🎓' },
  { value: '50+', label: 'Industry Mentors', icon: '👨‍💼' },
  { value: '95%', label: 'Placement Rate', icon: '📈' },
  { value: '12 LPA', label: 'Avg Package', icon: '💰' },
];

export default function TrustSection() {
  const doubled = [...PARTNER_COMPANIES, ...PARTNER_COMPANIES];

  return (
    <section className="py-20 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-slate-400 text-lg">Real Job-Oriented Training with measurable results</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Partner logos scrolling */}
        <div className="relative">
          <div className="text-center mb-8">
            <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">Our students work at</p>
          </div>
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex space-x-12 whitespace-nowrap"
            >
              {doubled.map((company, i) => (
                <div
                  key={`${company}-${i}`}
                  className="glass-effect px-8 py-4 rounded-xl flex items-center justify-center min-w-[160px]"
                >
                  <span className="text-slate-300 font-semibold text-lg">{company}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
