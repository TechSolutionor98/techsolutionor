import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("jwt")?.value;

  // Admin Authentication Protection
  const isProtected = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match protected admin routes and client routes cleanly without loopback deadlock
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
