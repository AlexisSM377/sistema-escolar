'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getCarreras } from "../actions";
import { toast } from "@/hooks/use-toast";
import { DeleteCarreraButton } from "./delete-carrera";
import Link from "next/link";

interface Carrera {
    id: string;
    nombre: string;
    codigo: string;
    duracion_cuatrimestres: number;
    activa: boolean;
}


export default function ListOfCarreras() {

    const [allCarreras, setAllCarreras] = useState<Carrera[]>([]);



    useEffect(() => {
        const fetchCarreras = async () => {
            const result = await getCarreras();
            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al cargar las carreras",
                    variant: "destructive",
                });
            } else {
                setAllCarreras(result.carreras);
            }
        };

        fetchCarreras();
    }, []);

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Estatus</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allCarreras.length > 0 ? (
                        allCarreras.map((carrera) => (
                            <TableRow key={carrera.id}>
                                <TableCell>{carrera.id}</TableCell>
                                <TableCell>{carrera.nombre}</TableCell>
                                <TableCell>{carrera.codigo}</TableCell>
                                <TableCell>{carrera.duracion_cuatrimestres} cuatrimestres</TableCell>

                                <TableCell>
                                    <span
                                        className={
                                            carrera.activa ? "text-green-600 font-semibold px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm " : "text-red-600 font-semibold px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm"
                                        }
                                    >
                                        {carrera.activa ? "Activa" : "Inactiva"}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/carreras/${carrera.id}/edit`}>
                                            Editar
                                        </Link>
                                    </Button>
                                    <DeleteCarreraButton
                                        carreraId={carrera.id}
                                        carreraNombre={carrera.nombre}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No se encontraron resultados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}