"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getGruposProfesor } from "../actions";
import { toast } from "@/hooks/use-toast";
import ListOfCalificaciones from "./list-calificaiones";

type Grupo = {
    id: string;
    id_grupo: string;
    grupos: {
        id: string;
        clave_grupo: string;
        materias: { id: string; nombre: string };
        cuatrimestres: { id: string; nombre: string };
    };
};

export default function SeleccionarGrupo() {
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGrupo, setSelectedGrupo] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchGrupos = async () => {
            try {
                const { grupos, error } = await getGruposProfesor();

                if (error) {
                    toast({
                        title: "Error",
                        description: error.message || "No se pudieron cargar los grupos",
                        variant: "destructive",
                    });
                    return;
                }

                setGrupos(grupos || []);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar los datos" + (error as Error).message,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGrupos();
    }, []);

    const handleSeleccion = () => {
        if (!selectedGrupo) {
            toast({
                title: "Selección necesaria",
                description: "Por favor selecciona un grupo",
                variant: "destructive",
            });
            return;
        }

        // Navegar a la página de calificaciones del grupo
        router.push(`/maestro/calificaciones/grupo/${selectedGrupo}`);
    };

    if (loading) {
        return <div className="flex justify-center p-6">Cargando grupos...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Selecciona un grupo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                    <div className="flex-1">
                        <Select
                            value={selectedGrupo}
                            onValueChange={setSelectedGrupo}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona un grupo" />
                            </SelectTrigger>
                            <SelectContent>
                                {grupos.length > 0 ? (
                                    grupos.map((grupo) => (
                                        <SelectItem key={grupo.id_grupo} value={grupo.id_grupo}>
                                            {grupo.grupos.clave_grupo} - {grupo.grupos.materias.nombre} ({grupo.grupos.cuatrimestres.nombre})
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="no-groups" disabled>
                                        No tienes grupos asignados
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={handleSeleccion}
                        disabled={!selectedGrupo || selectedGrupo === "no-groups"}
                    >
                        Ver Calificaciones
                    </Button>
                </div>
                <ListOfCalificaciones />
            </CardContent>
        </Card>
    );
}