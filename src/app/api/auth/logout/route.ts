import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  // Clear any server-side session cookies if implemented
  response.cookies.delete('session_token');
  return response;
}
