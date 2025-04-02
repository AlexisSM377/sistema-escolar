import DialogForm from "@/components/dialog-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import MateriaForm from "./create-form";

export default function CreateMateria() {
    return (
        <DialogForm
            id="create-trigger"
            title="Agregar Materia"
            description="Completa los datos para crear una nueva materia en el sistema."
            Trigger={
                <Button size="sm" className="h-9 text-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Agregar Materia
                </Button>
            }
            form={<MateriaForm />}
        />
    )
}