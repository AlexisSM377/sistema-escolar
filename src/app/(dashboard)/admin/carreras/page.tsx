import CreateCarrera from "./components/create/create-carrera";
import ListOfCarreras from "./components/list-of-carreras";

export default function page() {
    return (
        <div className="space-y-4 w-full overflow-y-auto px-3">
            <h1 className="text-3xl font-bold">Gestión de Carreras</h1>
            <p className="dark:text-gray-300 ">Administra las carreras disponibles en la institución.</p>
            <div className="flex items-center justify-end">
                <CreateCarrera />

            </div>
            <ListOfCarreras />

        </div>
    )
}