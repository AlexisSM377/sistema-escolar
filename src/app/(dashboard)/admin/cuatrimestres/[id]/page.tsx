import { createSupabaseAdmin } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CuatrimestreFormEdit from "../components/edit/edit-cuatrimestre";

interface EditCuatrimestrePageProps {
    params: {
        id: string;
    };
}
export default async function EditCuatrimestrePage({ params }: EditCuatrimestrePageProps) {

    const supabase = await createSupabaseAdmin()

    const { data: cuatrimestre, error } = await supabase
        .from("cuatrimestres")
        .select("*")
        .eq("id", params.id)
        .single()
    if (error || !cuatrimestre) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Editar Cuatrimestre
                </h1>
                <p className="mt-2">Modificar información del cuatrimestre {cuatrimestre.nombre}</p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <CuatrimestreFormEdit cuatrimestre={cuatrimestre} />
            </div>
        </div>
    )
}