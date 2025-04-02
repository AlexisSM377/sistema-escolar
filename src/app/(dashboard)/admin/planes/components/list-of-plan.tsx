'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getPlanesEstudio } from "../actions";
import { toast } from "@/hooks/use-toast";

import Link from "next/link";
import { DeletePlan } from "./delete-plan";


interface PlanEstudio {
    id: string;
    nombre: string;
    anio_implementacion: number;
    vigente: boolean;
    id_carrera: string;
    carrera: {
        id: string;
        nombre: string;
        codigo: string;
    };
}

export default function ListOfPlanes() {
    const [planes, setPlanes] = useState<PlanEstudio[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlanes = async () => {
            try {
                const result = await getPlanesEstudio();
                if (result.error) {
                    toast({
                        title: "Error",
                        description: "Error al cargar los planes de estudio",
                        variant: "destructive",
                    });
                } else {
                    setPlanes(result.planes || []);
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
        };

        fetchPlanes();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center p-8">Cargando planes de estudio...</div>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Carrera</TableHead>
                        <TableHead>Año</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {planes.length > 0 ? (
                        planes.map((plan) => (
                            <TableRow key={plan.id}>
                                <TableCell>{plan.id.substring(0, 8)}</TableCell>
                                <TableCell>{plan.nombre}</TableCell>
                                <TableCell>{plan.carrera?.nombre || "Sin carrera"}</TableCell>
                                <TableCell>{plan.anio_implementacion}</TableCell>
                                <TableCell>
                                    {plan.vigente ? (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-900 ring-1 ring-green-600/20 ring-inset">
                                            Vigente
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                            No vigente
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild className="text-sm">
                                        <Link href={`/admin/planes/${plan.id}/edit`}>
                                            Editar
                                        </Link>
                                    </Button>
                                    <DeletePlan
                                        planId={plan.id}
                                        planNombre={plan.nombre}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No se encontraron planes de estudio.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}