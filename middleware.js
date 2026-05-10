// Authentication Middleware
// Protect routes that require authentication

import { NextResponse } from "next/server";
import { verifyToken } from "./lib/utils/jwt.js";

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;

  // Routes that don't require authentication
  const publicRoutes = [
    "/login",
    "/register",
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/send-otp",
    "/api/auth/verify-otp",
    "/api/auth/me",
    "/api/user/orders",
    "/api/user/orders/[id]",
    "/api/user/cart",
    "/api/user/profile",
  ];

  // Routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "/dashboard/orders",
    "/dashboard/cart",
    "/dashboard/profile",
  ];

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If it's a protected route, check authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // If no token and route is protected, redirect to login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify the token
    const decoded = verifyToken(token);
    if (!decoded) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Token is valid or route is public, allow access
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
