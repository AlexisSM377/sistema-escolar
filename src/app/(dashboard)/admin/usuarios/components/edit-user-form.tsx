"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUsuario } from "../actions";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

// Esquema de validación del formulario de edición
const formSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
    email: z.string().email({
        message: "Debe ser un correo válido",
    }),
    id_rol: z.string().uuid(),
    genero: z.enum(['M', 'F', 'O']),
    matricula: z.string().min(1, {
        message: "La matrícula es requerida",
    }),
});

export default function EditUserForm({ usuario }: { usuario: any }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);

    // Inicializa el formulario con los datos del usuario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: usuario?.nombre || "",
            email: usuario?.email || "",
            id_rol: usuario?.id_rol || "",
            genero: usuario?.genero || "M", // Asegurarse de usar 'M','F','O'
            matricula: usuario?.matricula || "",
        },
    });

    // Cargar roles desde Supabase
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const { data, error } = await supabase
                    .from('roles')
                    .select('*')
                    .order('nombre', { ascending: true });

                if (error) throw error;
                setRoles(data);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'No se pudieron cargar los roles',
                    variant: 'destructive'
                });
            } finally {
                setLoadingRoles(false);
            }
        };

        fetchRoles();
    }, [supabase]);

    // Actualizar formulario cuando se carga el usuario
    useEffect(() => {
        if (usuario) {
            form.reset({
                nombre: usuario.nombre || "",
                email: usuario.email || "",
                id_rol: usuario.id_rol || "",
                genero: usuario.genero || "M",
                matricula: usuario.matricula || "",
            });
        }
    }, [form, usuario]);

    function onSubmit(data: z.infer<typeof formSchema>) {
        startTransition(async () => {
            try {
                const result = await updateUsuario(usuario.id, data);
                if (result.error) {
                    toast({
                        title: "Error al actualizar el usuario",
                        description: "Error: " + result.error,
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Usuario actualizado",
                        description: "Los cambios se han guardado exitosamente 👌",
                    });
                    router.push("/admin/usuarios");
                    router.refresh();
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error inesperado" + error,
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                {/* Campo Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo Nombre */}
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre completo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo Matrícula */}
                <FormField
                    control={form.control}
                    name="matricula"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Matrícula</FormLabel>
                            <FormControl>
                                <Input placeholder="123456" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo Género - Usando los mismos valores que en createForm */}
                <FormField
                    control={form.control}
                    name="genero"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Género</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
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

                {/* Campo Rol - Cargado dinámicamente desde Supabase */}
                <FormField
                    control={form.control}
                    name="id_rol"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rol</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                disabled={loadingRoles}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={loadingRoles ? "Cargando roles..." : "Selecciona un rol"}
                                        />
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

                {/* Botones de acción */}
                <div className="flex gap-2 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={isPending}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="flex gap-2 items-center"
                    >
                        {isPending ? "Guardando..." : "Guardar cambios"}
                        <LoaderCircle
                            className={cn("animate-spin", { hidden: !isPending })}
                        />
                    </Button>
                </div>


            </form>
        </Form>
    );
}