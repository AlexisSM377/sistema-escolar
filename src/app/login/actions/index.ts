"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
  role?: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return result;
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
