'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getMaterias } from "../actions";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteMateria } from "./delete-materia";

interface Materia {
    id: string;
    nombre: string;
    codigo: string;
    activa: boolean;
}

export default function ListOfMaterias() {

    const [allMaterias, setAllMaterias] = useState<Materia[]>([]);

    useEffect(() => {
        const fetchMaterias = async () => {
            const result = await getMaterias()
            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al cargar las materias",
                    variant: "destructive",
                });
            } else {
                setAllMaterias(result.materias);
            }
        }
        fetchMaterias()
    }, [])
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Estatus</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allMaterias.map((materia) => (
                            <TableRow key={materia.id}>
                                <TableCell>{materia.id.substring(0, 8)}</TableCell>
                                <TableCell>{materia.nombre}</TableCell>
                                <TableCell>{materia.codigo}</TableCell>
                                <TableCell>
                                    {materia.activa ? (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm  font-medium text-green-900 ring-1 ring-green-600/20 ring-inset">Activa</span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Inactiva</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/materias/${materia.id}/edit`}>
                                            Editar
                                        </Link>
                                    </Button>
                                    <DeleteMateria
                                        materiaId={materia.id}
                                        materiaNombre={materia.nombre}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}