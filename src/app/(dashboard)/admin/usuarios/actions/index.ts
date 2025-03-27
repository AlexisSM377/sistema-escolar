"use server";

import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createUsuario(data: {
  email: string;
  password: string;
  nombre: string;
  id_rol: string;
  genero: string;
  matricula: string;
}) {
  const supabase = await createSupabaseAdmin();

  const createResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      id_rol: data.id_rol,
    },
  });

  if (createResult.error?.message) {
    return {
      error: createResult.error.message,
    };
  } else {
    const usuariosResult = await supabase.from("usuarios").insert({
      id: createResult.data.user?.id,
      nombre: data.nombre,
      id_rol: data.id_rol,
      genero: data.genero,
      matricula: data.matricula,
    });

    return usuariosResult;
  }
}
