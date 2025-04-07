"use client";

import { useEffect, useState } from "react";
import { getCalificaciones } from "../actions";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CalificacionesGrupo {
    id: string;
    id_inscripcion: string;
    primer_parcial: number | null;
    segundo_parcial: number | null;
    tercer_parcial: number | null;
    calificacion_final: number | null;
    inscripciones: {
        id: string;
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
        usuarios: {
            id: string;
            nombre: string;
            matricula: string;
        };
    };
}

export default function ListOfCalificaciones() {
    const [calificaciones, setCalificaciones] = useState<CalificacionesGrupo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCalificacionesGrupo = async () => {
            try {
                const result = await getCalificaciones();
                if (result.error) {
                    toast({
                        title: "Error",
                        description: result.error.message || "Error al cargar las calificaciones",
                        variant: "destructive",
                    });
                } else {
                    setCalificaciones(result.grupo_alumno || []);
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar los datos: " + (error as Error).message,
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchCalificacionesGrupo();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center p-6">Cargando calificaciones...</div>;
    }

    return (
        <div className="overflow-hidden rounded-md border py-2">
            <Table>
                <TableCaption>Lista de Calificaciones de los Alumnos</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Grupo</TableHead>
                        <TableHead>Materia</TableHead>
                        <TableHead>Cuatrimestre</TableHead>
                        <TableHead>Primer Parcial</TableHead>
                        <TableHead>Segundo Parcial</TableHead>
                        <TableHead>Tercer Parcial</TableHead>
                        <TableHead>Calificación Final</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {calificaciones.length > 0 ? (
                        calificaciones.map((calificacion) => (
                            <TableRow key={calificacion.id}>
                                <TableCell>{calificacion.inscripciones.usuarios.nombre}</TableCell>
                                <TableCell>{calificacion.inscripciones.usuarios.matricula}</TableCell>
                                <TableCell>{calificacion.inscripciones.grupos.clave_grupo}</TableCell>
                                <TableCell>{calificacion.inscripciones.grupos.materias.nombre}</TableCell>
                                <TableCell>{calificacion.inscripciones.grupos.cuatrimestres.nombre}</TableCell>
                                <TableCell>{calificacion.primer_parcial}</TableCell>
                                <TableCell>{calificacion.segundo_parcial}</TableCell>
                                <TableCell>{calificacion.tercer_parcial}</TableCell>
                                <TableCell>{calificacion.calificacion_final}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center">
                                No hay calificaciones disponibles
                            </TableCell>
                        </TableRow>
                    )
                    }
                </TableBody>
            </Table>
        </div>
    );
}