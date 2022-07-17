import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authRoutes = ["/login/", "/signup/"];
  const loggedInRoutesRegex = /^(\/blog\/.+\/?|^\/{1})/g
  const url = req.nextUrl.clone();

  const isLoggedIn = req.cookies?.get("isLoggedIn") === "yes";

  // Haha regex go brrr
  if (!isLoggedIn && (url.pathname.match(loggedInRoutesRegex)?.join('') === url.pathname)) {
    url.pathname = "/welcome";
    return NextResponse.rewrite(url);
  }
  if (authRoutes.includes(req.nextUrl.pathname) && isLoggedIn) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}
