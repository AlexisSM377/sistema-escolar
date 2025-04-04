import DialogForm from "@/components/dialog-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import GruposForm from "./create-form";
import { getCuatrimestres, getMaterias } from "../../actions";

export default async function CreateGrupo() {
    const { materias } = await getMaterias();
    const { cuatrimestres } = await getCuatrimestres();
    return (
        <DialogForm
            id="create-trigger"
            title="Agregar Grupo"
            description="Completa los datos para crear un nuevo grupo en el sistema."
            Trigger={
                <Button size="sm" className="h-9 text-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Agregar Grupo
                </Button>
            }
            form={
                <GruposForm
                    materias={materias || []}
                    cuatrimestres={cuatrimestres || []}
                />
            }
        />
    )
}