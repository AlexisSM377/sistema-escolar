"use server";

import { createSupabaseAdmin, getCurrentUser } from "@/lib/supabase/server";

// Función para obtener los grupos asignados al profesor autenticado
export async function getMisGrupos() {
  // Obtener el usuario actual
  const { user, error: userError } = await getCurrentUser();

  if (userError || !user) {
    return { error: userError || { message: "No se pudo obtener el usuario" } };
  }

  // Obtener los grupos asignados al profesor
  const supabase = await createSupabaseAdmin();

  const { data: grupos_profesor, error } = await supabase
    .from("grupo_profesores")
    .select(
      `
      *, 
      grupos (
        id, 
        clave_grupo, 
        materias (id, nombre), 
        cuatrimestres (id, nombre)
      )
    `
    )
    .eq("id_usuario", user.id)
    .order("id", { ascending: true });

  if (error) {
    return { error };
  }

  return { grupos_profesor };
}

export async function getAlumnosInscritos(id: string) {
  try {
    const supabase = await createSupabaseAdmin();

    // Primero obtenemos el id_grupo desde grupo_profesores
    const { data: grupoProfesor, error: grupoError } = await supabase
      .from("grupo_profesores")
      .select("id_grupo")
      .eq("id", id)
      .single();

    if (grupoError || !grupoProfesor) {
      return {
        error: grupoError || {
          message: "No se encontró el grupo del profesor",
        },
      };
    }

    // Luego consultamos las inscripciones con ese id_grupo
    const { data: alumnos, error } = await supabase
      .from("inscripciones")
      .select(
        `
        *,
        grupos (id, clave_grupo, materias (id, nombre), cuatrimestres (id, nombre)),
        usuarios!inscripciones_id_estudiante_fkey (
          id,
          nombre,
          matricula
        )
      `
      )
      .eq("id_grupo", grupoProfesor.id_grupo)
      .order("fecha_inscripcion", { ascending: false });

    if (error) {
      return { error };
    }

    return { alumnos };
  } catch (error) {
    return {
      error: {
        message:
          "Error al obtener alumnos inscritos: " + (error as Error).message,
      },
    };
  }
}
