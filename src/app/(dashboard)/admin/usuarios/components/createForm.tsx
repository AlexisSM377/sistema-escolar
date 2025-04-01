'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useState, useTransition } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createUsuario } from '../actions'
import { toast } from '@/hooks/use-toast'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Esquema de validación del cliente
const FormSchema = z.object({
    nombre: z.string().min(2),
    id_rol: z.string().uuid(),
    genero: z.enum(['M', 'F', 'O']),
    matricula: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirm: z.string().min(6),


}).refine(data => data.confirm === data.password, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})

export default function UsuarioForm() {
    const supabase = createClientComponentClient()
    const [roles, setRoles] = useState([])
    const [loadingRoles, setLoadingRoles] = useState(true)

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nombre: '',
            id_rol: '',
            genero: 'M',
            matricula: '',
            email: '',
            password: '',
            confirm: '',
        }
    })

    // Obtener roles de Supabase
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const { data, error } = await supabase
                    .from('roles')
                    .select('*')
                    .order('nombre', { ascending: true })

                if (error) throw error
                setRoles(data)
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'No se pudieron cargar los roles',
                    variant: 'destructive'
                })
            } finally {
                setLoadingRoles(false)
            }
        }

        fetchRoles()
    }, [supabase])

    function onSubmit(data: z.infer<typeof FormSchema>) {

        startTransition(async () => {

            const result = await createUsuario(data);
            const { error } = result;
            if (error) {
                toast({
                    title: "Error al crear el usuario",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code >
                                {JSON.stringify(data, null, 2)}
                            </code>
                        </pre>
                    ),
                });
            } else {
                document.getElementById("create-trigger")?.click();
                toast({
                    title: "Usuario creado",
                    description: "El usuario fue creado exitosamente 👌",
                });
            }

        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar Contraseña</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
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
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="matricula"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Matrícula</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="genero"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Género</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un género" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="M">Masculino</SelectItem>
                                    <SelectItem value="F">Femenino</SelectItem>
                                    <SelectItem value="O">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="id_rol"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rol</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={loadingRoles}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={loadingRoles ? "Cargando roles..." : "Selecciona un rol"} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.id}>
                                            {role.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full flex gap-2 items-center"
                    variant="outline"
                >
                    Crear usuario{" "}
                    <LoaderCircle
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>
        </Form>
    )
}

