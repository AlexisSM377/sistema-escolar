import DialogForm from "@/components/dialog-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateEstudianteForm from "./create-form";
import { getEstudiantes, getGrupos } from "../../actions";

export default async function CreateEstudiante() {

    const { grupos } = await getGrupos()
    const { estudiantes } = await getEstudiantes()
    return (
        <DialogForm
            id="create-trigger"
            title="Asignación de estudiantes a grupos"
            description="Completa los datos para asignar un estudiante a un grupo en el sistema."
            Trigger={
                <Button size="sm" className="h-9 text-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Asiganr Estudiante a Grupo
                </Button>
            }
            form={<CreateEstudianteForm
                grupos={grupos || []}
                estudiantes={estudiantes || []}
            />}
        />
    )
}