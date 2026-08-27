import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const signedIn = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  if (!signedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (signedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
