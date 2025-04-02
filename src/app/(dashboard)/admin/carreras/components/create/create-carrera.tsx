import DialogForm from "@/components/dialog-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CarreraForm from "./create-form";

export default function CreateCarrera() {
    return (
        <DialogForm
            id="create-trigger"
            title="Agregar Carrera"
            description="Completa los datos para crear una nueva carrera en el sistema."
            Trigger={
                <Button size="sm" className="h-9 text-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Agregar Carrera
                </Button>
            }
            form={<CarreraForm />}
        />
    )
}