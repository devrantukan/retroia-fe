import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Handle static assets
  if (request.nextUrl.pathname.includes("/_next/")) {
    return NextResponse.next();
  }

  // Remove double /emlak/emlak if it exists
  if (request.nextUrl.pathname.startsWith("/emlak/emlak/")) {
    const newPath = request.nextUrl.pathname.replace(
      "/emlak/emlak/",
      "/emlak/"
    );
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Add /emlak prefix if it's missing and not a WordPress path
  if (
    !request.nextUrl.pathname.startsWith("/emlak") &&
    !request.nextUrl.pathname.startsWith("/wp-") &&
    !request.nextUrl.pathname.startsWith("/wp/")
  ) {
    const newPath = `/emlak${request.nextUrl.pathname}`;
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and WordPress admin
    "/((?!api|_next/static|_next/image|favicon.ico|wp-admin|wp-login).*)",
  ],
};
