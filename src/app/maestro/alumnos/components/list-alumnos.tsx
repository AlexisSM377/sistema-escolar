'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react"
import { getAlumnosInscritos } from "../actions"
import { toast } from "@/hooks/use-toast"

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
        matricula: string
    }
}

export default function ListOfAlumnosMaestro() {

    const [alumnos, setAlumno] = useState<AlumnoGrupo[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAlumnoGrupo = async () => {
            try {
                const result = await getAlumnosInscritos()
                if (result.error) {
                    toast({
                        title: "Error",
                        description: "Error al cargar los grupos",
                        variant: "destructive",
                    })
                } else {
                    setAlumno(result.grupo_alumno || [])
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
        return <div className="flex justify-center p-6">Cargando grupos...</div>;
    }
    return (
        <div className="overflow-hidden rounded-md border py-2">
            <Table className="min-w-full">
                <TableCaption>Aquí puedes ver los alumnos inscritos en tu grupo</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Matricula</TableHead>
                        <TableHead>Grupo</TableHead>
                        <TableHead>Cuatrimestre</TableHead>
                        <TableHead>Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {alumnos.length > 0 ? (
                        alumnos.map((alumno) => (
                            <TableRow key={alumno.id}>

                                <TableCell>{alumno.usuarios.nombre}</TableCell>
                                <TableCell>{alumno.usuarios.matricula}</TableCell>
                                <TableCell>{alumno.grupos.clave_grupo}</TableCell>
                                <TableCell>{alumno.grupos.cuatrimestres.nombre}</TableCell>
                                <TableCell>
                                    <span
                                        className={
                                            alumno.estado === "aprobado"
                                                ? "text-green-500"
                                                : alumno.estado === "reprobado"
                                                    ? "text-red-500"
                                                    : "text-blue-500"
                                        }
                                    >
                                        {alumno.estado}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No hay alumnos inscritos en este grupo</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}