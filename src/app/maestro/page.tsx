import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MisGrupos from "./grupos/components/list-mis-grupos";
import ListOfAlumnosMaestro from "./alumnos/components/list-alumnos";
import ListOfCalificaciones from "./calificaciones/components/list-calificaiones";
import Link from "next/link";
// const types_of_users = [
//     { name: 'Mis Grupos', total: 100 },
//     { name: 'Total Alumnos', total: 100 },
//     { name: 'Calificaciones Pendientes', total: 100 },
//     { name: 'Materias Asignadas', total: 100 },

// ]

const AdminPage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">

                <main className="flex-1 p-6">

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold tracking-tight">Panel de Maestro</h1>
                        <div className="flex items-center gap-2">
                            <Button>Exportar Datos</Button>
                        </div>
                    </div>

                    {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">

                        {
                            types_of_users.map((i) => (
                                <Card key={i.name} >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-base font-medium">Total {i.name}</CardTitle>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">
                                            {i.total}
                                        </div>
                                        <p className="text-sm text-muted-foreground">+2 desde el mes pasado</p>
                                    </CardContent>

                                </Card>
                            ))
                        }
                    </div> */}

                    <Tabs defaultValue="grupos" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="grupos">Mis grupos</TabsTrigger>
                            <TabsTrigger value="alumnos">Alumnos</TabsTrigger>
                            <TabsTrigger value="calificaciones">Calificaciones</TabsTrigger>
                        </TabsList>
                        <TabsContent value="grupos" className="space-y-4 text-lg">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Grupos Asignados</CardTitle>
                                    <CardDescription>
                                        Administra los grupos que tienes asignados este semestre.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <MisGrupos />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="alumnos" className="space-y-4 text-lg">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gestión de Alumnos</CardTitle>
                                    <CardDescription>Administra los alumnos de tus grupos.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ListOfAlumnosMaestro />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="calificaciones" className="space-y-4 text-lg">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div>
                                        <CardTitle className="text-base font-medium">Calificaciones</CardTitle>
                                        <CardDescription>Administra las calificaciones de tus alumnos.</CardDescription>
                                    </div>

                                    <Button className="mt-2">
                                        <Link href="/maestro/calificaciones">
                                            Registrar Calificaciones
                                        </Link>
                                    </Button>

                                </CardHeader>
                                <CardContent>
                                    <ListOfCalificaciones />
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </main>
            </div>
        </div>
    )
}

export default AdminPage;