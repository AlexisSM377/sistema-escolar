import { getGrupoProfesorById, getGrupos, getProfesores } from "../actions"
import EditProfesorGrupoForm from "../components/edit/edit-profesor-grupo"

export default async function EditProfesorGrupoPage({
    params
}: {
    params: { id: string }
}) {
    const [gruposProfesorResult, gruposResult, profesoresResult] = await Promise.all([
        getGrupoProfesorById(params.id),
        getGrupos(),
        getProfesores()
    ])

    const { grupo_profesor } = gruposProfesorResult
    const { grupos } = gruposResult
    const { profesores } = profesoresResult

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">
                Editar Grupo de Profesor
            </h1>
            <p className="mt-2">
                Modifica los datos del grupo del profesor seleccionado.
            </p>
            <div className="border rounded-lg p-6 bg-card">
                <EditProfesorGrupoForm
                    grupos_profesor={grupo_profesor}
                    grupos={grupos || []}
                    profesores={profesores || []}
                />
            </div>
        </div>
    )
}