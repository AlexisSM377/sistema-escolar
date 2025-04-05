'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { updateGrupoProfesor } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const profesorGrupoSchema = z.object({
    id_grupo: z.string().uuid({ message: "Seleccione un grupo válido" }),
    id_usuario: z.string().uuid({ message: "Seleccione un profesor válido" })
})

type ProfesorGrupoValues = z.infer<typeof profesorGrupoSchema>


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

interface ProfesorGrupoProps {
    grupos_profesor: {
        id: string
        id_grupo: string
        id_usuario: string
    }
    grupos: Grupo[]
    profesores: Usuario[]
}

export default function EditProfesorGrupoForm({
    grupos_profesor,
    grupos,
    profesores
}: ProfesorGrupoProps
) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const form = useForm<ProfesorGrupoValues>({
        resolver: zodResolver(profesorGrupoSchema),
        defaultValues: {
            id_grupo: grupos_profesor.id_grupo,
            id_usuario: grupos_profesor.id_usuario
        }
    })


    async function onSubmit(data: ProfesorGrupoValues) {
        setIsLoading(true);
        try {
            const result = await updateGrupoProfesor(grupos_profesor.id, data)

            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al actualizar el grupo del profesor",
                    variant: "destructive"
                })
            } else {
                toast({
                    title: "Éxito",
                    description: "Se actualizó correctamente el grupo del profesor",
                    variant: "default"
                })
                router.push("/admin/profesor")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error al cargar los datos" + error,
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form   {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="id_grupo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Materia</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}

                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar una materia" />
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

                <div className="flex items-center justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/profesor")}
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
    )
}