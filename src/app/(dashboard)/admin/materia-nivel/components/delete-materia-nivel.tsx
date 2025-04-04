'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteMateriaNivel } from "../actions";
import { toast } from "@/hooks/use-toast";

interface DeleteMateriaNivelProps {
    mteriaNivelId: string;
    materiaNivelNombre: string;
}

export function DeleteMateriaNivel(
    { mteriaNivelId, materiaNivelNombre }: DeleteMateriaNivelProps
) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const result = await deleteMateriaNivel(mteriaNivelId);
            if (result.error) {
                toast({
                    title: "Error",
                    description: `No se pudo eliminar el plan "${materiaNivelNombre}". ${result.error.message}`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Plan eliminado",
                    description: `El plan "${materiaNivelNombre}" ha sido eliminado correctamente.`,
                    variant: "destructive",
                });
                // Refrescar la página para mostrar la lista actualizada
                router.refresh();
            }

        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al eliminar el plan de estudio." + error,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive text-sm">
                    Eliminar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción eliminará permanentemente el plan de estudio {materiaNivelNombre} y no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isLoading ? "Eliminando..." : "Eliminar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}