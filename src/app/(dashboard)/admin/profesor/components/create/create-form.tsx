'use client'
import { useTransition } from "react"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createGrupoProfesor } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const profesorGrupoSchema = z.object({
    id_grupo: z.string().uuid({ message: "Seleccione un grupo válido" }),
    id_usuario: z.string().uuid({ message: "Seleccione un profesor válido" })
})

type ProfesorGrupoFormValues = z.infer<typeof profesorGrupoSchema>

interface Grupo {
    id: string
    clave_grupo: string
    materias: {
        id: string
        nombre: string
    }
    cuatrimestres: {
        id: string
        nombre: string
    }
    cupo_maximo?: number
    activo?: boolean
}

interface Usuario {
    id: string
    nombre: string
    roles: {
        id: string
        nombre: string
    }
    genero: string
    matricula: string
}

interface CreateProfesorGrupoFormProps {
    grupos: Grupo[]
    profesores: Usuario[]
}

export default function CreateProfesorGrupoForm(
    { grupos, profesores }: CreateProfesorGrupoFormProps
) {

    const [isPending, startTransition] = useTransition()

    const form = useForm<ProfesorGrupoFormValues>({
        resolver: zodResolver(profesorGrupoSchema),
        defaultValues: {
            id_grupo: "",
            id_usuario: ""
        }
    })

    async function onSubmit(data: ProfesorGrupoFormValues) {
        startTransition(async () => {
            const result = await createGrupoProfesor(data)

            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al asignar el profesor al grupo",
                    variant: "destructive"
                })
            } else {
                document.getElementById("create-trigger")?.click()

                toast({
                    title: "Éxito",
                    description: "Profesor asignado al grupo correctamente",
                    variant: "default"
                })
            }
        })
    }

    return (
        <Form   {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="id_grupo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Grupo</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}

                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar un grupo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {grupos.map((grupo) => (
                                        <SelectItem key={grupo.id} value={grupo.id}>
                                            {grupo.clave_grupo}- {grupo.materias.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecciona un grupo para asignar al profesor
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="id_usuario"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profesor</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}

                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar un profesor" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {profesores.map((profesor) => (
                                        <SelectItem key={profesor.id} value={profesor.id}>
                                            {profesor.nombre} - {profesor.roles.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecciona un profesor para asignar al grupo
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
                    Asignar Profesor a Grupo{" "}
                    <LoaderCircle
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>
        </Form>
    )
}