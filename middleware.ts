import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jwtVerify(token, secret);

    const userId = decoded.payload.id as string;

    // Clone headers and add userId
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (e) {
    console.log("JWT ERROR:", e);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*","/api/rooms/:path*"],
};