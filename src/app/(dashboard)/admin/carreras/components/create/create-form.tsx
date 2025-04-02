'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react";
import { createCarrera } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

const FormSchema = z.object({
    nombre: z.string().min(1, { message: "Nombre es requerido" }),
    codigo: z.string().min(1, { message: "Código es requerido" }),
    duracion_cuatrimestres: z.string().min(1, { message: "Duración de cuatrimestre es requerido" }),
    activa: z.boolean().default(false),
})

export default function CarreraForm() {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nombre: "",
            codigo: "",
            duracion_cuatrimestres: "",
            activa: false,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const result = await createCarrera(data)

            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al crear la carrera",
                    variant: "destructive",
                })
            } else {
                document.getElementById("create-trigger")?.click();
                toast({
                    title: "Éxito",
                    description: "Carrera creada con éxito 🎓",
                })
            }
        })
    }

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingeniería en Sistemas" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="codigo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código</FormLabel>
                            <FormControl>
                                <Input placeholder="ING-SIS" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="duracion_cuatrimestres"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duración de cuatrimestre</FormLabel>
                            <FormControl>
                                <Input placeholder="9" {...field} />
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
                <Button
                    type="submit"
                    className="w-full flex gap-2 items-center"
                    variant="outline"
                >
                    Crear Carrera
                    <LoaderCircle
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>
        </Form>
    )
}