'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getUsuarios } from "../actions";
import { DeleteUserButton } from "./delete-user";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";
import { UIPagination } from "@/components/ui-pagination";

interface Usuario {
    id: string;
    email: string;
    password: string;
    nombre: string;
    id_rol: string;
    roles: {
        id: string;
        nombre: string;
    }
    genero: string;
    matricula: string;
}

export default function ListOfUsers() {
    const [usuarios, setUsuarios] = useState([] as Usuario[]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchUsuarios = async () => {
            const { usuarios, error } = await getUsuarios();
            if (error) {
                console.error("Error al cargar los usuarios:", error);
            } else {
                setUsuarios(usuarios || []);
            }
            setIsLoading(false);
        };
        fetchUsuarios();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center p-8">Cargando usuarios...</div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsuarios = usuarios.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Genero</TableHead>
                        <TableHead>Matricula</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {currentUsuarios.length > 0 ? (
                        currentUsuarios.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id.substring(0, 8)}</TableCell>
                                <TableCell>{user.nombre}</TableCell>
                                <TableCell>
                                    <span
                                        className={cn(
                                            "dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize border-[.5px] text-sm",
                                            {
                                                "border-green-500 text-green-600 bg-green-200":
                                                    user.roles?.nombre === "Estudiante",
                                                "border-yellow-500 text-yellow-600 bg-yellow-200":
                                                    user.roles?.nombre === "Profesor",
                                                "border-blue-500 text-blue-600 bg-blue-200":
                                                    user.roles?.nombre === "Administrador",
                                            }
                                        )}
                                    >
                                        {user.roles?.nombre}
                                    </span>
                                </TableCell>
                                <TableCell>{user.genero}</TableCell>
                                <TableCell>{user.matricula}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/admin/usuarios/editar/${user.id}`}>
                                        <Button variant="ghost" size="sm" className="text-sm">
                                            Editar
                                        </Button>
                                    </Link>
                                    <DeleteUserButton userId={user.id} userName={user.nombre} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                No hay usuarios disponibles
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <UIPagination
                totalItems={usuarios.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <div className="text-xs text-muted-foreground text-center">
                Mostrando {currentUsuarios.length} de {usuarios.length} usuarios
            </div>
        </div>
    );
}