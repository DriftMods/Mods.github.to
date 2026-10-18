import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Protect all /admin except /admin/login
  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
    const session = req.cookies.get("drift_session")
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ["/admin/:path*"] }