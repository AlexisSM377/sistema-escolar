"use server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createAlumnoGrupo(data: {
  id_estudiante: string;
  id_grupo: string;
  fecha_inscripcion: string;
  estado: string;
}) {
  const supabase = await createSupabaseAdmin();

  const { data: alumno_grupo, error } = await supabase
    .from("inscripciones")
    .insert([data]);

  if (error) {
    return { error };
  }

  return { alumno_grupo };
}

export async function getGrupoAlumno() {
  const supabase = await createSupabaseAdmin();

  const { data: grupo_alumno, error } = await supabase
    .from("inscripciones")
    .select(
      `*, grupos (id, clave_grupo, materias (id, nombre), cuatrimestres (id, nombre)), usuarios (id, nombre)`
    )
    .order("id", { ascending: true });

  if (error) {
    return { error };
  }

  return { grupo_alumno };
}

export async function getGrupoAlumnoById(id: string) {
  const supabase = await createSupabaseAdmin();

  const { data: grupo_alumno, error } = await supabase
    .from("inscripciones")
    .select(
      `*, grupos (id, clave_grupo, materias (id, nombre), cuatrimestres (id, nombre)), usuarios (id, nombre)`
    )
    .eq("id", id)
    .single();

  if (error) {
    return { error };
  }

  return { grupo_alumno };
}

export async function updateGrupoAlumno(
  id: string,
  data: {
    id_estudiante?: string;
    id_grupo?: string;
    fecha_inscripcion?: string;
    estado?: string;
  }
) {
  const supabase = await createSupabaseAdmin();

  const { data: grupo_alumno, error } = await supabase
    .from("inscripciones")
    .update(data)
    .eq("id", id);

  if (error) {
    return { error };
  }

  return { grupo_alumno };
}

export async function deleteGrupoAlumno(id: string) {
  const supabase = await createSupabaseAdmin();

  const { data, error } = await supabase
    .from("inscripciones")
    .delete()
    .eq("id", id);

  if (error) {
    return { error };
  }

  return { data };
}

export async function getGrupos() {
  const supabase = await createSupabaseAdmin();

  const { data: grupos, error } = await supabase
    .from("grupos")
    .select(`*, materias (id, nombre), cuatrimestres (id, nombre)`)
    .order("id", { ascending: true });

  if (error) {
    return { error };
  }

  return { grupos };
}

export async function getEstudiantes() {
  const supabase = await createSupabaseAdmin();

  const { data: estudiantes, error } = await supabase
    .from("usuarios")
    .select("*, roles!inner(nombre)") // JOIN implícito con filtro
    .eq("roles.nombre", "Estudiante") // Filtra solo estudiantes
    .order("nombre", { ascending: true });

  if (error) {
    return { error };
  }

  return { estudiantes };
}
