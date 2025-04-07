import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MisMaterias from "./components/list-materias";

export default function page() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Materias Asignadas</CardTitle>
                    <CardDescription className="text-xl">Administra las materias que tienes asignadas este semestre.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <MisMaterias />
                </CardContent>
            </Card>
        </div>
    )
}