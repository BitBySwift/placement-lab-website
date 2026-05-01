import { NextRequest, NextResponse } from 'next/server';
import { getCourseById } from '@/services/courseService';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = getCourseById(params.id);
    if (!course) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error('Get course error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
