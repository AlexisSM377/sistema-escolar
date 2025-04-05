"use server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createGrupoProfesor(data: {
  id_grupo: string;
  id_usuario: string;
}) {
  const supabase = await createSupabaseAdmin();

  const { data: grupo_profesor, error } = await supabase
    .from("grupo_profesores")
    .insert([data]);

  if (error) {
    return { error };
  }

  return { grupo_profesor };
}

export async function getGrupoProfesor() {
  const supabase = await createSupabaseAdmin();

  const { data: grupo_profesor, error } = await supabase
    .from("grupo_profesores")
    .select(
      `*, grupos (id, clave_grupo, materias (id, nombre), cuatrimestres (id, nombre)), usuarios (id, nombre)`
    )
    .order("id", { ascending: true });

  if (error) {
    return { error };
  }

  return { grupo_profesor };
}

export async function getGrupoProfesorById(id: string) {
  const supabase = await createSupabaseAdmin();

  const { data: grupo_profesor, error } = await supabase
    .from("grupo_profesores")
    .select(
      `*, grupos (id, clave_grupo, materias (id, nombre), cuatrimestres (id, nombre)), usuarios (id, nombre)`
    )
    .eq("id", id)
    .single();

  if (error) {
    return { error };
  }

  return { grupo_profesor };
}

export async function updateGrupoProfesor(
  id: string,
  data: {
    id_grupo: string;
    id_usuario: string;
  }
) {
  const supabase = await createSupabaseAdmin();

  const { data: grupo_profesor, error } = await supabase
    .from("grupo_profesores")
    .update(data)
    .eq("id", id);

  if (error) {
    return { error };
  }

  return { grupo_profesor };
}

export async function deleteGrupoProfesor(id: string) {
  const supabase = await createSupabaseAdmin();

  const { data, error } = await supabase
    .from("grupo_profesores")
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

export async function getProfesores() {
  const supabase = await createSupabaseAdmin();

  const { data: profesores, error } = await supabase
    .from("usuarios")
    .select("*, roles!inner(nombre)") // JOIN implícito con filtro
    .eq("roles.nombre", "Profesor") // Filtra solo profesores
    .order("nombre", { ascending: true });

  if (error) {
    console.error("Error fetching profesores:", error);
    return { error };
  }

  return { profesores };
}
