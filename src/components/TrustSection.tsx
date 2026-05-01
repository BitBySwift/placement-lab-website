'use client';

import { PARTNER_COMPANIES } from '@/utils/constants';

const trustBadges = [
  { icon: '🎓', value: '1000+', label: 'Students Placed' },
  { icon: '👨‍🏫', value: '50+', label: 'Expert Mentors' },
  { icon: '🏆', value: '95%', label: 'Success Rate' },
  { icon: '💰', value: '18 LPA', label: 'Avg. Package' },
];

export default function TrustSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="glass-card p-6 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl mb-2">{badge.icon}</div>
              <div className="text-3xl font-bold gradient-text-green mb-1">{badge.value}</div>
              <div className="text-gray-400 text-sm">{badge.label}</div>
            </div>
          ))}
        </div>

        {/* Partner Companies */}
        <div className="text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-8">
            Our students work at top companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {PARTNER_COMPANIES.map((company) => (
              <div
                key={company}
                className="glass px-5 py-3 rounded-xl text-gray-400 font-semibold text-sm hover:text-white hover:border-white/20 transition-all duration-300"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
