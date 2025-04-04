'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCuatrimestre } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
    nombre: z.string().min(1, { message: "Nombre es requerido" }),
    fecha_inicio: z.string().min(1, { message: "Fecha de inicio es requerida" }),
    fecha_fin: z.string().min(1, { message: "Fecha de fin es requerida" }),
    activo: z.boolean().default(false),
    cerrado: z.boolean().default(false),
})

type CuatrimestreFormValues = z.infer<typeof FormSchema>

interface CuatrimestreFormProps {
    cuatrimestre: {
        id: string
        nombre: string
        fecha_inicio: string
        fecha_fin: string
        activo: boolean
        cerrado: boolean
    }
}
export default function CuatrimestreFormEdit({ cuatrimestre }: CuatrimestreFormProps) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<CuatrimestreFormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nombre: cuatrimestre.nombre,
            fecha_inicio: cuatrimestre.fecha_inicio,
            fecha_fin: cuatrimestre.fecha_fin,
            activo: cuatrimestre.activo,
            cerrado: cuatrimestre.cerrado,
        },
    })

    async function onSubmit(data: CuatrimestreFormValues) {
        setIsLoading(true)
        try {
            const result = await updateCuatrimestre(cuatrimestre.id, data)
            if (result.error) {
                toast({
                    title: "Error",
                    description: "No se pudo actualizar el cuatrimestre: " + result.error.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Cuatrimestre actualizado",
                    description: "El cuatrimestre se ha actualizado correctamente",
                });
                router.push("/admin/cuatrimestres")
                router.refresh()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo actualizar el cuatrimestre: " + error,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false)
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
                                <Input placeholder="Cuatrimestre 1" {...field} />
                            </FormControl>
                            <FormDescription>
                                Nombre del cuatrimestre
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fecha_inicio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de inicio</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormDescription>
                                Fecha de inicio del cuatrimestre
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fecha_fin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de fin</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormDescription>
                                Fecha de fin del cuatrimestre
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
                                    Selecciona si el cuatrimestre está activo.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cerrado"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Cerrado</FormLabel>
                                <FormDescription>
                                    Selecciona si el cuatrimestre está cerrado.
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
                        onClick={() => router.push("/admin/cuatrimestres")}
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