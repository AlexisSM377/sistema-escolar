import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ListOfAlumnosMaestro from "./components/list-alumnos";

export default function page() {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Gestión de Alumnos
                    </CardTitle>
                    <CardDescription className="text-xl">Administra los alumnos de tus grupos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {/* <SearchIcon className="h-4 w-4 text-muted-foreground" /> */}
                            {/* <Input
                                placeholder="Buscar grupos..."
                                className="h-9 w-[250px]"
                            /> */}
                        </div>
                    </div>
                    <ListOfAlumnosMaestro />
                </CardContent>
            </Card>
        </div>
    )
}