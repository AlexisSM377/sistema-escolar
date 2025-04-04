'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { getGrupos } from "../actions"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeleteGrupo } from "./delete-grupo"
interface Grupo {
    id: string
    id_materia: string
    cuatrimestre: number
    clave_grupo: string
    cupo_maximo: number
    activo: boolean,
    materias: {
        id: string
        nombre: string
    }
    cuatrimestres: {
        id: string
        nombre: string
    }
}

export default function ListOfGrupos() {

    const [grupos, setGrupos] = useState<Grupo[]>([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchGrupos = async () => {
            try {
                const result = await getGrupos()
                if (result.error) {
                    toast({
                        title: "Error",
                        description: "Error al cargar los grupos",
                        variant: "destructive",
                    })

                } else {
                    setGrupos(result.grupos || [])
                }

            } catch (error) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar los datos" + error,
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }
        fetchGrupos()
    }, [])

    if (isLoading) {
        return <div className="flex justify-center p-8">Cargando planes de estudio...</div>;
    }

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Materia</TableHead>
                        <TableHead>Cuatrimestre</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Cupo Maximo</TableHead>
                        <TableHead>Activo</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {grupos.length > 0 ? (
                        grupos.map((grupo) => (
                            <TableRow key={grupo.id}>
                                <TableCell>{grupo.id.substring(0, 8)}</TableCell>
                                <TableCell>{grupo.materias.nombre}</TableCell>
                                <TableCell>{grupo.cuatrimestres.nombre}</TableCell>
                                <TableCell>{grupo.clave_grupo}</TableCell>
                                <TableCell>{grupo.cupo_maximo} alumnos</TableCell>
                                <TableCell>
                                    {grupo.activo ? (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm  font-medium text-green-900 ring-1 ring-green-600/20 ring-inset">Activo</span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Inactivo</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild className="text-sm">
                                        <Link href={`/admin/grupos/${grupo.id}`}>
                                            Editar
                                        </Link>
                                    </Button>
                                    <DeleteGrupo
                                        grupoId={grupo.id}
                                        grupoNombre={grupo.clave_grupo}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                No hay grupos disponibles
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}