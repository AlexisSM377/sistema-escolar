import { notFound } from "next/navigation";
import { createSupabaseAdmin, getCurrentUser } from "@/lib/supabase/server";
import CalificacionesTabla from "../../components/tabla-calificaciones";
import { Button } from "@/components/ui/button";
import Link from "next/link";



async function getGrupoData(id: string) {
  const supabase = await createSupabaseAdmin();

  // Verificar que el usuario sea profesor y tenga acceso al grupo
  const { user } = await getCurrentUser();

  if (!user) {
    notFound();
  }

  // Verificar que el grupo exista y pertenezca al profesor
  const { data: grupoProfesor } = await supabase
    .from("grupo_profesores")
    .select("*, grupos (id, clave_grupo, materias (id, nombre), cuatrimestres (id, nombre))")
    .eq("id_usuario", user.id)
    .eq("id_grupo", id)
    .maybeSingle();

  if (!grupoProfesor) {
    notFound();
  }

  return grupoProfesor;
}

export default async function GrupoCalificacionesPage({ params }: { params: { id: string } }) {
  const grupoProfesor = await getGrupoData(params.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">

          <h2 className="text-3xl font-bold tracking-tight">
            Calificaciones: {grupoProfesor.grupos.clave_grupo}
          </h2>
          <p className="text-muted-foreground">
            Materia: {grupoProfesor.grupos.materias.nombre}
          </p>
          <p className="text-muted-foreground">
            Cuatrimestre: {grupoProfesor.grupos.cuatrimestres.nombre}
          </p>
        </div>
        <Button variant="outline">
          <Link href={`/maestro/calificaciones`}>
            Volver
          </Link>
        </Button>
      </div>

      <CalificacionesTabla idGrupo={params.id} />
    </div>
  );
}