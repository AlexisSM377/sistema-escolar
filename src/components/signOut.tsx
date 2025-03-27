
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function SignOut() {

    const logout = async () => {
        const supabase = await createSupabaseServerClient();
        await supabase.auth.signOut();
        redirect("/login");
    }
    return (
        <button onClick={logout}>Cerrar sesión</button>
    )
}