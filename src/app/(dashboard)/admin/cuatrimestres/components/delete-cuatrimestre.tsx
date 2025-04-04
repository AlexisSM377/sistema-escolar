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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCuatrimestre } from "../actions";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface DeleteCuatrimestreProps {
    cuatrimestreId: string;
    cuatrimestreNombre: string;
}
export function DeleteCuatrimestre({ cuatrimestreId, cuatrimestreNombre }: DeleteCuatrimestreProps) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const result = await deleteCuatrimestre(cuatrimestreId)
            if (result.error) {
                toast({
                    title: "Error",
                    description: `No se pudo eliminar el cuatrimestre ${cuatrimestreNombre}. ${result.error}`,
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Cuatrimestre eliminado",
                    description: `El cuatrimestre ${cuatrimestreNombre} ha sido eliminado correctamente.`,
                    variant: "destructive",
                })
                // Refrescar la página para mostrar la lista actualizada
                router.refresh()
            }

        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al eliminar el cuatrimestre." + error,
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
                    <AlertDialogTitle>Eliminar cuatrimestre</AlertDialogTitle>
                    <AlertDialogDescription>
                        ¿Estás seguro de que deseas eliminar el cuatrimestre {cuatrimestreNombre}? Esta acción no se puede deshacer.
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