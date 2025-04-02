"use server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createPlanEstudio(data: {
  id_carrera: string;
  nombre: string;
  anio_implementacion: number;
  vigente: boolean;
}) {
  const supabase = await createSupabaseAdmin();

  const { data: plan, error } = await supabase
    .from("planes_estudio")
    .insert([data]);

  if (error) {
    return { error };
  }

  return { plan };
}

export async function getPlanesEstudio() {
  const supabase = await createSupabaseAdmin();

  const { data: planes, error } = await supabase.from("planes_estudio").select(`
        *,
        carrera:id_carrera (
          id,
          nombre,
          codigo
        )
      `);

  if (error) {
    return { error };
  }

  return { planes };
}

export async function getPlanEstudioById(id: string) {
  const supabase = await createSupabaseAdmin();

  const { data: plan, error } = await supabase
    .from("planes_estudio")
    .select(
      `
        *,
        carrera:id_carrera (
          id,
          nombre,
          codigo
        )
      `
    )
    .eq("id", id)
    .single();

  if (error) {
    return { error };
  }

  return { plan };
}

export async function updatePlanEstudio(
  id: string,
  data: {
    id_carrera?: string;
    nombre?: string;
    anio_implementacion?: number;
    vigente?: boolean;
  }
) {
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase
    .from("planes_estudio")
    .update(data)
    .eq("id", id);

  if (error) {
    return { error };
  }

  return { success: true };
}

export async function deletePlanEstudio(id: string) {
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase.from("planes_estudio").delete().eq("id", id);

  if (error) {
    return { error };
  }

  return { success: true };
}

export async function getCarreras() {
  const supabase = await createSupabaseAdmin();

  const { data: carreras, error } = await supabase
    .from("carreras")
    .select("id, nombre, codigo")
    .eq("activa", true); // Solo carreras activas

  if (error) {
    return { error };
  }

  return { carreras };
}
