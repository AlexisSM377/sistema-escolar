'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { createGrupos } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const gruposFormSchema = z.object({
    id_materia: z.string().min(1, { message: "Materia es requerida" }),
    id_cuatrimestre: z.string().min(1, { message: "Cuatrimestre es requerido" }),
    clave_grupo: z.string().min(1, { message: "Clave de grupo es requerida" }),
    cupo_maximo: z.number().min(1, { message: "Cupo máximo es requerido" }).max(30, { message: "Cupo máximo no puede ser mayor a 30" }),
    activo: z.boolean().default(true),
})

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
    materias: Materias[];
    cuatrimestres: Cuatrimestres[];
}


export default function GruposForm(
    { materias, cuatrimestres }: GruposFormProps
) {

    const [isPending, startTransition] = useTransition()


    const form = useForm<z.infer<typeof gruposFormSchema>>({
        resolver: zodResolver(gruposFormSchema),
        defaultValues: {
            id_materia: "",
            id_cuatrimestre: "",
            clave_grupo: "",
            cupo_maximo: 1,
            activo: true,
        },
    })

    function onSubmit(data: z.infer<typeof gruposFormSchema>) {
        startTransition(async () => {
            const result = await createGrupos(data)
            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al crear el grupo",
                    variant: "destructive",
                })
            } else {
                document.getElementById("create-trigger")?.click();
                // form.reset()
                toast({
                    title: "Grupo creado",
                    description: "El grupo se ha creado correctamente",
                })
            }
        })
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
                            <FormLabel>Nombre del grupo</FormLabel>
                            <FormControl>
                                <Input placeholder="ISC-A" {...field} />

                            </FormControl>
                            <FormDescription>
                                Ingresa el nombre del grupo.
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

                <Button
                    type="submit"
                    className="w-full flex gap-2 items-center"
                    variant="outline"
                >
                    Crear Grupo{" "}
                    <LoaderCircle
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>
        </Form>
    )
}