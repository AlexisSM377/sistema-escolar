'use client'
import { useTransition } from "react"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createAlumnoGrupo } from "../../actions";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const estudianteGrupoShema = z.object({
    id_estudiante: z.string().uuid({ message: "Seleccione un estudiante válido" }),
    id_grupo: z.string().uuid({ message: "Seleccione un grupo válido" }),
    fecha_inscripcion: z.string().min(1, { message: "Fecha de inscripción es requerida" }),
    estado: z.enum(["Cursando", "Aprobado", "Reprobado"], {
        errorMap: () => ({ message: "Seleccione un estado válido" })
    })
})

type EstudianteGrupoFormValues = z.infer<typeof estudianteGrupoShema>

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

interface CreateEstudianteGrupoFormProps {
    grupos: Grupo[]
    estudiantes: Usuario[]
}
export default function CreateEstudianteForm(
    { grupos, estudiantes }: CreateEstudianteGrupoFormProps
) {
    const [isPending, startTransition] = useTransition()

    const form = useForm<EstudianteGrupoFormValues>({
        resolver: zodResolver(estudianteGrupoShema),
        defaultValues: {
            id_estudiante: "",
            id_grupo: "",
            fecha_inscripcion: "",
            estado: "Cursando"
        }
    })

    async function onSubmit(data: EstudianteGrupoFormValues) {
        startTransition(async () => {
            const result = await createAlumnoGrupo(data)

            if (result.error) {
                toast({
                    title: "Error",
                    description: "Error al asignar el estudiante al grupo",
                    variant: "destructive"
                })
            } else {
                document.getElementById("create-trigger")?.click()
                form.reset()
                toast({
                    title: "Éxito",
                    description: "Estudiante asignado al grupo correctamente 🧒",
                    variant: "default"
                })
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="id_estudiante"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estudiante</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar un estudiante" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {estudiantes.map((estudiante) => (
                                        <SelectItem key={estudiante.id} value={estudiante.id}>
                                            {estudiante.nombre} - {estudiante.roles.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecciona un estudiante para asignar al grupo
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                    name="fecha_inscripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de inscripción</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormDescription>
                                Selecciona la fecha de inscripción del estudiante al grupo
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar estado" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Cursando">Cursando</SelectItem>
                                    <SelectItem value="Aprobado">Aprobado</SelectItem>
                                    <SelectItem value="Reprobado">Reprobado</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecciona el estado del estudiante en el grupo
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
                    Asignar Estudiante a Grupo{" "}
                    <LoaderCircle
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>

            </form>

        </Form>
    )
}