
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { getUsuarios } from "../actions";
import { DeleteUserButton } from "./delete-user";
import Link from "next/link";

export default async function ListOfUsers() {

    const { usuarios, error } = await getUsuarios();

    if (error) {
        return <div>Error al cargar los usuarios</div>;
    }



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
                    {usuarios?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id.substring(0, 8)}</TableCell>
                            <TableCell>{user.nombre}</TableCell>
                            <TableCell>
                                <span
                                    className={cn(
                                        "dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                                        {
                                            "border-green-500 text-green-600 bg-green-200":
                                                user.roles?.nombre === "estudiante",
                                            "border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
                                                user.id_role === "profesor",
                                            "border-blue-500 text-blue-600 bg-blue-200":
                                                user.roles?.nombre === "admin",
                                        }


                                    )}
                                >
                                    {user.roles?.nombre || user.id_rol}
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
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}