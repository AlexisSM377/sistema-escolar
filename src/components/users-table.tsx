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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusIcon, SearchIcon } from "lucide-react"

export function UsersTable() {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)

    // Datos de ejemplo
    const users = [
        { id: 1, nombre: "Juan Pérez", tipo: "Maestro", email: "juan.perez@escuela.edu", estatus: "Activo" },
        { id: 2, nombre: "María López", tipo: "Maestro", email: "maria.lopez@escuela.edu", estatus: "Activo" },
        { id: 3, nombre: "Carlos Gómez", tipo: "Alumno", email: "carlos.gomez@escuela.edu", estatus: "Activo" },
        { id: 4, nombre: "Ana Martínez", tipo: "Alumno", email: "ana.martinez@escuela.edu", estatus: "Inactivo" },
        { id: 5, nombre: "Roberto Sánchez", tipo: "Maestro", email: "roberto.sanchez@escuela.edu", estatus: "Activo" },
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
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nombre" className="text-right">
                                    Nombre
                                </Label>
                                <Input id="nombre" placeholder="Nombre completo" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input id="email" placeholder="correo@ejemplo.com" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tipo" className="text-right">
                                    Tipo
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="maestro">Maestro</SelectItem>
                                        <SelectItem value="alumno">Alumno</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="password" className="text-right">
                                    Contraseña
                                </Label>
                                <Input id="password" type="password" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={() => setIsAddUserOpen(false)}>
                                Guardar
                            </Button>
                        </DialogFooter>
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
                            <TableHead>Email</TableHead>
                            <TableHead>Estatus</TableHead>
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
                                        className={`inline-flex items-center rounded-md px-2 py-1 font-medium ${user.tipo === "Alumno" ? "bg-yellow-50  text-yellow-800 ring-1 ring-yellow-600/20 ring-inset" : "bg-blue-50  text-blue-700 ring-1 ring-blue-700/10 ring-inset"
                                            }`}
                                    >
                                        {user.tipo}
                                    </span>
                                </TableCell>

                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.estatus}</TableCell>
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

