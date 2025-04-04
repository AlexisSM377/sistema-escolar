import { getMateriaNivelById, getMateriasNivel, getPlanesEstudioNivel } from "../actions";
import EditMateriaNivelForm from "../components/edit/edit-materia-nivel";

interface EditMateriaNivelPageProps {
    params: {
        id: string;
    };
}

export default async function EditMateriaNivelPage({ params }: EditMateriaNivelPageProps) {
    const [materiasNivelResult, materiasResult, planesEstudiosResult] = await Promise.all([
        getMateriaNivelById(params.id),
        getMateriasNivel(),
        getPlanesEstudioNivel()
    ]);

    const { materiaNivel } = materiasNivelResult;
    const { materias } = materiasResult;
    const { planes } = planesEstudiosResult;
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Editar Materia Nivel</h1>
            <p className="mt-2">
                Modificando información de la materia nivel
            </p>
            <div className="border rounded-lg p-6 bg-card">
                <EditMateriaNivelForm
                    materiasNivel={materiaNivel}
                    planesEstudios={planes || []}
                    materias={materias || []}
                />
            </div>
        </div>
    )
}