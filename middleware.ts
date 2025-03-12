import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip WordPress paths
  if (pathname.startsWith("/wp-") || pathname === "/") {
    return NextResponse.next();
  }

  // Handle static assets
  if (pathname.includes("/_next/")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|wp-admin|wp-login|wp-content).*)",
  ],
};
