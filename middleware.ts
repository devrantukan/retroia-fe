import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of Next.js routes
const nextRoutes = [
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

  // Remove double /emlak/emlak if it exists
  if (pathname.startsWith("/emlak/emlak/")) {
    const newPath = pathname.replace("/emlak/emlak/", "/emlak/");
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  // Check if this is a Next.js route without /emlak prefix
  const routePath = pathname.replace(/^\//, "");
  if (
    nextRoutes.some((route) => routePath === route || routePath === route + "/")
  ) {
    return NextResponse.redirect(
      new URL(`/emlak${pathname}`, request.url),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|wp-admin|wp-login|wp-content).*)",
  ],
};
