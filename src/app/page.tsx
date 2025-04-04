import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary px-4 py-3 text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between max-w-4xl w-full">
          <h1 className="text-xl font-bold">Sistema de Calificaciones</h1>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center space-y-8 py-24 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Sistema de Gestión Académica
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Plataforma completa para la administración de calificaciones, materias, grupos y más.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/login?role=admin">
              <Button size="lg" className="min-w-[200px]">
                Acceso Administrador
              </Button>
            </Link>
            <Link href="/login?role=maestro">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Acceso Maestro
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container max-w-4xl mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Sistema de Calificaciones. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
