import DialogForm from "@/components/dialog-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CuatrimestreForm from "./create-form";

export default function CreateCuatrimestre() {
    return (
        <DialogForm
            id="create-trigger"
            title="Agregar Cuatrimestre"
            description="Completa los datos para crear un nuevo cuatrimestre en el sistema."
            Trigger={
                <Button size="sm" className="h-9 text-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Agregar Cuatrimestre
                </Button>
            }
            form={<CuatrimestreForm />}
        />
    )
}