'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";
import { signUpWithEmailAndPassword } from "../actions";

const FormSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6, {
            message: "Password is required.",
        }),
        confirm: z.string().min(6, {
            message: "Password is required.",
        }),
    })
    .refine((data) => data.confirm === data.password, {
        message: "Password did not match",
        path: ["confirm"],
    });

export default function RegisterForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const result = await signUpWithEmailAndPassword(data);
        const parsedResult = JSON.parse(result);

        if (parsedResult.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{parsedResult.error.message}</code>
                    </pre>
                ),
            });
        } else {
            toast({
                title: "Success",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">Successfully registered</code>
                    </pre>
                ),
            });
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (

                        <FormItem>
                            <FormLabel htmlFor="email">Correo electronico</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@gmail.com"
                                    {...field}
                                    type="email"
                                    onChange={field.onChange}
                                />
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
                            <FormLabel htmlFor="password">Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="********"
                                    {...field}
                                    type="password"
                                    onChange={field.onChange}
                                />
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
                            <FormLabel htmlFor="confirm">Confirmar contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="********"
                                    {...field}
                                    type="password"
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full flex gap-2">
                    Registrarse
                </Button>
            </form>
        </Form>
    )
}