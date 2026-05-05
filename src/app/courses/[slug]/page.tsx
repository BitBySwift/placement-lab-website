import { notFound } from 'next/navigation';
import { COURSES } from '@/utils/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseDetailClient from '@/components/sections/CourseDetailClient';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export default function CoursePage({ params }: Props) {
  const course = COURSES.find((c) => c.slug === params.slug);
  if (!course) notFound();

  return (
    <main className="min-h-screen">
      <Header />
      <CourseDetailClient course={course} />
      <Footer />
    </main>
  );
}
