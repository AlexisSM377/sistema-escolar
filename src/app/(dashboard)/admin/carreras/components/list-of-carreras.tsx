'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SetStateAction, useEffect, useState } from "react";
import { getCarreras } from "../actions";
import { toast } from "@/hooks/use-toast";
import { DeleteCarreraButton } from "./delete-carrera";
import Link from "next/link";
import { UIPagination } from "@/components/ui-pagination";

interface Carrera {
    id: string;
    nombre: string;
    codigo: string;
    duracion_cuatrimestres: number;
    activa: boolean;
}
interface ListOfCarrerasProps {
    searchTerm: string; // Prop para el término de búsqueda
}


export default function ListOfCarreras({ searchTerm }: ListOfCarrerasProps) {

    const [allCarreras, setAllCarreras] = useState<Carrera[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10





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

    const filteredCarreras = allCarreras.filter((carrera) =>
        carrera.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular usuarios para la página actual
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentUsers = filteredCarreras.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (pageNumber: SetStateAction<number>) => {
        setCurrentPage(pageNumber)
    }

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
                    {currentUsers.length > 0 ? (
                        currentUsers.map((carrera) => (
                            <TableRow key={carrera.id}>
                                <TableCell>{carrera.id.substring(0, 8)}</TableCell>
                                <TableCell>{carrera.nombre}</TableCell>
                                <TableCell>{carrera.codigo}</TableCell>
                                <TableCell>{carrera.duracion_cuatrimestres} cuatrimestres</TableCell>

                                <TableCell>
                                    {carrera.activa ? (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm  font-medium text-green-900 ring-1 ring-green-600/20 ring-inset">Activa</span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Inactiva</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild className="text-sm">
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

            <div className="flex items-center justify-center flex-col">

                <UIPagination
                    totalItems={filteredCarreras.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />

                <div className="text-xs text-muted-foreground text-center">
                    Mostrando {currentUsers.length} de {filteredCarreras.length} usuarios
                </div>
            </div>
        </div>
    )
}