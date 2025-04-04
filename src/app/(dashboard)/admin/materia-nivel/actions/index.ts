"use server";

import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createMateriaNivel(data: {
  id_plan_estudio: string;
  id_materia: string;
  semestre: number;
}) {
  const supabase = await createSupabaseAdmin();

  const { data: materiaNivel, error } = await supabase
    .from("materias_nivel")
    .insert([data]);

  if (error) {
    return { error };
  }

  return { materiaNivel };
}

export async function getMateriaNivel() {
  const supabase = await createSupabaseAdmin();

  const { data: materiasNivel, error } = await supabase.from("materias_nivel")
    .select(`
        *,
        materias (id, nombre),
        planes_estudio (id, nombre)
      `);

  if (error) {
    return { error };
  }

  return { materiasNivel };
}

export async function getMateriaNivelById(id: string) {
  const supabase = await createSupabaseAdmin();

  const { data: materiaNivel, error } = await supabase
    .from("materias_nivel")
    .select(
      `
        *,
        materias (id, nombre),
        planes_estudio (id, nombre)
      `
    )
    .eq("id", id)
    .single();

  if (error) {
    return { error };
  }

  return { materiaNivel };
}

export async function updateMateriaNivel(
  id: string,
  data: {
    id_plan_estudio: string;
    id_materia: string;
    semestre: number;
  }
) {
  const supabase = await createSupabaseAdmin();

  const { data: materiaNivel, error } = await supabase
    .from("materias_nivel")
    .update(data)
    .eq("id", id);

  if (error) {
    return { error };
  }

  return { materiaNivel };
}

export async function deleteMateriaNivel(id: string) {
  const supabase = await createSupabaseAdmin();

  const { data: materiaNivel, error } = await supabase
    .from("materias_nivel")
    .delete()
    .eq("id", id);

  if (error) {
    return { error };
  }

  return { materiaNivel };
}

export async function getMateriasNivel() {
  const supabase = await createSupabaseAdmin();

  const { data: materias, error } = await supabase
    .from("materias")
    .select("*")
    .eq("activa", true);

  if (error) {
    return { error };
  }

  return { materias };
}

export async function getPlanesEstudioNivel() {
  const supabase = await createSupabaseAdmin();

  const { data: planes, error } = await supabase
    .from("planes_estudio")
    .select("*")
    .eq("vigente", true);

  if (error) {
    return { error };
  }

  return { planes };
}
