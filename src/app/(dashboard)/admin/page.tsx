'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "@/components/users-table";

const types_of_users = [
    { name: 'Estudiantes', total: 100 },
    { name: 'Maestros', total: 100 },
    { name: 'Grupos', total: 100 },
    { name: 'Materias', total: 100 },
]

const AdminPage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
                <main className="flex-1 p-6">

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold tracking-tight">Panel de Administrador</h1>
                        <div className="flex items-center gap-2">
                            <Button>Exportar Datos</Button>
                            <Button variant="outline">Configuración</Button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">

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
                    </div>

                    <Tabs defaultValue="usuarios" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
                            <TabsTrigger value="carreras">Carreras</TabsTrigger>
                            <TabsTrigger value="materias">Materias</TabsTrigger>
                            <TabsTrigger value="grupos">Grupos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="usuarios" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gestión de Usuarios</CardTitle>
                                    <CardDescription>Administra maestros y alumnos del sistema.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <UsersTable />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="carreras" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gestión de Carreras</CardTitle>
                                    <CardDescription>Administra las carreras disponibles en la institución.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* <CarrerasTable /> */}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="materias" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gestión de Materias</CardTitle>
                                    <CardDescription>Administra las materias disponibles en la institución.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* <MateriasTable /> */}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="grupos" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gestión de Grupos</CardTitle>
                                    <CardDescription>Administra los grupos disponibles en la institución.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* <GruposTable /> */}
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