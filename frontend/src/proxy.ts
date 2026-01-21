import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "meusegredotemporario123";

// Função para transformar a chave secreta em formato CryptoKey
function getKey(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;


  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, getKey(JWT_SECRET));
    return NextResponse.next();
  } catch (err) {
    console.error("Token inválido:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/perfil", "/perfil/:path*", "/multa/:path*", "/purchase/:path*"],
};
