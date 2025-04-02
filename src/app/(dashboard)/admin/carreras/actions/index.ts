"use server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createCarrera(data: {
  nombre: string;
  codigo: string;
  duracion_cuatrimestres: string;
  activa: boolean;
}) {
  const supabase = await createSupabaseAdmin();

  const { data: carrera, error } = await supabase
    .from("carreras")
    .insert([data]);

  if (error) {
    return { error };
  }

  return { carrera };
}

export async function getCarreras() {
  const supabase = await createSupabaseAdmin();

  const { data: carreras, error } = await supabase.from("carreras").select("*");

  if (error) {
    return { error };
  }

  return { carreras };
}

export async function updateCarrera(
  id: string,
  data: {
    nombre?: string;
    codigo?: string;
    duracion_cuatrimestre?: string;
    activa?: boolean;
  }
) {
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase.from("carreras").update(data).eq("id", id);

  if (error) {
    return { error };
  }

  return { success: true };
}

export async function deleteCarrera(id: string) {
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase.from("carreras").delete().eq("id", id);

  if (error) {
    return { error };
  }

  return { success: true };
}
