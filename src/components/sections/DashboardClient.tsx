'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { COURSES } from '@/utils/constants';

export default function DashboardClient() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Redirecting to login...</div>
      </div>
    );
  }

  const enrolledCourses = COURSES.filter((c) => user.enrolledCourses.includes(c.id));

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-base mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                {user.name ? user.name[0].toUpperCase() : '👤'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{user.name || 'Welcome back!'}</h2>
                <p className="text-slate-400">{user.phoneNumber}</p>
                {user.email && <p className="text-slate-400 text-sm">{user.email}</p>}
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Enrolled Courses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Enrolled Courses</h3>
          {enrolledCourses.length === 0 ? (
            <div className="card-base text-center py-12">
              <p className="text-4xl mb-3">📚</p>
              <p className="text-slate-400">No courses enrolled yet.</p>
              <button onClick={() => router.push('/#courses')} className="button-primary mt-4">
                Explore Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="card-base">
                  <h4 className="text-white font-semibold mb-2">{course.title}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Progress</span>
                    {/* TODO: Replace with actual progress from Firestore enrollment data */}
                    <span className="text-indigo-400 text-sm font-medium">0%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Purchase History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Purchase History</h3>
          {user.purchaseHistory.length === 0 ? (
            <div className="card-base text-center py-8">
              <p className="text-slate-400">No purchases yet.</p>
            </div>
          ) : (
            <div className="card-base overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-white/10">
                    <th className="text-left pb-3">Course</th>
                    <th className="text-left pb-3">Amount</th>
                    <th className="text-left pb-3">Status</th>
                    <th className="text-left pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {user.purchaseHistory.map((p) => {
                    const course = COURSES.find((c) => c.id === p.courseId);
                    return (
                      <tr key={p.id} className="border-b border-white/5 text-slate-300">
                        <td className="py-3">{course?.title || p.courseId}</td>
                        <td className="py-3">₹{p.amount}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${p.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3">{new Date(p.purchaseDate).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
