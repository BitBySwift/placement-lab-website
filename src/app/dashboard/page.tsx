'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { COURSES } from '@/utils/constants';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DashboardPage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </main>
    );
  }

  if (!isAuthenticated) return null;

  const enrolledCourses = COURSES.filter((c) => user?.enrolledCourses?.includes(c.id));

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Welcome */}
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, {user?.name || 'Student'}! 👋
                </h1>
                <p className="text-gray-400">{user?.phoneNumber}</p>
                {user?.email && <p className="text-gray-400 text-sm">{user.email}</p>}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Enrolled', value: enrolledCourses.length, icon: '📚' },
              { label: 'Completed', value: 0, icon: '✅' },
              { label: 'Certificates', value: 0, icon: '🏆' },
              { label: 'Progress', value: '0%', icon: '📈' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Enrolled Courses */}
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">📚 My Courses</h2>
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-gray-400 mb-6">You haven&apos;t enrolled in any courses yet.</p>
                <Link href="/courses" className="btn-primary inline-block">
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="glass p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{course.title}</h3>
                      <p className="text-gray-400 text-sm">{course.timeline}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Progress</div>
                        <div className="text-green-400 font-semibold">0%</div>
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="btn-secondary text-sm py-2 px-4"
                      >
                        Continue →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Purchase History */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-6">💳 Purchase History</h2>
            {!user?.purchaseHistory?.length ? (
              <p className="text-gray-400 text-center py-8">No purchases yet.</p>
            ) : (
              <div className="space-y-3">
                {user.purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="glass p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">Order #{purchase.orderId}</div>
                      <div className="text-gray-400 text-sm">
                        {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-green-400 font-semibold">
                      ₹{purchase.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
