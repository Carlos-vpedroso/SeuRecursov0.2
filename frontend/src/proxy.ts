import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");

  // ==========================================
  // ADMIN
  // ==========================================

  if (isAdminRoute) {
    const adminToken = request.cookies.get("adminToken")?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_ADMIN_TOKEN!);

      await jwtVerify(adminToken, secret);

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ==========================================
  // USUÁRIO COMUM
  // ==========================================

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search,
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/perfil/:path*",
    "/formulario/revisao/:path*",
    "/admin/dashboard/:path*",
  ],
};

// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function proxy(request: NextRequest) {

//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   if (!token) {
//     const loginUrl = new URL("/login", request.url);

//     loginUrl.searchParams.set(
//       "callbackUrl",
//       request.nextUrl.pathname + request.nextUrl.search
//     );
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/perfil/:path*",
//     "/formulario/revisao/:path*",
//   ],
// };
