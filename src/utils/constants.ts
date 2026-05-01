import { Course, Testimonial } from '@/types';

export const APP_NAME = 'Placement Lab';
export const APP_DESCRIPTION = 'Your career guidance and job-oriented learning platform';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Essential Pack',
    slug: 'essential-pack',
    description: 'Perfect for beginners. Get started with fundamental skills.',
    originalPrice: 699,
    discountedPrice: 219,
    category: 'essential',
    color: 'from-green-400 to-green-600',
    badge: '🟢',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    features: [
      'Resume Building',
      'Resume Review by Experts',
      'Mock Interviews',
      'Git & GitHub Basics',
      'Project Guidance',
      'Job Links',
      'Certificate of Completion',
    ],
    tools: ['Git', 'GitHub', 'Resume Tools', 'Interview Prep'],
    timeline: '4 weeks',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Professional Pack',
    slug: 'professional-pack',
    description: 'Advanced skills for mid-level professionals.',
    originalPrice: 999,
    discountedPrice: 699,
    category: 'professional',
    color: 'from-blue-400 to-blue-600',
    badge: '🔵',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    features: [
      'Portfolio Building',
      'Advanced Resume + ATS Optimization',
      'LinkedIn Optimization',
      'Multiple Mock Interviews',
      'DSA Basics',
      'System Design Intro',
      'LeetCode Practice',
      'Assignments & Tests',
      'Job WhatsApp Alerts',
    ],
    tools: ['DSA', 'LeetCode', 'LinkedIn', 'System Design', 'JavaScript'],
    timeline: '8 weeks',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Advanced Career Pack',
    slug: 'advanced-career-pack',
    description: 'Comprehensive training for senior positions.',
    originalPrice: 6000,
    discountedPrice: 999,
    category: 'advanced',
    color: 'from-purple-400 to-purple-600',
    badge: '🟣',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70504233?w=500&h=300&fit=crop',
    features: [
      'Advanced DSA',
      'System Design',
      'One Tech Stack (User Choice)',
      'Communication Skills',
      'Advanced Projects',
      'Interview Training',
      'Career Counseling',
      'Lifetime Access',
    ],
    tools: ['Advanced DSA', 'System Design', 'Full Stack', 'DevOps', 'AI/ML'],
    timeline: '12 weeks',
    tracks: ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'DevOps'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Job Guaranteed Program',
    slug: 'job-guaranteed-program',
    description: 'Pay after placement. 6-month intensive bootcamp.',
    originalPrice: 36999,
    discountedPrice: 9999,
    category: 'guaranteed',
    color: 'from-red-400 to-red-600',
    badge: '🔴',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    features: [
      'Full Training (DSA + Dev + Interview)',
      'Resume + LinkedIn + Job Profiles',
      'Mock Interviews (Weekly)',
      'Job Assistance',
      'Pay After Placement Model',
      '6 Months Duration',
      'Multiple Tech Tracks',
      'Mentorship',
      'Salary Guarantee (12 LPA minimum)',
    ],
    tools: [
      'Full Stack',
      'iOS (Swift)',
      'Flutter',
      'AI/ML',
      'Data Science',
      'Ethical Hacking',
    ],
    timeline: '6 months',
    tracks: [
      'Full Stack',
      'iOS (Swift)',
      'Flutter',
      'AI/ML',
      'Data Science',
      'Ethical Hacking',
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Aarjav Patel',
    role: 'Software Engineer',
    company: 'Google',
    message:
      'Placement Lab helped me land my dream job at Google. The interview preparation was incredible!',
    image: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Full Stack Developer',
    company: 'Amazon',
    message:
      'The curriculum is so well-structured. I went from zero to hero in 3 months.',
    image: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    role: 'Data Scientist',
    company: 'Microsoft',
    message:
      "I can't thank Placement Lab enough. The mentors are industry experts. Highly recommended!",
    image: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
  },
  {
    id: '4',
    name: 'Neha Singh',
    role: 'DevOps Engineer',
    company: 'Netflix',
    message:
      'Best investment I made in my career. Job guaranteed program delivered exactly what was promised.',
    image: 'https://i.pravatar.cc/150?img=4',
    rating: 5,
  },
];

export const PARTNER_COMPANIES = [
  'Google',
  'Amazon',
  'Microsoft',
  'Apple',
  'Meta',
  'Netflix',
  'Goldman Sachs',
  'JP Morgan',
];

export const HERO_TEXTS = [
  'We shape your career',
  'Your background doesn't matter',
  'We teach skills, not degrees',
  'Are you looking for a job? We are here for you',
  'We build skills that work in real life',
  'From zero to job-ready in months',
];

export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/919876543210',
  instagram: 'https://instagram.com/placementlab',
  twitter: 'https://twitter.com/placementlab',
  linkedin: 'https://linkedin.com/company/placementlab',
};

export const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Welcome to Placement Lab 🚀',
    template: (courseTitle: string) => `
Hello,

Thank you for joining Placement Lab and enrolling in ${courseTitle}.

Your journey starts now. Stay consistent, stay focused, and success will follow.

We're excited to have you on board. Here's what's next:
1. Access your course dashboard
2. Complete your profile
3. Join our WhatsApp community for daily updates

If you have any questions, feel free to reach out to our support team.

Best regards,
The Placement Lab Team
    `,
  },
};