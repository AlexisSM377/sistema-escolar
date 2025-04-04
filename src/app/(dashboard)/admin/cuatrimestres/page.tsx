import CreateCuatrimestre from "./components/create/create-cuatrimestre";
import ListOfCuatrimestres from "./components/list-cuatrimestre";

export default function page() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Gestión de Cuatrimestres</h1>
            <p className="dark:text-gray-300 ">Administra los cuatrimestres disponibles en la institución.</p>
            <div className="flex items-center justify-end">
                <CreateCuatrimestre />
            </div>
            <ListOfCuatrimestres />
        </div>
    )
}