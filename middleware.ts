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
  const protectedRoutes = ["/admin", "/maestro", "/alumno"];

  // Rutas de inicio de sesión y registro
  const authRoutes = ["/"];

  const path = req.nextUrl.pathname;

  // Si no hay sesión y se intenta acceder a rutas protegidas
  if (protectedRoutes.some((route) => path.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Si hay sesión y se intenta acceder a rutas de autenticación
  if (authRoutes.includes(path) && session) {
    // Verificar si hay un rol específico en la URL
    const role = req.nextUrl.searchParams.get("role");

    if (role) {
      // Si hay un rol específico, redirigir a ese dashboard
      switch (role) {
        case "admin":
          return NextResponse.redirect(new URL("/admin", req.url));
        case "maestro":
          return NextResponse.redirect(new URL("/maestro", req.url));
        case "alumno":
          return NextResponse.redirect(new URL("/alumno", req.url));
      }
    }

    // Si no hay rol específico o el rol no coincide, usar el tipo_usuario de la base de datos
    const { data: usuarioData } = await supabase
      .from("usuarios")
      .select("id_rol")
      .eq("email", session.user.email)
      .single();

    switch (usuarioData?.id_rol) {
      case "admin":
        return NextResponse.redirect(new URL("/admin", req.url));
      case "maestro":
        return NextResponse.redirect(new URL("/maestro", req.url));
      case "alumno":
        return NextResponse.redirect(new URL("/alumno", req.url));
      default:
        return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
