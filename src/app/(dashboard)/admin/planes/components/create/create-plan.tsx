import DialogForm from "@/components/dialog-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreatePlanForm from "./create-form";
import { getCarreras } from "../../actions";

export default async function CreatePlan() {

    const { carreras } = await getCarreras();

    return (
        <DialogForm
            id="create-trigger"
            title="Agregar Plan de Estudio"
            description="Completa los datos para crear un nuevo plan de estudio en el sistema."
            Trigger={
                <Button size="sm" className="h-9 text-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Agregar Plan de Estudio
                </Button>
            }
            form={<CreatePlanForm carreras={carreras || []} />}
        />
    )
}