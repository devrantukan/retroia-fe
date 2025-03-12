import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Since we're using basePath, we don't need to handle /emlak prefix
  // Just handle static assets and skip WordPress paths
  if (request.nextUrl.pathname.includes("/_next/")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match paths under our basePath
    "/emlak/:path*",
  ],
};
