'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { SetStateAction, useEffect, useState } from "react"
import { getGrupoProfesor } from "../actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeleteProfesorGrupo } from "./delete-profesor-grupo"
import { UIPagination } from "@/components/ui-pagination"

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
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

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

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentPorfesores = grupo_profesor.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (pageNumber: SetStateAction<number>) => {
        setCurrentPage(pageNumber)
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
                    {currentPorfesores.length > 0 ? (
                        currentPorfesores.map((grupo) => (
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

            <UIPagination
                totalItems={grupo_profesor.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange} />

            <div className="text-xs text-muted-foreground text-center">
                Mostrando {currentPorfesores.length} de {grupo_profesor.length} profesores
            </div>
        </div>
    )
}