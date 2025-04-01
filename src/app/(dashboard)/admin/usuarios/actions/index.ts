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
    return JSON.stringify(createResult);
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

export async function getUsuarios() {
  try {
    const supabase = await createSupabaseAdmin();

    // Obtener usuarios de la tabla usuarios
    const { data: usuarios, error } = await supabase
      .from("usuarios")
      .select("*, roles(nombre)")
      .order("nombre");

    if (error) throw error;

    // Obtener todos los usuarios de Auth para obtener sus emails
    const { data: authUsers, error: authError } =
      await supabase.auth.admin.listUsers();

    if (authError) throw authError;

    // Combinar la información de ambas fuentes
    const usuariosCompletos = usuarios.map((usuario) => {
      const authUser = authUsers.users.find((user) => user.id === usuario.id);
      return {
        ...usuario,
        email: authUser?.email || "",
      };
    });

    return { usuarios: usuariosCompletos };
  } catch (error) {
    return { error };
  }
}

// Obtener un usuario por su ID
export async function getUsuarioById(id: string) {
  try {
    const supabase = await createSupabaseAdmin();

    // Obtener usuario de la tabla usuarios
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("*, roles(nombre)")
      .eq("id", id)
      .single();

    if (error) throw error;

    // Obtener información del usuario desde Auth
    const { data: authUser, error: authError } =
      await supabase.auth.admin.getUserById(id);

    if (authError) throw authError;

    // Combinar la información
    const usuarioCompleto = {
      ...usuario,
      email: authUser.user?.email || "",
    };

    return { usuario: usuarioCompleto };
  } catch (error) {
    return { error };
  }
}

// Actualizar un usuario existente
export async function updateUsuario(
  id: string,
  data: {
    email?: string;
    nombre?: string;
    id_rol?: string; // Esto es un UUID
    genero?: string;
    matricula?: string;
  }
) {
  try {
    const supabase = await createSupabaseAdmin();

    // Actualizar datos en la tabla usuarios
    const { error: errorUsuario } = await supabase
      .from("usuarios")
      .update({
        nombre: data.nombre,
        id_rol: data.id_rol, // Asegúrate de que esto es un UUID válido
        genero: data.genero,
        matricula: data.matricula,
      })
      .eq("id", id);

    if (errorUsuario) {
      throw errorUsuario;
    }

    // Si se incluye email, actualizar también en auth
    if (data.email) {
      const { error: errorAuth } = await supabase.auth.admin.updateUserById(
        id,
        { email: data.email, email_confirm: true }
      );

      if (errorAuth) {
        throw errorAuth;
      }
    }

    // Si hay cambio de rol, actualizar los metadatos del usuario
    if (data.id_rol) {
      // Obtener el nombre del rol para los metadatos
      const { data: rolData, error: rolError } = await supabase
        .from("roles")
        .select("nombre")
        .eq("id", data.id_rol)
        .single();

      if (rolError) {
        throw rolError;
      }

      const { error: errorMetadata } = await supabase.auth.admin.updateUserById(
        id,
        {
          user_metadata: {
            id_rol: data.id_rol,
            rol_nombre: rolData.nombre,
          },
        }
      );

      if (errorMetadata) {
        throw errorMetadata;
      }
    }

    return { success: true };
  } catch (error) {
    return { error };
  }
}

// Eliminar un usuario
export async function deleteUsuario(id: string) {
  try {
    const supabase = await createSupabaseAdmin();

    // Eliminar al usuario de la autenticación
    // Esto debería eliminar automáticamente los registros relacionados si tienes configuradas las restricciones de clave foránea
    const { error } = await supabase.auth.admin.deleteUser(id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    return { error };
  }
}
