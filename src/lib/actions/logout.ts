"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import createSupabaseServerClient from "../supabase/server";

export async function logout() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error al cerrar sesión:", error);
    return { error: true, message: error.message };
  }

  // Limpiar las cookies
  (
    await // Limpiar las cookies
    cookies()
  ).delete("sb-access-token");
  (await cookies()).delete("sb-refresh-token");

  // Redirigir al login
  redirect("/login");
}
