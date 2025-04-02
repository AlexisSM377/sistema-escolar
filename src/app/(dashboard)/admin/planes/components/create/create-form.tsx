"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createPlanEstudio } from "../../actions";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

const planEstudioSchema = z.object({
    id_carrera: z.string().uuid({ message: "Seleccione una carrera válida" }),
    nombre: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    anio_implementacion: z.coerce.number()
        .int({ message: "Debe ser un número entero" })
        .min(2000, { message: "El año debe ser mayor a 2000" })
        .max(new Date().getFullYear() + 5, { message: "El año no puede ser mayor a 5 años en el futuro" }),
    vigente: z.boolean().default(true)
});

type PlanEstudioFormValues = z.infer<typeof planEstudioSchema>;

interface Carrera {
    id: string;
    nombre: string;
    codigo: string;
}

interface CreatePlanFormProps {
    carreras: Carrera[];
}

export default function CreatePlanForm({ carreras }: CreatePlanFormProps) {
    const [isPending, startTransition] = useTransition()

    const form = useForm<PlanEstudioFormValues>({
        resolver: zodResolver(planEstudioSchema),
        defaultValues: {
            id_carrera: "",
            nombre: "",
            anio_implementacion: new Date().getFullYear(),
            vigente: true
        }
    });

    async function onSubmit(data: PlanEstudioFormValues) {
        startTransition(async () => {
            const result = await createPlanEstudio(data);

            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al crear el plan de estudios",
                    variant: "destructive"
                });
            } else {
                document.getElementById("create-trigger")?.click();

                toast({
                    title: "Éxito",
                    description: "Plan de estudios creado con éxito 🎓"
                });
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="id_carrera"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Carrera</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}

                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar carrera" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {carreras.map((carrera) => (
                                        <SelectItem key={carrera.id} value={carrera.id}>
                                            {carrera.nombre} ({carrera.codigo})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>Carrera a la que pertenece este plan de estudio</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Plan 2023" {...field} />
                            </FormControl>
                            <FormDescription>Nombre o identificador del plan de estudios</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="anio_implementacion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Año de implementación</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="2023" {...field} />
                            </FormControl>
                            <FormDescription>Año en que se implementó el plan</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="vigente"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Vigente</FormLabel>
                                <FormDescription>
                                    Indica si el plan de estudios está vigente actualmente
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
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
    );
}