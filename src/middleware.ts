import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("chat.userId")?.value;
  const currentRoute = request.nextUrl.pathname;
  const loginRoute = "/";
  const registerRoute = "/register";

  const freeRoutes = [loginRoute, registerRoute];

  if (!token && currentRoute === loginRoute) return NextResponse.next();

  if (!token && !freeRoutes.includes(currentRoute)) {
    const LoginURLRedirect = new URL("/", request.url);
    return NextResponse.redirect(LoginURLRedirect);
  }

  if (token && currentRoute === loginRoute) {
    const HomeURLRedirect = new URL("/chat", request.url);
    return NextResponse.redirect(HomeURLRedirect);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)", // all routes except /api, /_next/static, /_next/image, /favicon.ico, /images
  ],
};
