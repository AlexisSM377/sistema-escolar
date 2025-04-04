import CreatePlan from "./components/create/create-plan";
import ListOfPlanes from "./components/list-of-plan";

export default function Page() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Gestión de Planes de Estudio</h1>
            <p className="dark:text-gray-300 ">Administra los planes de estudio disponibles en la institución.</p>
            <div className="flex items-center justify-end">

                <CreatePlan />
            </div>

            <ListOfPlanes />
        </div>
    )
}