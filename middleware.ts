// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const privateRoutes = ["/dashboard", "/profile"];

const UnauthorizedRoutes = ["/register", "/login"];

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    // Protect these routes
    if (privateRoutes.some((route) => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/register", req.url ));
    }

    if( UnauthorizedRoutes.some((route) => pathname.startsWith(route)) && token ) {
        return NextResponse.redirect(new URL("/", req.url ));
    }

    return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/register/:path*" ],
};