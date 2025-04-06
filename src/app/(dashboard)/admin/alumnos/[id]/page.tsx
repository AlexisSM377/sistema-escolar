import { getEstudiantes, getGrupoAlumnoById, getGrupos } from "../actions"
import EditAlumnoGrupoForm from "../components/edit/edit-alumno-grupo"

export default async function EditAlumnoGrupoPage({ params }: { params: { id: string } }) {

    const [gruposEstudianteResult, gruposResult, estudiantesResult] = await Promise.all([
        getGrupoAlumnoById(params.id),
        getGrupos(),
        getEstudiantes()
    ])

    const { grupo_alumno } = gruposEstudianteResult
    const { grupos } = gruposResult
    const { estudiantes } = estudiantesResult

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">
                Editar Grupo de Estudiante
            </h1>
            <p className="mt-2">
                Modifica los datos del grupo del estudiante seleccionado.
            </p>
            <div className="border rounded-lg p-6 bg-card">
                <EditAlumnoGrupoForm
                    grupos_estudiante={grupo_alumno}
                    grupos={grupos || []}
                    estudiantes={estudiantes || []}
                />
            </div>
        </div>
    )
}