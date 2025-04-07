'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { SetStateAction, useEffect, useState } from "react"
import { getGrupoAlumno } from "../actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeleteAlumnoGrupo } from "./delete-alumno-grupo"
import { UIPagination } from "@/components/ui-pagination"

interface AlumnoGrupo {
    id: string
    id_estudiante: string
    id_grupo: string
    fecha_inscripcion: string
    estado: string
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
export default function ListOfAlumnosGrupo() {

    const [grupo_alumno, setAlumnoGrupo] = useState<AlumnoGrupo[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    useEffect(() => {
        const fetchAlumnoGrupo = async () => {
            try {
                const result = await getGrupoAlumno()
                if (result.error) {
                    toast({
                        title: "Error",
                        description: "Error al cargar los grupos",
                        variant: "destructive",
                    })
                } else {
                    setAlumnoGrupo(result.grupo_alumno || [])
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
        fetchAlumnoGrupo()
    }, [])

    if (isLoading) {
        return <div className="flex justify-center p-8">Cargando grupos de profesores...</div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentAlumnos = grupo_alumno.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (pageNumber: SetStateAction<number>) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="overflow-hidden rounded-md border">
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre Alumno</TableHead>
                        <TableHead>Grupo</TableHead>
                        <TableHead>Materia</TableHead>
                        <TableHead>Cuatrimestre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha Inscripción</TableHead>

                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentAlumnos.length > 0 ? (
                        currentAlumnos.map((alumno) => (
                            <TableRow key={alumno.id}>
                                <TableCell>
                                    {alumno.id.substring(0, 8)}
                                </TableCell>
                                <TableCell>
                                    {alumno.usuarios.nombre}
                                </TableCell>
                                <TableCell>
                                    {alumno.grupos.clave_grupo}
                                </TableCell>
                                <TableCell>
                                    {alumno.grupos.materias.nombre}
                                </TableCell>
                                <TableCell>
                                    {alumno.grupos.cuatrimestres.nombre}
                                </TableCell>
                                <TableCell >{alumno.estado}</TableCell>
                                <TableCell>
                                    {alumno.fecha_inscripcion}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        asChild
                                        className="text-sm">
                                        <Link href={`/admin/alumnos/${alumno.id}`}>
                                            Editar
                                        </Link>
                                    </Button>
                                    <DeleteAlumnoGrupo
                                        grupoId={alumno.id}
                                        grupoNombre={alumno.grupos.clave_grupo}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">No hay alumnos inscritos en grupos</TableCell>
                        </TableRow>
                    )
                    }
                </TableBody>
            </Table>

            <UIPagination
                totalItems={grupo_alumno.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange} />

            <div className="text-sm text-muted-foreground text-center">
                Mostrando {currentAlumnos.length} de {grupo_alumno.length} alumnos
            </div>
        </div>
    )
}