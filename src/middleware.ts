import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = "/home";
        return NextResponse.redirect(url);
    }
}
