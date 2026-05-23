import { NextResponse } from "next/server";

/* 仅本地使用 Keystatic 后台：生产环境直接 404 屏蔽 /keystatic 与其 API，
   避免把不可写（无服务器环境）的后台界面暴露到线上 */
export function middleware() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic", "/keystatic/:path*", "/api/keystatic/:path*"],
};
