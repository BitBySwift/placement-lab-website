export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidOTP(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): ValidationResult {
  if (!isValidName(data.name)) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  if (!isValidEmail(data.email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  if (data.message.trim().length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters' };
  }
  return { isValid: true };
}

export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }
  if (!isValidPhone(phone)) {
    return { isValid: false, error: 'Please enter a valid 10-digit Indian mobile number' };
  }
  return { isValid: true };
}
