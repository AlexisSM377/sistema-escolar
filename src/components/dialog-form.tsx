import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";

export default function DialogForm({
    Trigger,
    id,
    title,
    description,
    form,
}: {
    title: string;
    description: string;
    Trigger: ReactNode;
    id: string;
    form: ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild id={id}>
                {Trigger}
            </DialogTrigger>
            <DialogContent className="max-w-full sm:max-w-lg mx-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[80vh] px-2">
                    {form}
                </div>
            </DialogContent>
        </Dialog>
    )
}