"use client";

import { useEffect, useState } from "react";
import { getCalificaciones, editarCalificacion } from "../actions";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
    const [selectedCalificacion, setSelectedCalificacion] = useState<CalificacionesGrupo | null>(null);
    const [editValues, setEditValues] = useState({
        primer_parcial: null,
        segundo_parcial: null,
        tercer_parcial: null,
        calificacion_final: null,
    });
    const [isEditing, setIsEditing] = useState(false);

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

    const handleEditClick = (calificacion: CalificacionesGrupo) => {
        setSelectedCalificacion(calificacion);
        setEditValues({
            primer_parcial: calificacion.primer_parcial,
            segundo_parcial: calificacion.segundo_parcial,
            tercer_parcial: calificacion.tercer_parcial,
            calificacion_final: calificacion.calificacion_final,
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedCalificacion) return;

        // Calculate calificacion_final as the average of the three partial grades
        const calculatedFinal =
            (editValues.primer_parcial ?? 0) +
            (editValues.segundo_parcial ?? 0) +
            (editValues.tercer_parcial ?? 0);
        const averageFinal = calculatedFinal > 0 ? calculatedFinal / 3 : null;

        try {
            const result = await editarCalificacion(selectedCalificacion.id, {
                ...editValues,
                calificacion_final: averageFinal,
            });
            if (result.error) {
                toast({
                    title: "Error",
                    description: result.error.message || "Error al actualizar la calificación",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Éxito",
                    description: "Calificación actualizada correctamente",
                });
                setCalificaciones((prev) =>
                    prev.map((cal) =>
                        cal.id === selectedCalificacion.id
                            ? { ...cal, ...editValues, calificacion_final: averageFinal }
                            : cal
                    )
                );
                setIsEditing(false);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error al guardar los cambios: " + (error as Error).message,
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-6">Cargando calificaciones...</div>;
    }

    return (
        <>
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
                            <TableHead>Acciones</TableHead>
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
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-sm"
                                            onClick={() => handleEditClick(calificacion)}
                                        >
                                            Editar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center">
                                    No hay calificaciones disponibles
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Calificación</DialogTitle>
                        <DialogDescription>
                            Edita las calificaciones del estudiante{" "}
                            <span className="font-semibold text-sm">
                                {selectedCalificacion?.inscripciones.usuarios.nombre}
                            </span>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input
                            type="number"
                            placeholder="Primer Parcial"
                            min={1}
                            max={10}
                            value={editValues.primer_parcial ?? ""}
                            onChange={(e) =>
                                setEditValues({ ...editValues, primer_parcial: Number(e.target.value) || null })
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Segundo Parcial"
                            min={1}
                            max={10}
                            value={editValues.segundo_parcial ?? ""}
                            onChange={(e) =>
                                setEditValues({ ...editValues, segundo_parcial: Number(e.target.value) || null })
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Tercer Parcial"
                            min={1}
                            max={10}
                            value={editValues.tercer_parcial ?? ""}
                            onChange={(e) =>
                                setEditValues({ ...editValues, tercer_parcial: Number(e.target.value) || null })
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Calificación Final (Calculada)"
                            value={
                                ((editValues.primer_parcial ?? 0) +
                                    (editValues.segundo_parcial ?? 0) +
                                    (editValues.tercer_parcial ?? 0)) /
                                3 || ""
                            }
                            disabled
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSave}>Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}