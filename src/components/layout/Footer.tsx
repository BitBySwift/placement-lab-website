import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SOCIAL_LINKS } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-3">Placement Lab</h3>
            <p className="text-slate-400 text-sm max-w-xs">
              Your career guidance and job-oriented learning platform. We shape careers, not just resumes.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors"><FaWhatsapp size={20} /></a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors"><FaInstagram size={20} /></a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors"><FaTwitter size={20} /></a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors"><FaLinkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Courses</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/courses/essential-pack" className="hover:text-white transition-colors">Essential Pack</Link></li>
              <li><Link href="/courses/professional-pack" className="hover:text-white transition-colors">Professional Pack</Link></li>
              <li><Link href="/courses/advanced-career-pack" className="hover:text-white transition-colors">Advanced Career Pack</Link></li>
              <li><Link href="/courses/job-guaranteed-program" className="hover:text-white transition-colors">Job Guaranteed Program</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#testimonials" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Placement Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
