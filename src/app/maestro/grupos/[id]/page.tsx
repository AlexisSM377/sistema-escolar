import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notFound } from "next/navigation";
import { getAlumnosInscritos } from "../actions";
import { getGrupoProfesorById } from "@/app/(dashboard)/admin/profesor/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DetalleGrupoPage({ params }: { params: { id: string } }) {
    // Obtener detalles del grupo
    const { grupo_profesor, error } = await getGrupoProfesorById(params.id);

    if (error || !grupo_profesor) {
        notFound();
    }

    // Obtener alumnos del grupo
    const { alumnos, error: alumnosError } = await getAlumnosInscritos(params.id);


    if (alumnosError) {
        return (
            <div className="flex justify-center items-center p-6">
                Error al cargar los alumnos: {alumnosError.message}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold tracking-tight">
                    Grupo: {grupo_profesor.grupos?.clave_grupo}
                </h2>
                <Button variant="outline">
                    <Link href={`/maestro/grupos`}>
                        Volver a Grupos
                    </Link>
                </Button>

            </div>

            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Detalles del Grupo</CardTitle>
                        <CardTitle className="text-lg font-normal text-muted-foreground">
                            Materia: {grupo_profesor.grupos?.materias?.nombre}

                        </CardTitle>
                        <CardTitle className="text-lg font-normal text-muted-foreground">
                            Cuatrimestre: {grupo_profesor.grupos?.cuatrimestres?.nombre}
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Alumnos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>Alumnos inscritos en este grupo</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Matrícula</TableHead>
                                    <TableHead>Fecha de Inscripción</TableHead>
                                    <TableHead>Estado de Inscripción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {alumnos && alumnos.length > 0 ? (
                                    alumnos.map((alumno) => (
                                        <TableRow key={alumno.id}>
                                            <TableCell>{`${alumno.usuarios?.nombre || ''}`}</TableCell>
                                            <TableCell>{alumno.usuarios?.matricula || 'N/A'}</TableCell>
                                            <TableCell>{new Date(alumno.fecha_inscripcion).toLocaleDateString('es-MX')}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded text-base font-medium ${alumno.estado_inscripcion === 'Cursando' ? 'bg-green-100 text-green-800' :
                                                    alumno.estado_inscripcion === 'Baja' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {alumno.estado}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No hay alumnos inscritos en este grupo
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}