'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { updateMateria } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const materiaSchema = z.object({
    nombre: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    codigo: z.string().min(2, { message: "El código debe tener al menos 2 caracteres" }),
    activa: z.boolean().default(true)
})

type MateriaFormValues = z.infer<typeof materiaSchema>

interface MateriaFormProps {
    materia: {
        id: string
        nombre: string
        codigo: string
        activa: boolean
    }
}


export default function MateriaFormEdit({ materia }: MateriaFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const form = useForm<MateriaFormValues>({
        resolver: zodResolver(materiaSchema),
        defaultValues: {
            nombre: materia.nombre,
            codigo: materia.codigo,
            activa: materia.activa
        }
    })

    async function onSubmit(data: MateriaFormValues) {
        setIsLoading(true);
        try {
            const result = await updateMateria(materia.id, data);
            if (result.error) {
                toast({
                    title: "Error",
                    description: "No se pudo actualizar la materia: " + result.error.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Materia actualizada",
                    description: "La materia se ha actualizado correctamente",
                });
                router.push("/admin/materias");
                router.refresh();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo actualizar la materia: " + error,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Programación Orientada a Objetos" {...field} />
                            </FormControl>
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
                                <Input placeholder="POO" {...field} />
                            </FormControl>
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
                                    Determina si la materia está activa actualmente
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
                        onClick={() => router.push("/admin/materias")}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Guardando..." : "Guardar cambios"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}