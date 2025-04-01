import { Button } from "@/components/ui/button";

import { createSupabaseAdmin } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CarreraForm from "../../components/edit-carrera";
import Link from "next/link";


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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Editar Carrera</h1>
                    <p className="opacity-80 mt-2">Modificar información de la carrera {carrera.nombre}</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/admin/carreras">Volver</Link>
                </Button>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <CarreraForm initialData={carrera} isEditing={true} />
            </div>
        </div>
    );
}