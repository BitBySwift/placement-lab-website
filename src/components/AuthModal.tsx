'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';
import { validatePhone, isValidOTP, sanitizeInput } from '@/services/validators';
import LoadingSpinner from './LoadingSpinner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Step = 'phone' | 'otp' | 'profile';

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { login } = useAuth();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    const validation = validatePhone(phone);
    if (!validation.isValid) {
      toast.error(validation.error!);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: sanitizeInput(phone) }),
      });
      const data = await res.json();
      if (data.success) {
        setVerificationId(data.verificationId);
        setStep('otp');
        toast.success('OTP sent to your phone!');
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!isValidOTP(otp)) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: sanitizeInput(phone), otp, verificationId }),
      });
      const data = await res.json();
      if (data.success) {
        setStep('profile');
      } else {
        toast.error(data.message || 'Invalid OTP');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async () => {
    setLoading(true);
    try {
      const user: User = {
        id: Date.now().toString(),
        phoneNumber: phone,
        name: sanitizeInput(name) || undefined,
        email: sanitizeInput(email) || undefined,
        enrolledCourses: [],
        purchaseHistory: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      login(user);
      toast.success('Welcome to Placement Lab! 🎉');
      onClose();
      onSuccess?.();
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-card w-full max-w-md p-8 animate-fade-in-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold">PL</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {step === 'phone' && 'Login / Sign Up'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'profile' && 'Complete Profile'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {step === 'phone' && 'Enter your phone number to continue'}
            {step === 'otp' && `OTP sent to +91 ${phone}`}
            {step === 'profile' && 'Almost done! Tell us about yourself'}
          </p>
        </div>

        {/* Step: Phone */}
        {step === 'phone' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <span className="glass px-3 py-3 rounded-xl text-gray-400 text-sm flex items-center">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit mobile number"
                className="input-field flex-1"
                maxLength={10}
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={loading || phone.length !== 10}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Send OTP →'}
            </button>
          </div>
        )}

        {/* Step: OTP */}
        {step === 'otp' && (
          <div className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="input-field text-center text-2xl tracking-widest"
              maxLength={6}
            />
            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Verify OTP →'}
            </button>
            <button
              onClick={() => { setStep('phone'); setOtp(''); }}
              className="text-gray-400 hover:text-white text-sm w-full text-center transition-colors"
            >
              ← Change phone number
            </button>
          </div>
        )}

        {/* Step: Profile */}
        {step === 'profile' && (
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name (optional)"
              className="input-field"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address (optional)"
              className="input-field"
            />
            <button
              onClick={handleCompleteProfile}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingSpinner size="sm" /> : '🎉 Get Started!'}
            </button>
          </div>
        )}

        <p className="text-gray-600 text-xs text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
