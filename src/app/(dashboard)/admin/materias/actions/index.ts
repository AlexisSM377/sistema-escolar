"use server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createMateria(data: {
  nombre: string;
  codigo: string;
  activa: boolean;
}) {
  const supabase = await createSupabaseAdmin();

  const { data: materia, error } = await supabase
    .from("materias")
    .insert([data]);

  if (error) {
    return { error };
  }

  return { materia };
}

export async function getMaterias() {
  const supabase = await createSupabaseAdmin();

  const { data: materias, error } = await supabase.from("materias").select("*");

  if (error) {
    return { error };
  }

  return { materias };
}

export async function updateMateria(
  id: string,
  data: {
    nombre?: string;
    codigo?: string;
    activa?: boolean;
  }
) {
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase.from("materias").update(data).eq("id", id);

  if (error) {
    return { error };
  }

  return { success: true };
}

export async function deleteMateria(id: string) {
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase.from("materias").delete().eq("id", id);

  if (error) {
    return { error };
  }

  return { success: true };
}
