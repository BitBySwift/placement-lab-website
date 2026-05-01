import crypto from 'crypto';
import { OTPResponse } from '@/types';

// In-memory OTP store (in production, use Redis or a database)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export function generateOTP(length = 6): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return String(crypto.randomInt(min, max + 1));
}

export function storeOTP(identifier: string, otp: string, ttlMs = 10 * 60 * 1000): void {
  otpStore.set(identifier, {
    otp,
    expiresAt: Date.now() + ttlMs,
  });
}

export function verifyOTP(identifier: string, otp: string): boolean {
  const stored = otpStore.get(identifier);
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(identifier);
    return false;
  }
  const isValid = stored.otp === otp;
  if (isValid) {
    otpStore.delete(identifier); // One-time use
  }
  return isValid;
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function sendOTPResponse(identifier: string): Promise<OTPResponse> {
  try {
    const otp = generateOTP();
    storeOTP(identifier, otp);
    return {
      success: true,
      message: 'OTP sent successfully',
      verificationId: Buffer.from(identifier).toString('base64'),
    };
  } catch {
    return {
      success: false,
      message: 'Failed to generate OTP',
    };
  }
}
