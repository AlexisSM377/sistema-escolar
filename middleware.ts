// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Verificar la sesión del usuario
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Rutas que requieren autenticación
  const protectedRoutes = ["/admin", "/teacher", "/alumno"];

  // Rutas de inicio de sesión y registro
  const authRoutes = ["/login", "/register"];

  const path = req.nextUrl.pathname;

  // Si no hay sesión y se intenta acceder a rutas protegidas
  if (protectedRoutes.some((route) => path.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si hay sesión y se intenta acceder a rutas de autenticación
  if (authRoutes.includes(path) && session) {
    // Redirigir al dashboard según el tipo de usuario
    const { data: usuarioData } = await supabase
      .from("usuarios")
      .select("tipo_usuario")
      .eq("email", session.user.email)
      .single();

    switch (usuarioData?.tipo_usuario) {
      case "admin":
        return NextResponse.redirect(new URL("/admin", req.url));
      case "maestro":
        return NextResponse.redirect(new URL("/teacher", req.url));
      case "alumno":
        return NextResponse.redirect(new URL("/alumno", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
