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

  // Handle API routes - redirect to /emlak/api if accessed directly at /api
  if (pathname.startsWith("/api/")) {
    return NextResponse.redirect(new URL(`/emlak${pathname}`, request.url));
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
