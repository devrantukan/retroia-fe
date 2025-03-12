import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Skip WordPress paths and root
  if (
    request.nextUrl.pathname.startsWith("/wp-") ||
    request.nextUrl.pathname.startsWith("/wp/") ||
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/api/") ||
    request.nextUrl.pathname.includes("favicon")
  ) {
    return NextResponse.next();
  }

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
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  // If path doesn't start with /emlak and isn't a special path, add /emlak
  if (!request.nextUrl.pathname.startsWith("/emlak")) {
    // Check if this is a Next.js page path
    const isNextPath = [
      "ofislerimiz",
      "danismanlarimiz",
      "gayrimenkul-danismani-basvuru-formu",
      "gayrimenkullerinizi-satalim-kiralayalim",
    ].some((path) => request.nextUrl.pathname.includes(path));

    if (isNextPath) {
      const newPath = `/emlak${request.nextUrl.pathname}`;
      return NextResponse.redirect(new URL(newPath, request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and WordPress admin
    "/((?!_next/static|_next/image|favicon.ico|wp-admin|wp-login).*)",
  ],
};
