'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getCuatrimestres } from "../actions";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteCuatrimestre } from "./delete-cuatrimestre";

interface Cuatrimestre {
    id: string;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    activo: boolean;
    cerrado: boolean;
}

export default function ListOfCuatrimestres() {

    const [cuatrimestres, setCuatrimestres] = useState<Cuatrimestre[]>([]);

    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchCuatrimestres = async () => {
            try {
                const result = await getCuatrimestres()
                if (result.error) {
                    toast({
                        title: "Error",
                        description: "Error al cargar los cuatrimestres",
                        variant: "destructive",
                    });
                }
                else {
                    setCuatrimestres(result.cuatrimestres || []);
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar los datos" + error,
                    variant: "destructive",
                });

            } finally {
                setIsLoading(false)
            }
        }
        fetchCuatrimestres()
    }, [])

    if (isLoading) {
        return <div className="flex justify-center p-8">Cargando cuatrimestres...</div>;
    }
    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Fecha de Inicio</TableHead>
                        <TableHead>Fecha de Fin</TableHead>
                        <TableHead>Activo</TableHead>
                        <TableHead>Cerrado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cuatrimestres.length > 0 ? (
                        cuatrimestres.map((cuatrimestre) => (
                            <TableRow key={cuatrimestre.id}>
                                <TableCell>{cuatrimestre.id.substring(0, 8)}</TableCell>
                                <TableCell>{cuatrimestre.nombre}</TableCell>
                                <TableCell>{cuatrimestre.fecha_inicio}</TableCell>
                                <TableCell>{cuatrimestre.fecha_fin}</TableCell>
                                <TableCell>
                                    {cuatrimestre.activo ? (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm  font-medium text-green-900 ring-1 ring-green-600/20 ring-inset">Activo</span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Inactivo</span>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {cuatrimestre.cerrado ? (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Cerrado</span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm  font-medium text-green-900 ring-1 ring-green-600/20 ring-inset">Abierto</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild className="text-sm">
                                        <Link href={`/admin/cuatrimestres/${cuatrimestre.id}`}>
                                            Editar
                                        </Link>
                                    </Button>
                                    <DeleteCuatrimestre
                                        cuatrimestreId={cuatrimestre.id}
                                        cuatrimestreNombre={cuatrimestre.nombre}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No hay cuatrimestres disponibles
                            </TableCell>
                        </TableRow>
                    )
                    }
                </TableBody>
            </Table>

        </div>
    )
}