'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { updateGrupos } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const gruposFormSchema = z.object({
    id_materia: z.string().min(1, { message: "Materia es requerida" }),
    id_cuatrimestre: z.string().min(1, { message: "Cuatrimestre es requerido" }),
    clave_grupo: z.string().min(1, { message: "Clave de grupo es requerida" }),
    cupo_maximo: z.number().min(1, { message: "Cupo máximo es requerido" }).max(30, { message: "Cupo máximo no puede ser mayor a 30" }),
    activo: z.boolean().default(true),
})

type GruposFormValues = z.infer<typeof gruposFormSchema>;

interface Materias {
    id: string;
    nombre: string;
    codigo: string;
}

interface Cuatrimestres {
    id: string;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    activo: boolean;
    cerrado: boolean;
}

interface GruposFormProps {
    grupos: {
        id: string
        id_materia: string
        id_cuatrimestre: string
        clave_grupo: string
        cupo_maximo: number
        activo: boolean
    }
    materias: Materias[];
    cuatrimestres: Cuatrimestres[];
}


export default function EditGrupoForm({
    materias,
    cuatrimestres,
    grupos
}: GruposFormProps
) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<GruposFormValues>({
        resolver: zodResolver(gruposFormSchema),
        defaultValues: {
            id_materia: grupos.id_materia,
            id_cuatrimestre: grupos.id_cuatrimestre,
            clave_grupo: grupos.clave_grupo,
            cupo_maximo: grupos.cupo_maximo,
            activo: grupos.activo,
        },
    })


    async function onSubmit(data: GruposFormValues) {
        setIsLoading(true);
        try {
            const result = await updateGrupos(grupos.id, data)
            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al actualizar el grupo",
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Éxito",
                    description: "Grupo actualizado con éxito 🎓",
                })
                router.push("/admin/grupos")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error al cargar los datos" + error,
                variant: "destructive",
            })
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="id_materia"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Materia</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}

                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar la materia" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {materias.map((materia) => (
                                        <SelectItem key={materia.id} value={materia.id}>
                                            {materia.nombre} ({materia.codigo})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecciona la materia que pertenece al plan de estudio.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="id_cuatrimestre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cuatrimestre</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}

                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar el cuatrimestre" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {cuatrimestres.map((cuatrimestre) => (
                                        <SelectItem key={cuatrimestre.id} value={cuatrimestre.id}>
                                            {cuatrimestre.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecciona el cuatrimestre al que pertenece la materia.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="clave_grupo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Clave de grupo</FormLabel>
                            <FormControl>
                                <Input placeholder="ISC-A" {...field} />

                            </FormControl>
                            <FormDescription>
                                Ingresa la clave del grupo.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="cupo_maximo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cupo máximo</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="25 alumnos"
                                    value={field.value}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormDescription>
                                Ingresa el cupo máximo de alumnos por grupo.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="activo"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Activo</FormLabel>
                                <FormDescription>
                                    Selecciona si el grupo está activo.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/grupos")}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Actualizando..." : "Guardar Cambios"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}