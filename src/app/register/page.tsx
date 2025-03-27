
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./components/registerForm";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function RegisterPage() {

    const { data } = await readUserSession()
    if (data.user) {
        return redirect("/admin")
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-6 md:p-10">
            <Card className="w-full max-w-sm md:max-w-xl">
                <CardHeader>
                    <CardTitle>
                        Registrate
                    </CardTitle>
                    <CardDescription>
                        Crea una cuenta para continuar en el Sistema Escolar
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <RegisterForm />
                </CardContent>
            </Card>
        </div>
    )
}