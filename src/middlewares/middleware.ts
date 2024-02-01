import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.headers.get("authorization")?.split(" ") ?? [];
    // in middleware we can't use getServerSession but we can use getToken to get session indirectly
    const session = !!token;
    const isLogin = req.nextUrl.pathname.includes("login");

    // redirect user to correct authorized routes
    if (!session && !isLogin) {
        return NextResponse.redirect(`${req.nextUrl.origin}/login`);
    }
    if (session && isLogin) {
        return NextResponse.redirect(`${req.nextUrl.origin}/`);
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
