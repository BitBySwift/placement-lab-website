export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
  avatar?: string;
  enrolledCourses: string[];
  purchaseHistory: Purchase[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category: 'essential' | 'professional' | 'advanced' | 'guaranteed';
  color: string;
  badge: string;
  image: string;
  features: string[];
  tools: string[];
  timeline: string;
  tracks?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
  status: 'active' | 'completed' | 'paused';
}

export interface Purchase {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  paymentId: string;
  orderId: string;
  status: 'pending' | 'completed' | 'failed';
  purchaseDate: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  image: string;
  rating: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  verificationId?: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  orderId?: string;
  paymentId?: string;
  amount?: number;
}