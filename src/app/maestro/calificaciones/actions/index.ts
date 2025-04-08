"use server";

import { createSupabaseAdmin, getCurrentUser } from "@/lib/supabase/server";

export async function getCalificacionesByGrupo(id: string) {
  try {
    const supabase = await createSupabaseAdmin();

    // Verificar que el usuario sea profesor y tenga acceso al grupo
    const { user, error: userError } = await getCurrentUser();
    if (userError || !user) {
      return { error: userError || { message: "Usuario no autenticado" } };
    }

    // Verificar que el grupo pertenezca al profesor
    const { data: grupoProfesor, error: grupoError } = await supabase
      .from("grupo_profesores")
      .select("id")
      .eq("id_usuario", user.id)
      .eq("id_grupo", id)
      .maybeSingle();

    if (grupoError || !grupoProfesor) {
      return {
        error: {
          message: "No tienes permiso para ver calificaciones de este grupo",
        },
      };
    }

    // IMPORTANTE: Corrección en la consulta para evitar error de columnas
    const { data: inscripciones, error } = await supabase
      .from("inscripciones")
      .select(
        `
        id,
        id_estudiante,
        id_grupo,
        fecha_inscripcion,
        estado,
        usuarios:id_estudiante (
          id,
          nombre,
          matricula
        ),
        calificaciones (
          id,
          primer_parcial,
          segundo_parcial,
          tercer_parcial,
          calificacion_final
        )
      `
      )
      .eq("id_grupo", id)
      .order("usuarios(nombre)", { ascending: true });

    if (error) {
      return { error };
    }

    return { inscripciones };
  } catch (error) {
    return {
      error: {
        message: `Error al obtener calificaciones: ${(error as Error).message}`,
      },
    };
  }
}

export async function actualizarCalificaciones(data: {
  id_inscripcion: string;
  primer_parcial: number | null;
  segundo_parcial: number | null;
  tercer_parcial: number | null;
  calificacion_final: number | null;
}) {
  try {
    // Verificar que el usuario sea profesor
    const { user, error: userError } = await getCurrentUser();
    if (userError || !user) {
      return { error: { message: "Usuario no autenticado" } };
    }

    const supabase = await createSupabaseAdmin();

    // Verificar si ya existe una calificación para esta inscripción
    const { data: existingCalificacion, error: checkError } = await supabase
      .from("calificaciones")
      .select("id")
      .eq("id_inscripcion", data.id_inscripcion)
      .maybeSingle();

    if (checkError) {
      return {
        error: { message: "Error al verificar calificaciones existentes" },
      };
    }

    // Si ya existe una calificación, actualízala
    if (existingCalificacion) {
      const { data: updatedCalificacion, error: updateError } = await supabase
        .from("calificaciones")
        .update({
          primer_parcial: data.primer_parcial,
          segundo_parcial: data.segundo_parcial,
          tercer_parcial: data.tercer_parcial,
          calificacion_final: data.calificacion_final,
          id_usuario: user.id, // Registrar el ID del maestro
        })
        .eq("id", existingCalificacion.id)
        .select()
        .single();

      if (updateError) {
        return { error: { message: "Error al actualizar la calificación" } };
      }

      return { calificacion: updatedCalificacion };
    }

    // Crear nueva calificación si no existe
    const { data: newCalificacion, error: insertError } = await supabase
      .from("calificaciones")
      .insert({
        id_inscripcion: data.id_inscripcion,
        primer_parcial: data.primer_parcial,
        segundo_parcial: data.segundo_parcial,
        tercer_parcial: data.tercer_parcial,
        calificacion_final: data.calificacion_final,
        id_usuario: user.id, // Registrar el ID del maestro
      })
      .select()
      .single();

    if (insertError) {
      return { error: { message: "Error al crear la calificación" } };
    }

    return { calificacion: newCalificacion };
  } catch (error) {
    return {
      error: {
        message: `Error al procesar la calificación: ${
          (error as Error).message
        }`,
      },
    };
  }
}

/**
 * Obtiene los grupos del profesor actual
 */
export async function getGruposProfesor() {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError || !user) {
      return { error: userError || { message: "Usuario no autenticado" } };
    }

    const supabase = await createSupabaseAdmin();

    const { data: grupos, error } = await supabase
      .from("grupo_profesores")
      .select(
        `
        id,
        id_grupo,
        grupos (
          id,
          clave_grupo,
          materias (id, nombre),
          cuatrimestres (id, nombre)
        )
      `
      )
      .eq("id_usuario", user.id)
      .order("grupos(clave_grupo)", { ascending: true });

    if (error) {
      return { error };
    }

    return { grupos };
  } catch (error) {
    return {
      error: {
        message: `Error al obtener grupos: ${(error as Error).message}`,
      },
    };
  }
}

export async function getCalificaciones() {
  try {
    // Obtener el usuario actual (profesor autenticado)
    const { user, error: userError } = await getCurrentUser();

    if (userError || !user) {
      return {
        error: userError || {
          message: "No se pudo obtener el usuario autenticado",
        },
      };
    }

    const supabase = await createSupabaseAdmin();

    // Obtener las calificaciones realizadas por el profesor autenticado
    const { data: calificaciones, error } = await supabase
      .from("calificaciones")
      .select(
        `
        id,
        id_inscripcion,
        primer_parcial,
        segundo_parcial,
        tercer_parcial,
        calificacion_final,
        inscripciones (
          id,
          id_estudiante,
          id_grupo,
          grupos (
            id,
            clave_grupo,
            materias (id, nombre),
            cuatrimestres (id, nombre)
          ),
          usuarios (
            id,
            nombre,
            matricula
          )
        )
      `
      )
      .eq("id_usuario", user.id); // Filtrar por el usuario que calificó

    if (error) {
      return { error };
    }

    return { grupo_alumno: calificaciones };
  } catch (error) {
    return {
      error: {
        message: `Error al obtener las calificaciones: ${
          (error as Error).message
        }`,
      },
    };
  }
}

export async function editarCalificacion(
  id: string,
  updates: Partial<{
    primer_parcial: number | null;
    segundo_parcial: number | null;
    tercer_parcial: number | null;
    calificacion_final: number | null;
  }>
) {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError || !user) {
      return { error: { message: "Usuario no autenticado" } };
    }

    const supabase = await createSupabaseAdmin();

    const { data: updatedCalificacion, error: updateError } = await supabase
      .from("calificaciones")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return { error: { message: "Error al actualizar la calificación" } };
    }

    return { calificacion: updatedCalificacion };
  } catch (error) {
    return {
      error: {
        message: `Error al editar la calificación: ${(error as Error).message}`,
      },
    };
  }
}
