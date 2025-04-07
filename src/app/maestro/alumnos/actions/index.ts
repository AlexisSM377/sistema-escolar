"use server";
import { createSupabaseAdmin, getCurrentUser } from "@/lib/supabase/server";

export async function getAlumnosInscritos() {
  // Obtener el usuario actual (profesor logueado)
  const { user, error: userError } = await getCurrentUser();

  if (userError || !user) {
    return { error: userError || { message: "No se pudo obtener el usuario" } };
  }

  const supabase = await createSupabaseAdmin();

  // Primero, obtener los IDs de los grupos donde el profesor imparte clases
  const { data: gruposProfesor, error: gruposError } = await supabase
    .from("grupo_profesores")
    .select("id_grupo")
    .eq("id_usuario", user.id);

  if (gruposError) {
    return { error: gruposError };
  }

  // Extraer solo los IDs de grupo para usarlos en el filtro
  const gruposIds = gruposProfesor.map((grupo) => grupo.id_grupo);

  if (gruposIds.length === 0) {
    // Si el profesor no tiene grupos asignados, devolver una lista vacía
    return { grupo_alumno: [] };
  }

  // Ahora consultar las inscripciones filtrando por los grupos del profesor
  const { data: grupo_alumno, error } = await supabase
    .from("inscripciones")
    .select(
      `*, 
        grupos (id, clave_grupo, materias (id, nombre), cuatrimestres (id, nombre)), 
        usuarios (id, nombre, matricula)`
    )
    .in("id_grupo", gruposIds) // Filtramos solo los alumnos de los grupos del profesor
    .order("id", { ascending: true });

  if (error) {
    return { error };
  }

  return { grupo_alumno };
}
