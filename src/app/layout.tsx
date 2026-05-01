import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Placement Lab - Your Career Guidance Platform',
  description:
    'Join 1000+ students who landed their dream jobs. Get resume building, mock interviews, DSA training, and job assistance with Placement Lab.',
  keywords: 'placement, job, career, training, DSA, system design, resume, interview',
  openGraph: {
    title: 'Placement Lab - Your Career Guidance Platform',
    description: 'Join 1000+ students who landed their dream jobs.',
    type: 'website',
    url: 'https://placementlab.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <AuthContextProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
              },
            }}
          />
        </AuthContextProvider>
      </body>
    </html>
  );
}
