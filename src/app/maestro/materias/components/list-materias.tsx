'use client'
import { useEffect, useState } from "react";
import { getMisGrupos } from "../../grupos/actions";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type MateriaProfesor = {
    id: string;
    id_usuario: string;
    id_grupo: string;
    grupos: {
        id: string;
        clave_grupo: string;
        materias: {
            id: string;
            nombre: string;
            codigo: string;
        };
        cuatrimestres: {
            id: string;
            nombre: string;
        };
    };
}
export default function MisMaterias() {

    const [materias, setMaterias] = useState<MateriaProfesor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const { grupos_profesor, error } = await getMisGrupos();

                if (error) {
                    toast({
                        title: "Error",
                        description: "No se pudieron cargar tus grupos",
                        variant: "destructive",
                    });
                    return;
                }

                setMaterias(grupos_profesor || []);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar los grupos" + error,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMaterias();
    }, []);

    if (loading) {
        return <div className="flex justify-center p-6">Cargando grupos...</div>;
    }
    return (
        <div className="overflow-hidden rounded-md border py-2">
            <Table>
                <TableCaption>Materias asignadas a tus grupos</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Materia</TableHead>
                        <TableHead>Codifo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {materias.length > 0 ? (
                        materias.map((materia) => (
                            <TableRow key={materia.id}>
                                <TableHead>{materia.grupos.materias.id}</TableHead>
                                <TableHead>{materia.grupos.materias.nombre}</TableHead>
                                <TableHead>{materia.grupos.materias.codigo}</TableHead>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableHead colSpan={2} className="text-center">
                                No tienes materias asignadas
                            </TableHead>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>
    )
}