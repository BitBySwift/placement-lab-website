import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardClient from '@/components/sections/DashboardClient';

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <DashboardClient />
      <Footer />
    </main>
  );
}
