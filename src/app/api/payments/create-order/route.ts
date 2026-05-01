import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/services/paymentService';
import { getCourseById } from '@/services/courseService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId, amount } = body;

    if (!courseId || !amount) {
      return NextResponse.json({ success: false, message: 'Course ID and amount are required' }, { status: 400 });
    }

    const course = getCourseById(courseId);
    if (!course) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }

    // Validate amount matches course price
    if (Number(amount) !== course.discountedPrice) {
      return NextResponse.json({ success: false, message: 'Invalid amount' }, { status: 400 });
    }

    const result = await createRazorpayOrder(course.discountedPrice);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
