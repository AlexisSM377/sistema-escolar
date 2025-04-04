import CreateMateriaNivel from "./components/create/create-materia-nivel";
import ListOfMateriasNivel from "./components/list-materia-nivel";

export default function page() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Gestión de Materias Niveles</h1>
            <p className="dark:text-gray-300 ">Administra los niveles disponibles en la institución.</p>
            <div className="flex items-center justify-end">
                <CreateMateriaNivel />
            </div>
            <ListOfMateriasNivel />
        </div>
    )
}