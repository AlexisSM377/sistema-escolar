"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { updatePlanEstudio } from "../../actions";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface EditPlanFormProps {
    plan: {
        id: string;
        id_carrera: string;
        nombre: string;
        anio_implementacion: number;
        vigente: boolean;
    };
    carreras: Carrera[];
}

export default function EditPlanForm({ plan, carreras }: EditPlanFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<PlanEstudioFormValues>({
        resolver: zodResolver(planEstudioSchema),
        defaultValues: {
            id_carrera: plan.id_carrera,
            nombre: plan.nombre,
            anio_implementacion: plan.anio_implementacion,
            vigente: plan.vigente
        }
    });

    async function onSubmit(data: PlanEstudioFormValues) {
        setIsLoading(true);
        try {
            const result = await updatePlanEstudio(plan.id, data);
            if (result.error) {
                toast({
                    title: "Error",
                    description: "No se pudo actualizar el plan de estudio: " + result.error.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Plan actualizado",
                    description: "El plan de estudio se ha actualizado correctamente",
                });
                router.push("/admin/planes");
                router.refresh();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error inesperado",
                variant: "destructive",
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
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
                                disabled={isLoading}
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
                                <Input placeholder="Plan 2023" {...field} disabled={isLoading} />
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
                                <Input type="number" placeholder="2023" {...field} disabled={isLoading} />
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

                <div className="flex items-center justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/planes")}
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
    );
}