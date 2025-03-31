"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import UsuarioForm from "./createForm"

export function UsersTable() {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)

    // Datos de ejemplo
    const users = [
        { id: 1, nombre: "Juan Pérez", tipo: "Maestro", email: "juan.perez@escuela.edu", estatus: "Activo", genero: "M" },
        { id: 2, nombre: "María López", tipo: "Maestro", email: "maria.lopez@escuela.edu", estatus: "Activo", genero: "F" },
        { id: 3, nombre: "Carlos Gómez", tipo: "Alumno", email: "carlos.gomez@escuela.edu", estatus: "Activo", genero: "M" },
        { id: 4, nombre: "Ana Martínez", tipo: "Alumno", email: "ana.martinez@escuela.edu", estatus: "Inactivo", genero: "F" },
        { id: 5, nombre: "Roberto Sánchez", tipo: "Maestro", email: "roberto.sanchez@escuela.edu", estatus: "Activo", genero: "M" },
    ]

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SearchIcon className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar usuarios..." className="h-9 w-[250px]" />
                </div>
                <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="h-9 text-sm">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Agregar Usuario
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                            <DialogDescription>Completa los datos para crear un nuevo usuario en el sistema.</DialogDescription>
                        </DialogHeader>
                        <UsuarioForm />
                    </DialogContent>
                </Dialog>
            </div>
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
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.nombre}</TableCell>
                                <TableCell>
                                    <span
                                        className={cn(
                                            " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                                            {
                                                "border-green-500 text-green-600 bg-green-200":
                                                    user.tipo === "Alumno",
                                                "border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
                                                    user.tipo === "Maestro",
                                            }
                                        )}
                                    >
                                        {user.tipo}
                                    </span>
                                </TableCell>
                                <TableCell>{user.genero}</TableCell>
                                <TableCell>{user.estatus}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="text-sm">
                                        Editar
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-destructive text-sm">
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

