"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { getMisGrupos } from "../actions";

type GrupoProfesor = {
    id: string;
    id_usuario: string;
    id_grupo: string;
    grupos: {
        id: string;
        clave_grupo: string;
        materias: {
            id: string;
            nombre: string;
        };
        cuatrimestres: {
            id: string;
            nombre: string;
        };
    };
};

export default function MisGrupos() {
    const [grupos, setGrupos] = useState<GrupoProfesor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGrupos = async () => {
            try {
                const { grupos_profesor, error } = await getMisGrupos();

                if (error) {
                    toast({
                        title: "Error",
                        description: "No se pudieron cargar tus grupos",
                        variant: "destructive",
                    });
                    return;
                }

                setGrupos(grupos_profesor || []);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar los grupos" + error,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGrupos();
    }, []);

    if (loading) {
        return <div className="flex justify-center p-6">Cargando grupos...</div>;
    }

    return (
        <div className="overflow-hidden rounded-md border py-2">

            <Table>
                <TableCaption>Grupos asignados al profesor</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Grupo</TableHead>
                        <TableHead>Materia</TableHead>
                        <TableHead>Cuatrimestre</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {grupos.length > 0 ? (
                        grupos.map((grupo) => (
                            <TableRow key={grupo.id}>
                                <TableCell>{grupo.grupos?.id.substring(0, 8) || "No disponible"}</TableCell>
                                <TableCell>{grupo.grupos?.clave_grupo || "No disponible"}</TableCell>
                                <TableCell>{grupo.grupos?.materias?.nombre || "No disponible"}</TableCell>
                                <TableCell>{grupo.grupos?.cuatrimestres?.nombre || "No disponible"}</TableCell>
                                <TableCell className="text-right px-2">
                                    <a
                                        href={`/maestro/grupos/${grupo.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Ver Alumnos
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No tienes grupos asignados
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}