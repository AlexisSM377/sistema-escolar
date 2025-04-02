import { notFound } from "next/navigation";
import MateriaFormEdit from "../../components/edit/edit-materia";
import { createSupabaseAdmin } from "@/lib/supabase/server";

interface EditMateriaPageProps {
    params: {
        id: string;
    };
}

export default async function EditMateriaPage({ params }: EditMateriaPageProps) {
    const supabase = await createSupabaseAdmin();
    const { data: materia, error } = await supabase
        .from("materias")
        .select("*")
        .eq("id", params.id)
        .single();
    if (error || !materia) {
        notFound();
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Editar Materia</h1>
                    <p className="opacity-80 mt-2">
                        Modificar información de la materia {materia.nombre}
                    </p>
                </div>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <MateriaFormEdit materia={materia} />
            </div>
        </div>
    )
}