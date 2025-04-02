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
import { deleteMateria } from "../actions";
import { toast } from "@/hooks/use-toast";

interface DeleteMateriaProps {
    materiaId: string;
    materiaNombre: string;
}

export function DeleteMateria({ materiaId, materiaNombre }: DeleteMateriaProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const result = await deleteMateria(materiaId)
            if (result.error) {
                toast({
                    title: "Error",
                    description: `No se pudo eliminar la materia ${materiaNombre}. ${result.error}`,
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Materia eliminada",
                    description: `La materia ${materiaNombre} ha sido eliminada correctamente.`,
                    variant: "destructive",
                })
                // Refrescar la página para mostrar la lista actualizada
                router.refresh()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al eliminar la materia." + error,
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
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
                        Esta acción eliminará permanentemente la materia {materiaNombre}.
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