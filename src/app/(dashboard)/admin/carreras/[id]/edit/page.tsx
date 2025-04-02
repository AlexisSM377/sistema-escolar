import { createSupabaseAdmin } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditCarreraForm from "../../components/edit-carrera";


interface EditCarreraPageProps {
    params: {
        id: string;
    };
}

export default async function EditCarreraPage({ params }: EditCarreraPageProps) {
    const supabase = await createSupabaseAdmin();
    const { data: carrera, error } = await supabase
        .from("carreras")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error || !carrera) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Editar Carrera</h1>
                <p className="text-gray-500 mt-2">Modificar información de la carrera {carrera.nombre}</p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <EditCarreraForm carrera={carrera} />
            </div>
        </div>
    );
}