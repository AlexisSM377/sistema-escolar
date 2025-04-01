import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";

export default function DialogForm({
    Trigger,
    id,
    title,
    form,
}: {
    title: string;
    Trigger: ReactNode;
    id: string;
    form: ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild id={id}>
                {Trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>Completa los datos para crear un nuevo usuario en el sistema.</DialogDescription>
                </DialogHeader>
                {form}
            </DialogContent>
        </Dialog>
    )
}