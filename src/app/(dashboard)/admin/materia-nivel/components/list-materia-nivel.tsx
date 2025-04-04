'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getMateriaNivel } from "../actions";
import { toast } from "@/hooks/use-toast";
import { DeleteMateriaNivel } from "./delete-materia-nivel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MateriaNivel {
    id: string;
    id_materia: string;
    id_plan_estudio: string;
    semestre: number;
    materias: {
        id: string;
        nombre: string;
    };
    planes_estudio: {
        id: string;
        nombre: string;
    };
}

export default function ListOfMateriasNivel() {
    const [materiasNivel, setMateriasNivel] = useState<MateriaNivel[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMateriasNivel = async () => {
            try {
                const result = await getMateriaNivel();
                if (result.error) {
                    toast({
                        title: "Error",
                        description: "Error al cargar las materias de nivel",
                        variant: "destructive",
                    });
                } else {
                    setMateriasNivel(result.materiasNivel || []);
                }

            } catch (error) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar los datos" + error,
                    variant: "destructive",
                });

            } finally {
                setIsLoading(false);
            }
        }
        fetchMateriasNivel();

    }, [])

    if (isLoading) {
        return <div className="flex justify-center p-8">Cargando planes de estudio...</div>;
    }


    return (
        <div className="overflow-hidden rounded-md border">

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Plan de Estudio</TableHead>
                        <TableHead>Materia</TableHead>
                        <TableHead>Cuatrimestre</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {materiasNivel.map((materia) => (
                        <TableRow key={materia.id}>
                            <TableCell>{materia.id.substring(0, 8)}</TableCell>
                            <TableCell>{materia.planes_estudio.nombre}</TableCell>
                            <TableCell>{materia.materias.nombre}</TableCell>
                            <TableCell>{materia.semestre}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" asChild className="text-sm">
                                    <Link href={`/admin/materia-nivel/${materia.id}`}>
                                        Editar
                                    </Link>
                                </Button>
                                <DeleteMateriaNivel
                                    mteriaNivelId={materia.id}
                                    materiaNivelNombre={materia.materias.nombre}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}