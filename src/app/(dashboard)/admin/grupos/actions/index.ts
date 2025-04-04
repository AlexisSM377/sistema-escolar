"use server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createGrupos(data: {
  id_materia: string;
  id_cuatrimestre: string;
  clave_grupo: string;
  cupo_maximo: number;
  activo: boolean;
}) {
  const supabase = await createSupabaseAdmin();

  const { data: grupos, error } = await supabase.from("grupos").insert(data);

  if (error) {
    return { error };
  }

  return { grupos };
}

export async function getGrupos() {
  const supabase = await createSupabaseAdmin();

  const { data: grupos, error } = await supabase
    .from("grupos")
    .select(`*, materias (id, nombre), cuatrimestres (id, nombre)`);

  if (error) {
    return { error };
  }

  return { grupos };
}

export async function getGruposById(id: string) {
  const supabase = await createSupabaseAdmin();

  const { data: grupos, error } = await supabase
    .from("grupos")
    .select(`*, materias (id, nombre), cuatrimestres (id, nombre)`)
    .eq("id", id)
    .single();

  if (error) {
    return { error };
  }

  return { grupos };
}

export async function updateGrupos(
  id: string,
  data: {
    id_materia: string;
    id_cuatrimestre: string;
    clave_grupo: string;
    cupo_maximo: number;
    activo: boolean;
  }
) {
  const supabase = await createSupabaseAdmin();

  const { data: grupos, error } = await supabase
    .from("grupos")
    .update(data)
    .eq("id", id);

  if (error) {
    return { error };
  }

  return { grupos };
}

export async function deleteGrupo(id: string) {
  const supabase = await createSupabaseAdmin();

  const { data: grupos, error } = await supabase
    .from("grupos")
    .delete()
    .eq("id", id);

  if (error) {
    return { error };
  }

  return { grupos };
}

export async function getMaterias() {
  const supabase = await createSupabaseAdmin();

  const { data: materias, error } = await supabase.from("materias").select(`*`);

  if (error) {
    return { error };
  }

  return { materias };
}

export async function getCuatrimestres() {
  const supabase = await createSupabaseAdmin();

  const { data: cuatrimestres, error } = await supabase
    .from("cuatrimestres")
    .select(`*`);

  if (error) {
    return { error };
  }

  return { cuatrimestres };
}
