'use client'

import { CountChart } from "@/components/count-chart";
import { RecentActivities } from "@/components/recent-activities";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";



const types_of_users = [
    { name: 'Estudiantes', total: 100 },
    { name: 'Maestros', total: 100 },
    { name: 'Grupos', total: 100 },
    { name: 'Materias', total: 100 },
]






const AdminPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            <div className="w-full">
                <div className="flex gap-4 flex-wrap">

                    {
                        types_of_users.map((i) => (
                            <Card key={i.name} className="flex-1 min-w-[130px]">
                                <CardHeader>
                                    <CardTitle>{i.name}</CardTitle>
                                    <CardDescription>Total de {i.name} registrados</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Total: {i.total}
                                    </p>
                                </CardContent>

                            </Card>
                        ))
                    }
                </div>
                <div className="flex">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <CountChart />
                        <CountChart />
                        <CountChart />

                        <CountChart />
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Acciones
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1>
                            Agregar alumno
                        </h1>
                        <h2>
                            Agregar maestro
                        </h2>
                        <h2>
                            Agregar grupo
                        </h2>
                        <h2>
                            Agregar materia
                        </h2>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentActivities />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AdminPage;