import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us | Placement Lab',
  description: 'Learn about Placement Lab\'s mission to help students land their dream jobs.',
};

const team = [
  { name: 'Rahul Verma', role: 'Founder & CEO', emoji: '👨‍💼', bio: '10+ years in tech recruiting and career coaching.' },
  { name: 'Anjali Singh', role: 'Head of Curriculum', emoji: '👩‍🏫', bio: 'Ex-Google engineer with passion for education.' },
  { name: 'Vikram Nair', role: 'Lead Mentor', emoji: '👨‍💻', bio: 'IIT alumnus, helped 500+ students crack top companies.' },
  { name: 'Pooja Mehta', role: 'Career Counselor', emoji: '👩‍💼', bio: 'Specialized in resume optimization and interview prep.' },
];

const values = [
  { title: 'Student First', desc: 'Every decision we make puts our students at the center.', icon: '🎯' },
  { title: 'Real Skills', desc: 'We teach practical skills that employers actually want.', icon: '⚡' },
  { title: 'Guaranteed Results', desc: 'We stand behind our programs with job guarantees.', icon: '🏆' },
  { title: 'Community', desc: 'A supportive network of peers and mentors for life.', icon: '🤝' },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            <span className="badge bg-green-500/20 text-green-400 border border-green-500/30 mb-4">
              🏢 About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We&apos;re on a Mission to{' '}
              <span className="gradient-text">Change Careers</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Placement Lab was founded with a simple belief: every talented student deserves a
              chance to work at their dream company, regardless of their background or college tier.
            </p>
          </div>

          {/* Mission */}
          <div className="glass-card p-10 mb-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              To democratize access to quality career guidance and make top-tier job placement
              accessible to every student in India. We believe background doesn&apos;t matter —
              skills and determination do.
            </p>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="section-title mb-12">
              Our <span className="gradient-text">Values</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="glass-card p-6">
                  <div className="text-4xl mb-3">{value.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 className="section-title mb-12">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {team.map((member) => (
                <div key={member.name} className="glass-card p-6 flex items-start gap-4">
                  <div className="text-5xl flex-shrink-0">{member.emoji}</div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{member.name}</h3>
                    <p className="text-green-400 text-sm mb-2">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
