"use server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createCuatrimestre(data: {
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  activo: boolean;
  cerrado: boolean;
}) {
  const supabase = await createSupabaseAdmin();

  const { data: cuatrimestre, error } = await supabase
    .from("cuatrimestres")
    .insert(data);

  if (error) {
    return { error };
  }

  return { cuatrimestre };
}

export async function getCuatrimestres() {
  const supabase = await createSupabaseAdmin();

  const { data: cuatrimestres, error } = await supabase
    .from("cuatrimestres")
    .select("*");

  if (error) {
    return { error };
  }

  return { cuatrimestres };
}

export async function updateCuatrimestre(
  id: string,
  data: {
    nombre?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    activo?: boolean;
    cerrado?: boolean;
  }
) {
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase
    .from("cuatrimestres")
    .update(data)
    .eq("id", id);

  if (error) {
    return { error };
  }

  return { success: true };
}

export async function deleteCuatrimestre(id: string) {
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase.from("cuatrimestres").delete().eq("id", id);

  if (error) {
    return { error };
  }

  return { success: true };
}
