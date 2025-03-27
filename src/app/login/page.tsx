import readUserSession from "@/lib/actions";
import { LoginForm } from "./components/signInForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {

  const { data } = await readUserSession()
  if (data.user) {
    return redirect("/admin")
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
