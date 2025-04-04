import CreateGrupo from "./components/create/create-grupo";
import ListOfGrupos from "./components/list-grupos";

export default function page() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Gestión de Grupos</h1>
            <p className="dark:text-gray-300 ">Administra los grupos disponibles en la institución.</p>
            <div className="flex items-center justify-end">
                <CreateGrupo />
            </div>
            <ListOfGrupos />
        </div>
    )
}