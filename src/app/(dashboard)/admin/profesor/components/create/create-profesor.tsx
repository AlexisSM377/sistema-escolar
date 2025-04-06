import DialogForm from "@/components/dialog-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateProfesorGrupoForm from "./create-form";
import { getGrupos, getProfesores } from "../../actions";

export default async function CreateProfesor() {

    const { grupos } = await getGrupos()
    const { profesores } = await getProfesores()
    return (
        <DialogForm
            id="create-trigger"
            title="Asignación de profesores a grupos"
            description="Completa los datos para asignar un profesor a un grupo en el sistema."
            Trigger={
                <Button size="sm" className="h-9 text-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Asiganr Profesor a Grupo
                </Button>
            }
            form={<CreateProfesorGrupoForm
                grupos={grupos || []}
                profesores={profesores || []}
            />}
        />
    )
}