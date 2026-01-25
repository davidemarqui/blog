import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Optional: Add custom checks
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token; // Allow any authenticated user
      },
    },
  }
);

export const config = { matcher: ['/admin/:path*'] };