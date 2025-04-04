"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateMateriaNivel } from "../../actions";
import { toast } from "@/hooks/use-toast";

const materiaNivelFormSchema = z.object({
    id_plan_estudio: z.string().min(1, { message: "Plan de estudio es requerido" }),
    id_materia: z.string().min(1, { message: "Materia es requerida" }),
    semestre: z.number().min(1, { message: "Semestre es requerido" }).max(13, { message: "Semestre no puede ser mayor a 12" }),
})

type MateriaNivelFormValues = z.infer<typeof materiaNivelFormSchema>;

interface Materias {
    id: string;
    nombre: string;
    codigo: string;
}

interface PlanesEstudio {
    id: string;
    nombre: string;
    anio_implementacion: number;
}

interface MateriaNivelFormProps {
    materiasNivel: {
        id: string
        id_plan_estudio: string
        id_materia: string
        semestre: number
    }
    planesEstudios: PlanesEstudio[];
    materias: Materias[];
}

export default function EditMateriaNivelForm(
    { materias, planesEstudios, materiasNivel }: MateriaNivelFormProps
) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const form = useForm<MateriaNivelFormValues>({
        resolver: zodResolver(materiaNivelFormSchema),
        defaultValues: {
            id_plan_estudio: materiasNivel.id_plan_estudio,
            id_materia: materiasNivel.id_materia,
            semestre: materiasNivel.semestre,
        },
    })

    async function onSubmit(data: MateriaNivelFormValues) {
        setIsLoading(true);
        try {
            const result = await updateMateriaNivel(materiasNivel.id, data)
            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al crear la materia nivel",
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Éxito",
                    description: "Materia nivel creada correctamente",
                    variant: "default",
                })
                router.push("/admin/materia-nivel")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error al crear la materia nivel" + error,
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
                    name="id_plan_estudio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Plan de Estudio</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}

                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar el plan de estudio" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {planesEstudios.map((planEstudio) => (
                                        <SelectItem key={planEstudio.id} value={planEstudio.id}>
                                            {planEstudio.nombre} ({planEstudio.anio_implementacion})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecciona el plan de estudio al que pertenece la materia.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                    name="semestre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Semestre</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(Number(value))}
                                defaultValue={String(field.value)}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar semestre" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[...Array(12)].map((_, index) => (
                                        <SelectItem key={index} value={String(index + 1)}>
                                            {index + 1}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>
                            <FormDescription>
                                Semestre en el que se cursa la materia.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/materia-nivel")}
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