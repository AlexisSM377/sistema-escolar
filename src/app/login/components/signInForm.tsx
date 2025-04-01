'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { signInWithEmailAndPassword } from "../actions"
import { useTransition } from "react"
import { AuthTokenResponse } from "@supabase/supabase-js"
import { LoaderCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
});
export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [isPending, startTransition] = useTransition();
    const searhParams = useSearchParams()
    const role = searhParams.get("role")
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        startTransition(async () => {

            const { error } = await signInWithEmailAndPassword(data) as AuthTokenResponse;

            if (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.message,
                });
            } else {
                toast({
                    title: "Bienvenido",
                    description: "Has iniciado sesión correctamente 🎉",
                });
            }

            if (role === "admin") {
                router.push("/admin")
            } else if (role === "maestro") {
                router.push("/maestro")
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "No se ha podido redirigir al dashboard.",
                });
            }
        })

        // const result = await signInWithEmailAndPassword(data);
        // const { error } = result;


        // if (error?.message) {
        //     toast({
        //         variant: "destructive",
        //         title: "Error",
        //         description: (
        //             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //                 <code className="text-white">
        //                     {error.message}
        //                 </code>
        //             </pre>

        //         ),
        //     });

        // } else {
        //     toast({
        //         title: "Success",
        //         description: (
        //             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //                 <code className="text-white">
        //                     Successfully Loged
        //                 </code>
        //             </pre>

        //         ),
        //     });
        // }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="p-6 md:p-8 w-full space-y-6"
                        >
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    Bienvenido
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    Inicia sesión para continuar
                                </p>
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="password"
                                                {...field}
                                                type="password"
                                                onChange={field.onChange}
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
                                Iniciar sesión{" "}
                                <LoaderCircle
                                    className={cn("animate-spin", { hidden: !isPending })}
                                />
                            </Button>
                            {/* <div className="text-center text-sm">
                                No tienes una cuenta?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Regístrate
                                </a>
                            </div> */}
                        </form>
                    </Form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src="/student.jpg"
                            alt="Image"
                            width={500}
                            height={500}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
