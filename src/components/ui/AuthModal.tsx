'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { type ConfirmationResult } from 'firebase/auth';
import { useAuthStore } from '@/store/authStore';
import { User } from '@/types';

interface WindowWithRecaptcha extends Window {
  recaptchaVerifier?: { clear: () => void };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const { setUser, setLoading: setAuthLoading } = useAuthStore();

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('phone');
      setPhone('');
      setOtp('');
      setConfirmationResult(null);
    }
  }, [isOpen]);

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    try {
      // Dynamic import to avoid SSR issues
      const { auth } = await import('@/lib/firebase');
      if (!auth) {
        throw new Error('Firebase not configured. Please set up Firebase environment variables.');
      }
      const { RecaptchaVerifier, signInWithPhoneNumber } = await import('firebase/auth');

      // Clear previous recaptcha if any
      const win = window as WindowWithRecaptcha;
      if (win.recaptchaVerifier) {
        win.recaptchaVerifier.clear();
      }

      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
      win.recaptchaVerifier = verifier;

      const fullPhone = `+91${phone}`;
      const result = await signInWithPhoneNumber(auth, fullPhone, verifier);
      setConfirmationResult(result);
      setStep('otp');
      toast.success('OTP sent to your phone!');
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    setLoading(true);
    setAuthLoading(true);
    try {
      const result = await confirmationResult!.confirm(otp);
      const firebaseUser = result.user;

      const user: User = {
        id: firebaseUser.uid,
        phoneNumber: firebaseUser.phoneNumber || `+91${phone}`,
        enrolledCourses: [],
        purchaseHistory: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setUser(user);
      toast.success('Login successful! Welcome to Placement Lab 🚀');
      onClose();
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-10 w-full max-w-md card-base"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {step === 'phone' ? 'Login / Signup' : 'Verify OTP'}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {step === 'phone'
                    ? 'Enter your phone number to continue'
                    : `OTP sent to +91 ${phone}`}
                </p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
                <HiX size={20} />
              </button>
            </div>

            {step === 'phone' ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="glass-effect border border-white/20 rounded-lg px-3 py-3 text-white font-medium whitespace-nowrap">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile number"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                  />
                </div>
                <div id="recaptcha-container" ref={recaptchaRef} />
                <button
                  onClick={handleSendOTP}
                  disabled={loading || phone.length < 10}
                  className="button-primary w-full disabled:opacity-50"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
                <p className="text-slate-500 text-xs text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-center text-xl tracking-widest"
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOTP()}
                />
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length !== 6}
                  className="button-primary w-full disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  onClick={() => setStep('phone')}
                  className="w-full text-slate-400 text-sm hover:text-white transition-colors"
                >
                  ← Change phone number
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
