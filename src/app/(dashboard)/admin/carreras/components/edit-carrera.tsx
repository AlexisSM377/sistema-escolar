'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createCarrera, updateCarrera } from "../actions";
import { Switch } from "@/components/ui/switch";

const carreraSchema = z.object({
    nombre: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    codigo: z.string().min(2, { message: "El código debe tener al menos 2 caracteres" }),
    duracion_cuatrimestres: z.coerce.string().min(1, { message: "Ingrese la duración en cuatrimestres" }),
    activa: z.boolean().default(true)
});

type CarreraFormValues = z.infer<typeof carreraSchema>;

interface CarreraFormProps {
    initialData?: {
        id: string;
        nombre: string;
        codigo: string;
        duracion_cuatrimestres: string | number;
        activa: boolean;
    } | null;
    isEditing?: boolean;
}

export default function CarreraForm({ initialData, isEditing = false }: CarreraFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<CarreraFormValues>({
        resolver: zodResolver(carreraSchema),
        defaultValues: {
            nombre: initialData?.nombre || "",
            codigo: initialData?.codigo || "",
            duracion_cuatrimestres: initialData?.duracion_cuatrimestres?.toString() || "",
            activa: initialData?.activa ?? true
        }
    });

    async function onSubmit(data: CarreraFormValues) {
        setIsLoading(true);
        try {
            if (isEditing && initialData?.id) {
                const result = await updateCarrera(initialData.id, data);
                if (result.error) {
                    toast({
                        title: "Error",
                        description: "No se pudo actualizar la carrera: " + result.error.message,
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Carrera actualizada",
                        description: "La carrera se ha actualizado correctamente",
                    });
                    router.push("/admin/carreras");
                    router.refresh();
                }
            } else {
                const result = await createCarrera(data);
                if (result.error) {
                    toast({
                        title: "Error",
                        description: "No se pudo crear la carrera: " + result.error.message,
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Carrera creada",
                        description: "La carrera se ha creado correctamente",
                    });
                    router.push("/admin/carreras");
                    router.refresh();
                }
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error inesperado",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingeniería en Sistemas" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormDescription>Nombre de la carrera</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="codigo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código</FormLabel>
                            <FormControl>
                                <Input placeholder="ING-SIS" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormDescription>Código único para la carrera</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duracion_cuatrimestres"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duración (cuatrimestres)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="9" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormDescription>Número de cuatrimestres de la carrera</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="activa"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Activa</FormLabel>
                                <FormDescription>
                                    Determina si la carrera está activa actualmente
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

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear carrera"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}