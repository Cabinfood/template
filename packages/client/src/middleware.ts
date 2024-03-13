import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

type AuthMiddlewareParams = {
  publicRoutes?: string[];
  ignoredRoutes?: string[];
};

export function authMiddleware(params: AuthMiddlewareParams) {
  return async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const accessToken = url.searchParams.get("accessToken");
    const refreshToken = url.searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.set("accessToken", accessToken);
      response.cookies.set("refreshToken", refreshToken);
      return response;
    }
  };
}
