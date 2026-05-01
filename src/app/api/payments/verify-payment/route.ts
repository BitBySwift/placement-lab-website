import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/services/paymentService';
import { getCourseById } from '@/services/courseService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentId, orderId, signature, courseId } = body;

    if (!paymentId || !orderId || !signature || !courseId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature(paymentId, orderId, signature);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Payment verification failed' },
        { status: 400 }
      );
    }

    const course = getCourseById(courseId);
    if (!course) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }

    // In production: create enrollment record in database
    return NextResponse.json({
      success: true,
      message: 'Payment verified and enrollment created',
      courseTitle: course.title,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
