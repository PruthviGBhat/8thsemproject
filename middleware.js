import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/api/webhook',
    '/about'
    // Add other public routes as needed
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    '/api/webhook/clerk'
    // Add other ignored routes as needed
  ],
});
 
export const config = {
  matcher: [
    // Skip public files, Next.js internals, and static assets
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Include all API routes
    '/api/:path*'
  ],
};