import { getCarreras, getPlanEstudioById } from "../../actions";
import EditPlanForm from "../../components/edit/edit-plan";

interface EditPlanPageProps {
    params: {
        id: string;
    };
}

export default async function EditPlanPage({ params }: EditPlanPageProps) {

    const [planResult, carrerasResult] = await Promise.all([
        getPlanEstudioById(params.id),
        getCarreras()
    ]);

    const { plan } = planResult;
    const { carreras } = carrerasResult;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Editar Plan de Estudio</h1>
            <p className="mt-2">
                Modificando información del plan:
                <span className="font-bold text-lg"> {plan.nombre}</span>
            </p>
            <div className="border rounded-lg p-6 bg-card">
                <EditPlanForm
                    plan={plan}
                    carreras={carreras || []}
                />
            </div>
        </div>
    )
}