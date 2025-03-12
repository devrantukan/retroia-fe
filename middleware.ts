import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NEXT_ROUTES = [
  "ofislerimiz",
  "danismanlarimiz",
  "gayrimenkul-danismani-basvuru-formu",
  "gayrimenkullerinizi-satalim-kiralayalim",
];

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

  // Skip API routes - let rewrites handle them
  if (pathname.startsWith("/api/") || pathname.startsWith("/emlak/api/")) {
    return NextResponse.next();
  }

  // Handle direct access to Next.js routes without /emlak prefix
  const routePath = pathname.replace(/^\//, "");
  if (
    NEXT_ROUTES.some(
      (route) => routePath === route || routePath === route + "/"
    )
  ) {
    return NextResponse.redirect(new URL(`/emlak${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!wp-admin|wp-login|wp-content|favicon.ico).*)",
    "/emlak/:path*",
  ],
};
