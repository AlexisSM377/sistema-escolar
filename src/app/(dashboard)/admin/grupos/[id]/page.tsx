import { getCuatrimestres, getGruposById, getMaterias } from "../actions";
import EditGrupoForm from "../components/edit/edit-grupo";

interface EditGruposPageProps {
    params: {
        id: string;
    };
}

export default async function EditGrupoPage({ params }: EditGruposPageProps) {
    const [gruposResult, materiasResult, cuatrimestresResult] = await Promise.all([
        getGruposById(params.id),
        getMaterias(),
        getCuatrimestres()
    ]);

    const { grupos } = gruposResult;
    const { materias } = materiasResult;
    const { cuatrimestres } = cuatrimestresResult;

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Editar Grupo</h1>
            <p className="mt-2">
                Modificando información del grupo
            </p>
            <div className="border rounded-lg p-6 bg-card">
                <EditGrupoForm
                    grupos={grupos}
                    materias={materias || []}
                    cuatrimestres={cuatrimestres || []}
                />
            </div>
        </div>
    )
}