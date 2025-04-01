import { Button } from "@/components/ui/button";
import DialogForm from "./dialog-form";
import { PlusIcon } from "lucide-react";
import UsuarioForm from "./createForm";

export default function CreateUser() {
    return (
        <DialogForm
            id="create-trigger"
            title="Agregar Usuario"
            Trigger={
                <Button size="sm" className="h-9 text-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Agregar Usuario
                </Button>
            }
            form={<UsuarioForm />}
        />
    )
}