import { NextResponse } from 'next/server';

export async function GET() {
  // In production: get user enrollments from database
  return NextResponse.json({
    success: true,
    enrollments: [],
  });
}
