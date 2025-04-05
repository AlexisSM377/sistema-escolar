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
import { deleteGrupoProfesor } from "../actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface DeleteProfesorGrupoProps {
    grupoId: string;
    grupoNombre: string;
}
export function DeleteProfesorGrupo(
    { grupoId, grupoNombre }: DeleteProfesorGrupoProps
) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const result = await deleteGrupoProfesor(grupoId);
            if (result.error) {
                toast({
                    title: "Error",
                    description: `No se pudo eliminar el grupo "${grupoNombre}". ${result.error.message}`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Grupo eliminado",
                    description: `El grupo "${grupoNombre}" ha sido eliminado correctamente.`,
                    variant: "destructive",
                });
                // Refrescar la página para mostrar la lista actualizada
                router.refresh();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al eliminar el grupo." + error,
                variant: "destructive",
            });
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
                        Esta acción no se puede deshacer. El grupo del profesor será eliminado.
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