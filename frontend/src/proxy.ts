import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";


export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;


  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = process.env.JWT_TOKEN;

    if (!secret) {
      throw new Error("JWT_TOKEN não definido");
    }
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch (err) {
    console.error("Token inválido:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/perfil", "/perfil/:path*", "/multa/:path*", "/purchase/:path*"],
};
