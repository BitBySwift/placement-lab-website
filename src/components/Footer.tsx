import Link from 'next/link';
import { SOCIAL_LINKS } from '@/utils/constants';

const footerLinks = {
  Courses: [
    { label: 'Essential Pack', href: '/courses/1' },
    { label: 'Professional Pack', href: '/courses/2' },
    { label: 'Advanced Career Pack', href: '/courses/3' },
    { label: 'Job Guaranteed', href: '/courses/4' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  Support: [
    { label: 'WhatsApp', href: SOCIAL_LINKS.whatsapp },
    { label: 'Email', href: 'mailto:hello@placementlab.com' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PL</span>
              </div>
              <span className="text-white font-bold text-xl">Placement Lab</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your career guidance and job-oriented learning platform. Join 1000+ students who
              landed their dream jobs.
            </p>
            <div className="flex gap-4">
              {[
                { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: '📸' },
                { href: SOCIAL_LINKS.twitter, label: 'Twitter', icon: '🐦' },
                { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', icon: '💼' },
                { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp', icon: '💬' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Placement Lab. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with ❤️ for students across India
          </p>
        </div>
      </div>
    </footer>
  );
}
