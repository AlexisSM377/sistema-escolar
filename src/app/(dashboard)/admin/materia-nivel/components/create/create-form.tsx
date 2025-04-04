'use client'
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createMateriaNivel } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const materiaNivelFormSchema = z.object({
    id_plan_estudio: z.string().min(1, { message: "Plan de estudio es requerido" }),
    id_materia: z.string().min(1, { message: "Materia es requerida" }),
    semestre: z.number().min(1, { message: "Semestre es requerido" }).max(13, { message: "Semestre no puede ser mayor a 12" }),
})

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
    materias: Materias[];
    planesEstudios: PlanesEstudio[];
}

export default function MateriaNivelForm(
    { materias, planesEstudios }: MateriaNivelFormProps
) {
    const [isPending, startTransition] = useTransition()


    const form = useForm<z.infer<typeof materiaNivelFormSchema>>({
        resolver: zodResolver(materiaNivelFormSchema),
        defaultValues: {
            id_plan_estudio: "",
            id_materia: "",
            semestre: 1,
        },
    })

    function onSubmit(data: z.infer<typeof materiaNivelFormSchema>) {
        startTransition(async () => {
            const result = await createMateriaNivel(data)
            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al crear la materia nivel",
                    variant: "destructive",
                })
            } else {
                document.getElementById("create-trigger")?.click();
                toast({
                    title: "Éxito",
                    description: "Materia nivel creada con éxito 🎓",
                })
            }
        })
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

                <Button
                    type="submit"
                    className="w-full flex gap-2 items-center"
                    variant="outline"
                >
                    Crear Plan de Estudios{" "}
                    <LoaderCircle
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>

        </Form>
    )
}