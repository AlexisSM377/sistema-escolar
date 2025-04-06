'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { getGrupoProfesor } from "../actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeleteProfesorGrupo } from "./delete-profesor-grupo"

interface ProfesorGrupo {
    id: string
    id_usuario: string
    id_grupo: string
    grupos: {
        id: string
        clave_grupo: string
        materias: {
            id: string
            nombre: string
        }
        cuatrimestres: {
            id: string
            nombre: string
        }
    }
    usuarios: {
        id: string
        nombre: string
    }
}

export default function ListOfProfesorGrupo() {

    const [grupo_profesor, setProfesorGrupo] = useState<ProfesorGrupo[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProfesorGrupo = async () => {
            try {
                const result = await getGrupoProfesor()
                if (result.error) {
                    toast({
                        title: "Error",
                        description: "Error al cargar los grupos",
                        variant: "destructive",
                    })
                } else {
                    setProfesorGrupo(result.grupo_profesor || [])
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
        fetchProfesorGrupo()
    }, [])

    if (isLoading) {
        return <div className="flex justify-center p-8">Cargando grupos de profesores...</div>;
    }

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre Profesor</TableHead>
                        <TableHead>Grupo</TableHead>
                        <TableHead>Materia</TableHead>
                        <TableHead>Cuatrimestre</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {grupo_profesor.length > 0 ? (
                        grupo_profesor.map((grupo) => (
                            <TableRow key={grupo.id}>
                                <TableCell>{grupo.id.substring(0, 8)}</TableCell>
                                <TableCell>{grupo.usuarios?.nombre || 'No disponible'}</TableCell>
                                <TableCell>{grupo.grupos?.clave_grupo || 'No disponible'}</TableCell>
                                <TableCell>{grupo.grupos?.materias?.nombre || 'No disponible'}</TableCell>
                                <TableCell>{grupo.grupos?.cuatrimestres?.nombre || 'No disponible'}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild className="text-sm">
                                        <Link href={`/admin/profesor/${grupo.id}`}>
                                            Editar
                                        </Link>
                                    </Button>
                                    <DeleteProfesorGrupo
                                        grupoId={grupo.id}
                                        grupoNombre={grupo.grupos?.clave_grupo || 'No disponible'}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">No hay grupos asignados a profesores</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}