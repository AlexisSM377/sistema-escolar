import { Input } from "@/components/ui/input";
import ListMisGrupos from "./components/list-mis-grupos";
import { SearchIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function page() {
    return (
        <div className="space-y-4">

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Grupos Asignados</CardTitle>
                    <CardDescription className="text-sm">Administra los grupos que tienes asignados este semestre.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <SearchIcon className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar grupos..."
                                className="h-9 w-[250px]"

                            />
                        </div>
                    </div>
                    <ListMisGrupos />

                </CardContent>
            </Card>
        </div>
    )
}