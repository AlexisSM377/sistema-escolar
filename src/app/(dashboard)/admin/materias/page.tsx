import CreateMateria from "./components/create/create-materia";
import ListOfMaterias from "./components/list-of-materias";

export default function page() {
    return (
        <div className="space-y-4 w-full overflow-y-auto px-3">
            <h1 className="text-3xl font-bold">Gestión de Materias</h1>
            <p className="text-gray-300 ">Administra las materias disponibles en la institución.</p>
            <div className="flex items-center justify-end">
                <CreateMateria />
            </div>
            <ListOfMaterias />
        </div>
    )
}