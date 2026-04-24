// proxy.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const privateRoutes = ["/dashboard", "/profile", "/job/"];

const UnauthorizedRoutes = ["/register", "/api/auth/signin"];

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    console.log("cookies:", req.cookies.getAll());

    if(!token) {
        console.log("No token found.", token, process.env.NEXTAUTH_SECRET);
    } else {
        console.log("Token found. ", token, process.env.NEXTAUTH_SECRET);
    }

    const { pathname } = req.nextUrl;

    // Protect these routes
    if (privateRoutes.some((route) => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/register", req.url));
    }

    if (UnauthorizedRoutes.some((route) => pathname.startsWith(route)) && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/register/:path*", "/api/auth/signin/:path*", "/job/:path*" ],
};

