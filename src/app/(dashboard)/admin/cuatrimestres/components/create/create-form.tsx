'use client'
import { useTransition } from "react"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createCuatrimestre } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
    nombre: z.string().min(1, { message: "Nombre es requerido" }),
    fecha_inicio: z.string().min(1, { message: "Fecha de inicio es requerida" }),
    fecha_fin: z.string().min(1, { message: "Fecha de fin es requerida" }),
    activo: z.boolean().default(false),
    cerrado: z.boolean().default(false),
})

export default function CuatrimestreForm() {
    const [isPending, startTransition] = useTransition()


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nombre: "",
            fecha_inicio: "",
            fecha_fin: "",
            activo: false,
            cerrado: false,
        },
    });


    function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const result = await createCuatrimestre(data)

            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al crear el cuatrimestre",
                    variant: "destructive",
                })
            } else {
                document.getElementById("create-trigger")?.click();
                toast({
                    title: "Éxito",
                    description: "Cuatrimestre creado con éxito 🎓",
                })
            }
        })
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
                <Button
                    type="submit"
                    className="w-full flex gap-2 items-center"
                    variant="outline"
                >
                    Crear Materia
                    <LoaderCircle
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>
        </Form>
    )
}