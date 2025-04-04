import DialogForm from "@/components/dialog-form";
import MateriaNivelForm from "./create-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { getMateriasNivel, getPlanesEstudioNivel } from "../../actions";

export default async function CreateMateriaNivel() {

    const { materias } = await getMateriasNivel();
    const { planes } = await getPlanesEstudioNivel();
    return (
        <DialogForm
            id="create-trigger"
            title="Agregar Materia Nivel"
            description="Completa los datos para crear una nueva materia nivel en el sistema."
            Trigger={
                <Button size="sm" className="h-9 text-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Agregar Materia Nivel
                </Button>
            }
            form={
                <MateriaNivelForm
                    materias={materias || []}
                    planesEstudios={planes || []}
                />
            }
        />
    )
}