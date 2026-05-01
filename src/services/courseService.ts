import { COURSES } from '@/utils/constants';
import { Course } from '@/types';

export function getAllCourses(): Course[] {
  return COURSES;
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((course) => course.id === id);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}

export function getCoursesByCategory(category: Course['category']): Course[] {
  return COURSES.filter((course) => course.category === category);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getDiscountPercentage(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100);
}
